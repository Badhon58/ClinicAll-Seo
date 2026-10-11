import moment from "moment";
import { paymentdata, specialist } from "../Interface";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, JsonHeader, Methods } from "@/api/config";
import { toast } from "react-toastify";
import { Payment } from "./Payment";

export const PaymentOrder = async (
  values: specialist,
  phoneData: any,
  userId: any,
  onlinePayment: string,
  router: any,
  totalCost: number
) => {
  try {
    let newDate = moment(values.visitDate).format("YYYY-MM-DD");
    let newTime = moment(values.visitTime).format("hh:mm:ss");
    const dateTime = `${newDate}T${newTime}`;

    const finalData = {
      ...values,
      // visitDate: new Date(newDate).toISOString(),
      visitTime: new Date(dateTime).toISOString(),
      ...phoneData,
      userId: userId,
      totalCost,
    };
    if (values.payment === "online") {
      finalData.paymentMethod = onlinePayment;
    }
    const response = await apiCall(
      Methods.POST,
      EndPoint.PHYSICAL_DOCTOR_BOOK,
      finalData,
      JsonHeader
    );
    // console.log(response);
    
    if (!response.success) return false;
    if (values.payment === "online") {
      if (onlinePayment === "card") {
        // card
        let data: paymentdata = {
          invoiceNumber: response.data.invoiceNumber,
          totalCost: response.data.physicalDoctorId.price,
          user: {
            firstName: response.data.userId.firstName,
            lastName: response.data.userId.lastName,
            email: response.data.userId.email,
            phone: response.data.userId.phone,
          },
        };
        await Payment(data);
        return true;
      } else if (onlinePayment === "bkash") {
        // bkash
        const bkpaymentvalue = {
          callBackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/receipt?invoicenumber=${response.data.invoiceNumber}`,
          amount: response.data.physicalDoctorId.price.toString(),
          invoiceNumber: response.data.invoiceNumber,
        };
        const bkresponse = await apiCall(
          Methods.POST,
          `${EndPoint.BKASHPAYMENTCREATE}`,
          bkpaymentvalue,
          JsonHeader
        );
        if (bkresponse && bkresponse.success) {
          router.push(bkresponse.data.bkashURL);
        }
      }
    } else if (values.payment === "cod") {
      toast.success("🎉 Order Placed Successfully!", { icon: false });
      return response;
    } else {
      toast.error(response.message, {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
