import { addressDetails, NewProduct } from "@/components/MediMart/Interface";
import { toast } from "react-toastify";
import { Payment } from "./Payment";
import { clearCart } from "@/redux/Slices/CartSlicer";
import { apiCall } from "./axios-client";
import { EndPoint, JsonHeader, Methods } from "@/api/config";

const ProcessOrder = async (
  addressDetails: addressDetails,
  productItem: NewProduct[],
  deliveryOption: string,
  onlinePayment: string,
  producttotalCost: number,
  userId: string | null,
  dispatch: any,
  router: any,
  addressId: any,
  selectAddress: any,
  haveaddressid: boolean,
  deliveryCharge: string
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
  if (!deliveryOption) {
    toast.error("Please select a delivery option.", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 3000,
    });
    return false;
  }
  // console.log(productItem);
  // return;
  const allproduct = productItem.map((item) => ({
    medicine: item._id || "",
    mrp: item.mrp ? parseFloat(item.mrp) : 0,
    quantity: item.quantity || 0,
    medicineVariation: item.medicineVariation,
    // itemCost: item.price ? Math.ceil(Number(item.price)) : 0,
    itemCost: Number(item.price) || 0,
  }));
  let order: any;
  if (haveaddressid == false) {
    order = {
      addressDetails: {
        firstName: addressDetails.firstName,
        lastName: addressDetails.lastName,
        email: addressDetails.email,
        phone: addressDetails.phone,
        address: addressDetails.address,
        district: addressDetails.district,
        thana: addressDetails.thana,
        postalCode: parseInt(
          addressDetails?.postalCode?.toString() ?? "0"
        ).toString(),
        isDefault: true,
        isHome: true,
      },

      shippingMethod: "regular shipping",
      paymentMethod: deliveryOption,
      totalCost: producttotalCost + parseInt(deliveryCharge),
      orderItems: allproduct,
      deliveryCharge: parseInt(deliveryCharge),
    };
    if (userId) {
      order.user = userId;
      order.addressDetails.user = userId;
    }
  } else {
    order = {
      addressId: addressId,
      shippingMethod: "regular shipping",
      paymentMethod: deliveryOption,
      totalCost: Math.ceil(producttotalCost) + parseInt(deliveryCharge),
      orderItems: allproduct,
      deliveryCharge: parseInt(deliveryCharge),
    };
    if (userId) {
      order.user = userId;
    }
  }
  // console.log(order);

  // return;
  if (deliveryOption === "online") {
    if (onlinePayment === "card") {
      // Card Payment
      const response = await apiCall(
        Methods.POST,
        EndPoint.ADDNEWORDER,
        order,
        JsonHeader
      );
      if (response.success) {
        await Payment(response.data);
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
        EndPoint.ADDNEWORDER,
        order,
        JsonHeader
      );
      if (response && response.success) {
        const bkpaymentvalue = {
          callBackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/receipt?invoicenumber=${response.data.invoiceNumber}`,
          amount: response.data.totalCost.toString(),
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
        return true;
      }
    }
  } else if (deliveryOption === "cod") {
    //Cash On Delivery
    const response = await apiCall(
      Methods.POST,
      EndPoint.ADDNEWORDER,
      order,
      JsonHeader
    );
    if (response.success) {
      toast.success("🎉 Order Placed Successfully!", { icon: false });
      // dispatch(clearCart());
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

export default ProcessOrder;
