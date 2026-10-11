import { addressDetails } from "@/components/MediMart/Interface";
import { toast } from "react-toastify";
import { apiCall } from "./axios-client";
import { EndPoint, JsonHeader, Methods } from "@/api/config";
import { DiscountInfo, LabPackage } from "@/components/Lab/Interface";
import { labPackagePayment } from "./LabPackagePay";
import moment from "moment";

const HealthCheckUp = async (
  addressDetails: addressDetails,
  addressId: any,
  haveaddressid: boolean,
  userId: any,
  query: string | null,
  deliveryOption: string,
  onlinePayment: string,
  sampleCollectionDate: Date | null | undefined,
  sampleCollectionTime: Date | null | undefined,
  router: any,
  labPackage: LabPackage | undefined,
  discount: DiscountInfo | undefined,
  packagePrice: number | undefined
) => {
  if (
    !addressDetails.firstName ||
    !addressDetails.lastName ||
    !addressDetails.email ||
    !addressDetails.phone ||
    !addressDetails.address ||
    !addressDetails.district ||
    !addressDetails.thana
  ) {
    toast.error("Please complete all required fields before proceeding.", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 3000,
    });
    return false;
  }
  if (!sampleCollectionDate) {
    toast.error("Please Add Collection Date.", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 3000,
    });
    return false;
  }
  if (!sampleCollectionTime) {
    toast.error("Please Add Collection Time.", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 3000,
    });
    return false;
  }

  if (!deliveryOption) {
    toast.error("Please select a delivery option.", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 3000,
    });
    return false;
  }

  let newDate = moment(sampleCollectionDate).format("YYYY-MM-DD");
  let newTime = moment(sampleCollectionTime).format("HH:mm:ss");
  let dateTime = `${newDate}T${newTime}`;

  let order: any = {
    shippingMethod: "regular shipping",
    paymentMethod: deliveryOption,
    collectionTime: new Date(dateTime).toISOString(),
    labPackageId: query,
    // totalCost: Math.ceil(Number(labPackage?.price)),
  };
  if (!haveaddressid) {
    order.addressDetails = {
      firstName: addressDetails.firstName,
      lastName: addressDetails.lastName,
      email: addressDetails.email,
      // phone: addressDetails.phone.replace(/^0/, ""),
      countryCode: "BD",
      dialCode: "880",
      address: addressDetails.address,
      district: addressDetails.district,
      thana: addressDetails.thana,
      postalCode: parseInt(addressDetails?.postalCode?.toString() ?? "0"),
      isDefault: true,
      isHome: true,
    };
    if (userId) {
      order.userId = userId;
      order.addressDetails.user = userId;
    }
  } else {
    order.addressId = addressId;
    if (userId) {
      order.userId = userId;
    }
  }
  if (deliveryOption === "online") {
    if (onlinePayment === "card") {
      if (discount) {
        let originalPrice = Number(labPackage?.price);
        let discountedAmount =
          originalPrice * (1 - discount.discountPercent / 100);
        let value = Math.min(Number(discountedAmount), originalPrice);

        order.totalCost = Math.ceil(Number(value));
        order.discountedPrice = Math.ceil(Number(value));
        order.discountPercent = Math.ceil(Number(discount.discountPercent));
      } else {
        order.totalCost = Math.ceil(Number(labPackage?.price));
        order.discountedPrice = Math.ceil(Number(labPackage?.price));
        order.discountPercent = Math.ceil(Number(0));
      }
      const response = await apiCall(
        Methods.POST,
        EndPoint.LAB_SINGLE_PACKAGE_ORDER,
        order,
        JsonHeader
      );
      if (response.success) {
        // console.log(response.data);
        // return;
        await labPackagePayment(response.data);

        // dispatch(clearLab());
        return true;
      } else {
        toast.error(response.message, {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
        return false;
      }
    } else if (onlinePayment === "bkash") {
      order.totalCost = Math.ceil(Number(labPackage?.price));
      order.discountedPrice = Math.ceil(Number(labPackage?.price));
      order.discountPercent = Math.ceil(Number(0));
      const response = await apiCall(
        Methods.POST,
        EndPoint.LAB_SINGLE_PACKAGE_ORDER,
        order,
        JsonHeader
      );
      // console.log(response);
      // return;
      if (response && response.success) {
        const bkpaymentvalue = {
          callBackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/receipt`,
          amount: response.data.totalCost.toString(),
          invoiceNumber: response.data.invoiceNumber,
        };
        // console.log(bkpaymentvalue);

        const bkresponse = await apiCall(
          Methods.POST,
          `${EndPoint.BKASHPAYMENTCREATE}`,
          bkpaymentvalue,
          JsonHeader
        );
        if (bkresponse && bkresponse.success) {
          // dispatch(clearLab());
          console.log(bkresponse);

          router.push(bkresponse.data.bkashURL);
        }
        return true;
      }
    }
  } else if (deliveryOption === "cod") {
    order.totalCost = Math.ceil(Number(labPackage?.price));
    const response = await apiCall(
      Methods.POST,
      EndPoint.LAB_SINGLE_PACKAGE_ORDER,
      order,
      JsonHeader
    );
    if (response.success) {
      toast.success("Successfully Created Order", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
      // dispatch(clearLab());
      return response;
    } else {
      toast.error(response.message, {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
      return false;
    }
  }
};

export { HealthCheckUp };
