import React, { useEffect, useState } from "react";
import { Subscription } from "../interface";
import PrimaryText from "../PrimaryText";
import Loading from "@/app/loading";

const PackageInvoice = ({
  packageResponse,
  auth_code,
}: {
  packageResponse: Subscription;
  auth_code: string;
}) => {
  // console.log(packageResponse);

  const [Price, setPrice] = useState<string>();
  const [totalPrice, setTotalPrice] = useState<string>();
  const [loading, setLoading] = useState(true);

  const init = async () => {
    try {
      setLoading(true);
      if (packageResponse.discountedPrice.toString()) {
        setPrice(
          packageResponse.packageId.packageVariation[0].sellingPrice.toString()
        );
        setTotalPrice(packageResponse.discountedPrice.toString());
      } else {
        setPrice(
          packageResponse.packageId.packageVariation[0].sellingPrice.toString()
        );
        setTotalPrice(
          packageResponse.packageId.packageVariation[0].sellingPrice.toString()
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);
  return loading || packageResponse === undefined ? (
    <div className="min-h-[70vh]"><Loading /></div>
  ) : (
    <>
      <div className=" border rounded-md px-6 py-3 flex justify-between">
        <div>
          <PrimaryText
            textcolor="text-black"
            fontsize="text-[14px]"
            fontweight="font-medium"
          >
            Shipping Address
          </PrimaryText>
          <p className=" pt-2 text-sm">
            {" "}
            {packageResponse?.userId?.firstName}{" "}
            {packageResponse?.userId?.lastName}
          </p>
          <p className="text-sm ">
            {packageResponse?.userId.dialCode} {packageResponse?.userId?.phone}{" "}
          </p>
          <p className="text-sm ">{packageResponse?.userId?.email} </p>
        </div>
        <div className="w-[20%]">
          {" "}
          <PrimaryText
            textcolor="text-black"
            fontsize="text-[14px]"
            fontweight="font-medium"
          >
            Shipping Method
          </PrimaryText>
          <span>Standard </span>
        </div>
      </div>
      <div className=" border rounded-md my-2 lg:my-5 text-xs md:text-sm">
        <div className="grid grid-cols-3 sm:grid-cols-12 p-4 bg-[#fff4f4]">
          <p className="sm:col-span-4 font-semibold ">Package Name</p>
          <p className="sm:col-span-4 font-semibold text-center ">Quantity</p>
          <p className="sm:col-span-4 text-center font-semibold ">Unit Price</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-12 p-2 border-b">
          <p className="sm:col-span-4 ml-2 text-sm font-medium line-clamp-1 capitalize">
            {packageResponse?.packageId?.type}
          </p>
          <p className="sm:col-span-4 text-center">1</p>
          <p className="sm:col-span-4  text-center">BDT {Price}</p>
        </div>
        <div className="grid grid-cols-12  lg:grid-cols-10 p-2">
          <span className="col-span-5 lg:col-span-6 "></span>
          <div className=" col-span-7 lg:col-span-4 text-xs md:text-sm  text-[#333843] ">
            <p className=" my-2 grid grid-cols-3 lg:grid-cols-4 font-medium">
              <span className=" font-medium text-[#333843] col-span-2">
                Discount &nbsp;{" "}
              </span>
              <span className="font-medium   col-span-1 lg:col-span-2">
                {" "}
                BDT {Math.abs(Number(totalPrice) - Number(Price))}
              </span>
            </p>
            <p className=" my-2 grid grid-cols-3 lg:grid-cols-4 font-medium">
              <span className=" font-medium text-[#333843] col-span-2">
                Grand Total &nbsp;{" "}
              </span>
              <span className="font-medium   col-span-1 lg:col-span-2">
                {" "}
                BDT {totalPrice}
              </span>
            </p>
            <hr className="border border-gray-500" />
            <p className=" my-2 grid grid-cols-3 lg:grid-cols-4 font-medium">
              <span className=" font-medium text-[#333843] col-span-2">
                Paid &nbsp;{" "}
              </span>
              <span className="font-medium  col-span-1 lg:col-span-2 ">
                {" "}
                BDT {totalPrice}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="py-2 px-6 my-2.5 lg:my-6 bg-[#fff4f4] rounded-md">
        <PrimaryText
          textcolor="text-[#eb148c]"
          fontsize="text-[14px]"
          fontweight="font-medium"
        >
          Payment Information
        </PrimaryText>
      </div>
      <div className="border p-3 rounded-md md:px-6 py-3 flex justify-between">
        <div className=" py-1 ">
          <PrimaryText
            textcolor="text-black"
            fontsize="text-[14px]"
            fontweight="font-medium"
          >
            Billing Address
          </PrimaryText>
          <p className="my-1 text-sm">
            Name : {packageResponse?.userId?.firstName}{" "}
            {packageResponse?.userId?.lastName}
          </p>
          <p className="text-sm">
            Phone : {packageResponse?.userId?.dialCode}{" "}
            {packageResponse?.userId?.phone}
          </p>
          <p className="text-sm">Email : {packageResponse?.userId?.email}</p>
        </div>
        <div className="py-1 ">
          <div>
            <PrimaryText
              textcolor="text-black"
              fontsize="text-[14px]"
              fontweight="font-medium"
            >
              Payment Method
            </PrimaryText>
            <p className="text-sm ">
              {/* {medicineResponse.paymentStatus == "success"
              ? medicineResponse.paymentMethod
              : "Cash On Delivery"} */}
              {packageResponse?.paymentMethod}
            </p>
          </div>
          {auth_code && (
            <p className="text-sm ">Authorization Code : {auth_code} </p>
          )}
          <p className="text-sm ">
            Reference Number : {packageResponse?.invoiceNumber}
          </p>
          <p className="text-sm ">Transaction Type : Purchase </p>
        </div>
      </div>
    </>
  );
};

export default PackageInvoice;
