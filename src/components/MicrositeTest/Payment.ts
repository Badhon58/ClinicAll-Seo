import { getUserID, isAuthenticate } from "@/lib/authHandler";
import { PaymentData } from "./Interface";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, JsonHeader, Methods } from "@/api/config";
import { toast } from "react-toastify";

import { MicroPackagePay } from "./MicroSitePackageBuy";

export const Payment = async (
  title: string | any,
  packageId: string | any,
  packageVariationId: string | any,
  Amount: any,
  onlinePayment: string | any,
  router: any
) => {
  try {
    // const usertoken = await isAuthenticate();
    const userId = await getUserID();

    const { data } = await apiCall(
      Methods.GET,
      `${EndPoint.SINGLE_USER}/${userId}`
    );
    if (!data.email) {
      toast.warn("Please add your email address before purchasing a package.");
      router.push("/microsite-test/profile");
      return false;
    }

    const setting = await apiCall(Methods.GET, `${EndPoint.SETTING_FIND_ALL}`);

    const finalData: PaymentData = {
      userId: userId,
      packageId: packageId,
      packageVariationId: packageVariationId,
      packageTitle: title,
      //   discountedPrice: Amount,
    };
    if (onlinePayment === "bkash") {
      let price =
        Number(Amount) -
        (Number(Amount) * Number(setting.data.bkash_discount)) / 100;
      finalData.discountReason = "bkash payment";
      finalData.discountedPrice = Math.ceil(price);
      finalData.discountPercent = setting.data.bkash_discount;
    } else {
      let price =
        Number(Amount) -
        (Number(Amount) * Number(setting.data.card_discount)) / 100;
      finalData.discountReason = "Card payment";
      finalData.discountedPrice = Math.ceil(price);
      finalData.discountPercent = setting.data.card_discount;
    }
    const response = await apiCall(
      Methods.POST,
      EndPoint.BOOK_PACKAGE,
      finalData
    );
    console.log(response);

    if (response.success) {
      if (onlinePayment === "bkash") {
        const bkpaymentvalue = {
          callBackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/microsite-test/microreceipt?invoiceNumber=${response.data.invoiceNumber}&site=micrositetest`,
          amount: Amount.toString(),
          invoiceNumber: response.data.invoiceNumber,
        };
        // console.log(bkpaymentvalue);

        const bkresponse = await apiCall(
          Methods.POST,
          `${EndPoint.BKASHPAYMENTCREATE}`,
          bkpaymentvalue,
          JsonHeader
        );
        // console.log(bkresponse);

        if (bkresponse?.success && bkresponse.data?.bkashURL) {
          router.push(bkresponse.data.bkashURL);
        }
      } else {
        await MicroPackagePay(data, response.data, "false", Amount);
      }
    } else {
      toast.info(response.message);
      return false;
    }
    // console.log(response);
  } catch (error) {
    console.error("Payment error:", error);
    throw error; // re-throw or return a default/failure object
  }
};
