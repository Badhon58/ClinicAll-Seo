import { addressDetails } from "@/components/MediMart/Interface";
import { toast } from "react-toastify";
import { Payment } from "./Payment";
import { clearLab, LabCart } from "@/redux/Slices/LabSlice";
import { apiCall } from "./axios-client";
import { EndPoint, JsonHeader, Methods } from "@/api/config";
import moment from "moment";

const labOrder = async (
  addressDetails: addressDetails,
  productItem: LabCart[],
  deliveryOption: string,
  onlinePayment: string,
  labtotalCost: number,
  userId: string | null,
  sampleCollectionDate: Date | null | undefined,
  sampleCollectionTime: Date | null | undefined,
  dispatch: any,
  router: any,
  addressId: any,
  haveaddressid: boolean,
  deliveryCharged: number,
  location: string
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
  if (!sampleCollectionTime) {
    toast.error("Please Add Collection Time.", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 3000,
    });
    return false;
  } else if (!sampleCollectionDate) {
    toast.error("Please Add Collection Date.", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 3000,
    });
  } else if (!deliveryOption) {
    toast.error("Please select a delivery option.", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 3000,
    });
    return false;
  }
  let newDate = moment(sampleCollectionDate).format("YYYY-MM-DD");
  let newTime = moment(sampleCollectionTime).format("hh:mm:ss");
  let dateTime = `${newDate}T${newTime}`;
  const allproduct = productItem
    .filter((item) => item.checked)
    .map((item) => ({
      lab_test: item._id || "",
      mrp: item.mrp,
      quantity: 1,
      itemCost: item.mrp,
    }));

  let order: any = {
    shippingMethod: "regular shipping",
    paymentMethod: deliveryOption,
    totalCost: parseInt(labtotalCost.toString()) + deliveryCharged,
    labTestItems: allproduct,
    collectionTime: new Date(dateTime).toISOString(),
    deliveryCharge: deliveryCharged,
    location: location,
  };

  if (!haveaddressid) {
    order.addressDetails = {
      firstName: addressDetails.firstName,
      lastName: addressDetails.lastName,
      email: addressDetails.email,
      phone: addressDetails.phone.replace(/^0/, ""),
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
      order.user = userId;
      order.addressDetails.user = userId;
    }
  } else {
    order.addressId = addressId;
    if (userId) {
      order.user = userId;
    }
  }
  // console.log(order);

  // return;
  if (deliveryOption === "online") {
    if (onlinePayment === "card") {
      const response = await apiCall(
        Methods.POST,
        EndPoint.LABORDER,
        order,
        JsonHeader
      );
      if (response.success) {
        await Payment(response.data);
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
      const response = await apiCall(
        Methods.POST,
        EndPoint.LABORDER,
        order,
        JsonHeader
      );
      // console.log(response);

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
          router.push(bkresponse.data.bkashURL);
        }
        return true;
      }
    }
  } else if (deliveryOption === "cod") {
    const response = await apiCall(
      Methods.POST,
      EndPoint.LABORDER,
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

export default labOrder;
