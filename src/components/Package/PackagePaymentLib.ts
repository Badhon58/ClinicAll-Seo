import { EndPoint, JsonHeader, Methods } from "@/api/config";
import { apiCall } from "@/lib/axios-client";
import { PackagePay } from "@/lib/PackageBuy";
import { toast } from "react-toastify";
import { GPPromoCode, PromoCode, PurchaseRequest } from "./Interface";

export const PakagePayment = async ({
  userId,
  router,
  gift,
  packageId,
  packagevariation,
  phonenumber,
  onlinePayment,
  Amount,
  packagetitle,
  couponData,
  bracCardDiscount,
  countryCode,
  dialCode,
  fullname,
  GPLoyalityUser,
  GpLoyalityDiscount,
}: {
  userId: any;
  router: any;
  gift?: string;
  packageId: any;
  packagevariation: any;
  phonenumber: any;
  onlinePayment: string;
  Amount: number;
  packagetitle: any;
  couponData: any;
  bracCardDiscount: any;
  countryCode: any;
  dialCode: any;
  fullname?: string;
  GPLoyalityUser?: boolean;
  GpLoyalityDiscount?: GPPromoCode;
}) => {
  // console.log(couponData);
  // console.log(bracCardDiscount);

  // return;
  const { data } = await apiCall(
    Methods.GET,
    `${EndPoint.SINGLE_USER}/${userId}`
  );
  if (!data.email) {
    toast.warn("Please add your email address before purchasing a package.");
    router.push("/account");
    return;
  }

  if (gift === "true") {
    // console.log("Send Gift True");
    // return;
    const value: PurchaseRequest = {
      senderId: userId ?? "",
      packageId: packageId ?? "",
      packageVariationId: packagevariation ?? "",
      userPhone: phonenumber,
      userDialCode: dialCode,
      userCountryCode: countryCode,
      discountedPrice: Amount,
      userName: fullname,
    };
    if (couponData && bracCardDiscount) {
      const couponDiscount = Number(couponData.discountPercent) - 20;
      const cardDiscount = Number(bracCardDiscount.discountPercent) - 20;

      if (couponDiscount > cardDiscount) {
        value.discountPercent = couponData.discountPercent;
        value.promoCodeId = couponData._id;
        value.discountReason = "c50";
      } else {
        value.discountPercent = bracCardDiscount.discountPercent;
        value.discountReason = `Card - ${bracCardDiscount.code} ${bracCardDiscount.discountPercent}%`;
      }
    } else if (couponData?.discountPercent > 20) {
      value.discountPercent = couponData.discountPercent;
      value.promoCodeId = couponData._id;
      value.discountReason = "c50";
    } else if (bracCardDiscount?.discountPercent > 20) {
      value.discountPercent = bracCardDiscount.discountPercent;
      value.discountReason = `Card - ${bracCardDiscount.code} ${bracCardDiscount.discountPercent}%`;
    } else {
      value.discountPercent = onlinePayment === "bkash" ? 0 : 20;
    }

    if (onlinePayment === "bkash") {
      const response = await apiCall(
        Methods.POST,
        EndPoint.PACKAGEGIFTBYNUMBER,
        value
      );
      // console.log(response);
      // return;
      if (response.success == true) {
        const bkpaymentvalue = {
          callBackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/receipt?invoiceNumber=${response.data.invoiceNumber}&gift=true`,
          amount: Amount.toString(),
          invoiceNumber: response.data.invoiceNumber,
        };

        const bkresponse = await apiCall(
          Methods.POST,
          `${EndPoint.BKASHPAYMENTCREATE}`,
          bkpaymentvalue,
          JsonHeader
        );
        if (bkresponse?.success && bkresponse.data?.bkashURL) {
          router.push(bkresponse.data.bkashURL);
        }
      } else {
        toast.warning(response.message);
      }
    } else {
      const response = await apiCall(
        Methods.POST,
        EndPoint.PACKAGEGIFTBYNUMBER,
        value
      );
      // console.log(response);
      // return;

      if (response.success == true) {
        await PackagePay(data, response.data, "true", Amount);
      } else {
        toast.warning(response.message);
      }
    }
  } else {

    let value: any;
    value = {
      userId: userId ?? "",
      packageId: packageId ?? "",
      packageTitle: packagetitle ?? "",
      packageVariationId: packagevariation ?? "",
      discountedPrice: Amount,
    };
    if (GPLoyalityUser) {
      if (GpLoyalityDiscount) {
        value.discountPercent = GpLoyalityDiscount.discountPercent;
        // value.promoCodeId = couponData._id;
        value.discountReason = GpLoyalityDiscount.code;
      }
    } else if (couponData) {
      const couponDiscount = Number(couponData.discountPercent) ?? 0 - 20;
      const cardDiscount = 0;

      if (couponDiscount > cardDiscount) {
        value.discountPercent = couponData.discountPercent;
        value.promoCodeId = couponData._id;
        value.discountReason = couponData.code;
      } else {
        value.discountPercent = bracCardDiscount.discountPercent;
        value.discountReason = `Card - ${bracCardDiscount.code} ${bracCardDiscount.discountPercent}%`;
      }
    } else if (couponData?.discountPercent > 20) {
      value.discountPercent = couponData.discountPercent;
      value.promoCodeId = couponData._id;
      value.discountReason = couponData.code;
    } else if (bracCardDiscount?.discountPercent > 20) {
      value.discountPercent = bracCardDiscount.discountPercent;
      value.discountReason = `Card - ${bracCardDiscount.code} ${bracCardDiscount.discountPercent}%`;
    } else {
      value.discountPercent = onlinePayment === "bkash" ? 0 : 20;
    }

    // console.log(value);
    // return;
    if (onlinePayment === "bkash") {
      const response = await apiCall(
        Methods.POST,
        EndPoint.BOOK_PACKAGE,
        value
      );
      if (response.success == true) {
        // setButtonLoading()
        const bkpaymentvalue = {
          callBackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/receipt?invoiceNumber=${response.data.invoiceNumber}`,
          amount: Amount.toString(),
          invoiceNumber: response.data.invoiceNumber,
        };
        const bkresponse = await apiCall(
          Methods.POST,
          `${EndPoint.BKASHPAYMENTCREATE}`,
          bkpaymentvalue,
          JsonHeader
        );
        if (bkresponse?.success && bkresponse.data?.bkashURL) {
          router.push(bkresponse.data.bkashURL);
        }
      } else {
        toast.warning(response.message);
      }
    } else {
      value.paymentMethod = "card";

      // console.log(value);
      // return;
      const response = await apiCall(
        Methods.POST,
        EndPoint.BOOK_PACKAGE,
        value,
        JsonHeader
      );
      // console.log(response);
      // return;
      if (response.success == true) {
        await PackagePay(data, response.data, "false", Amount);
      } else {
        toast.warning(response.message);
      }
    }
  }
};
