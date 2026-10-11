import moment from "moment";
import { toast } from "react-toastify";

import { EndPoint, JsonHeader, Methods } from "@/api/config";
import { CareGiverBookingPayload, ServicePackage } from "./Interface";
import { apiCall } from "@/lib/axios-client";
import { Payment } from "./carePayment";

export const CareGiverPayment = async (
  selectedService: ServicePackage | undefined,
  userInfo: CareGiverBookingPayload,
  dateRange: [Date, Date] | null,
  onlinePayment: string | "",
  router: any,
  deliveryOption: string,
  dayCount: number,
) => {
  if (!userInfo.userId) {
    toast.warn("Please log in to continue");
    return;
  }
  if (!selectedService) {
    toast.warn("Plz Select a Package");
    return;
  }
  if (!userInfo.startTime) {
    toast.warn("Please select a time");
    return;
  }
  if (!userInfo.address) {
    toast.warn("Please enter your address");
    return;
  }
  let startDate, endDate, startTime;
  if (dateRange) {
    let newDate1 = moment(dateRange[0]).format("YYYY-MM-DD");
    let newTime1 = moment(dateRange[0]).format("hh:mm:ss");
    startDate = `${newDate1}T${newTime1}`;
    let newDate2 = moment(dateRange[1]).format("YYYY-MM-DD");
    let newTime2 = moment(dateRange[1]).format("hh:mm:ss");
    endDate = `${newDate2}T${newTime2}`;
  }
  if (userInfo.startTime) {
    let newDate1 = moment(userInfo.startTime).format("YYYY-MM-DD");
    let newTime1 = moment(userInfo.startTime).format("hh:mm:ss");
    startTime = `${newDate1}T${newTime1}`;
  }

  let finalValue: CareGiverBookingPayload = {
    ...userInfo,
    careGiverId: selectedService._id,
    startDate: startDate,
    endDate: endDate,
    startTime: startTime,
    discountedPrice: Number(selectedService.sellPrice) * Number(dayCount) || 0,
    discountPercent: 0,
    discountReason: "0",
  };
  // console.log(finalValue);
  // return;
  const response = await apiCall(
    Methods.POST,
    EndPoint.CARE_GIVER_BOOK_NEW,
    finalValue,
  );
  if (response.success) {
    if (deliveryOption === "online") {
      if (onlinePayment === "bkash") {
        const bkpaymentvalue = {
          callBackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/receipt?invoicenumber=${response.data.invoiceNumber}`,
          amount: response.data.discountedPrice.toString(),
          invoiceNumber: response.data.invoiceNumber,
        };
        const bkresponse = await apiCall(
          Methods.POST,
          `${EndPoint.BKASHPAYMENTCREATE}`,
          bkpaymentvalue,
          JsonHeader,
        );
        if (bkresponse && bkresponse.success) {
          router.push(bkresponse.data.bkashURL);
        }
      } else {
        await Payment(response.data);
      }
    } else {
      const today = moment().format("dddd, MMMM D, YYYY");
      router.push(
        `/receipt?auth_time=${today}&req_reference_number=${
          response.data.invoiceNumber
        }`,
      );
    }
  }
};
