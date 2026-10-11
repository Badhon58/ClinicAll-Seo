import React, { useEffect, useState } from "react";
import { LabPackageOrder } from "../interface";
import PrimaryText from "../PrimaryText";
import moment from "moment";

const LabPackage = ({
  labPackageResponse,
  auth_code,
}: {
  labPackageResponse: LabPackageOrder;
  auth_code: string;
}) => {
  const [Price, setPrice] = useState<string>();
  const [totalPrice, setTotalPrice] = useState<string>();
  const [loading, setLoading] = useState(true);
  const init = async () => {
    try {
      // console.log(labPackageResponse);

      setLoading(true);
      setPrice(labPackageResponse.labPackageId.price.toString());
      // console.log(labPackageResponse.labPackageId.price.toString());
      // console.log(labPackageResponse.totalCost.toString());

      setTotalPrice(labPackageResponse.totalCost.toString());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return loading ? (
    <div className="min-h-[70vh]">loading...</div>
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
          <p className="my-1 text-sm">
            {" "}
            {labPackageResponse?.currentAddress?.firstName}{" "}
            {labPackageResponse?.currentAddress?.lastName}
          </p>
          <p className="text-sm w-[230px] md:w-full">
            {labPackageResponse?.currentAddress?.address}
          </p>
          <p className="text-sm w-[230px] md:w-full">
            {labPackageResponse?.currentAddress?.postalCode} ,
            {labPackageResponse?.currentAddress?.district}, Bangladesh
          </p>

          <p className="text-sm w-[230px] md:w-full">
            Sample Collection Time:{" "}
            {labPackageResponse.collectionTime ?
              new Date(labPackageResponse.collectionTime).toLocaleString() :
              "Not Set Yet"}
          </p>
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
      <div className=" border rounded-md my-2 lg:my-5">
        <div className="grid grid-cols-3 sm:grid-cols-12 p-4 bg-[#fff4f4] text-xs md:text-sm">
          <p className="sm:col-span-4 font-semibold ">Package Name</p>
          <p className="sm:col-span-4 font-semibold text-center ">Quantity</p>
          <p className="sm:col-span-4 text-center font-semibold ">Unit Price</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-12 p-2 border-b text-xs md:text-sm">
          <p className="sm:col-span-4 ml-2 text-sm font-medium line-clamp-1 capitalize">
            {labPackageResponse?.labPackageId.title}
          </p>
          <p className="sm:col-span-4 text-center">1</p>
          <p className="sm:col-span-4  text-center">
            BDT {labPackageResponse.labPackageId.price}
          </p>
        </div>
        <div className="grid grid-cols-12  lg:grid-cols-10 p-2">
          <span className="col-span-5 lg:col-span-6 "></span>
          <div className=" col-span-7 lg:col-span-4   text-[#333843] ">
            {/* <p className=" my-2 grid grid-cols-3 lg:grid-cols-4 font-medium">
              <span className=" font-medium text-[#333843] col-span-2">
                Unit price &nbsp;{" "}
              </span>
              <span className="font-medium   col-span-1 lg:col-span-2">
                {" "}
                BDT {Math.abs(Number(labPackageResponse.labPackageId.price))}
              </span>
            </p> */}
            <p className=" my-2 text-sm grid grid-cols-3 lg:grid-cols-4  border-[#6b7588] font-medium">
              <span className="  font-medium text-[#333843] col-span-2">
                Discount &nbsp;{" "}
              </span>
              <span className="font-medium   col-span-1 lg:col-span-2">
                {" "}
                BDT {Math.abs(Number(totalPrice) - Number(Price))}
              </span>
            </p>
            <p className=" my-2 grid text-sm grid-cols-3 lg:grid-cols-4 font-medium">
              <span className=" font-medium text-[#333843] col-span-2">
                Sub Total &nbsp;{" "}
              </span>
              <span className="font-medium   col-span-1 lg:col-span-2">
                {" "}
                BDT {totalPrice}
              </span>
            </p>

            <p className=" my-2 grid text-sm grid-cols-3 border-b-2 border-gray-500 lg:grid-cols-4 font-medium">
              <span className=" font-medium text-[#333843] col-span-2">
                Home Sample Collection Fee &nbsp;{" "}
              </span>
              <span className="font-medium   col-span-1 lg:col-span-2">
                {" "}
                BDT 0
              </span>
            </p>
            <p className=" my-2 grid text-sm grid-cols-3 lg:grid-cols-4 font-medium">
              <span className=" font-medium text-[#333843] col-span-2">
                Grand Total &nbsp;{" "}
              </span>
              <span className="font-medium   col-span-1 lg:col-span-2">
                {" "}
                BDT {totalPrice}
              </span>
            </p>
            {labPackageResponse?.paymentStatus === "success" && (
              <>
                <hr className="border border-gray-500" />
                <p className=" my-2 text-sm grid grid-cols-3 lg:grid-cols-4 font-medium">
                  <span className=" font-medium text-[#333843] col-span-2">
                    Paid &nbsp;{" "}
                  </span>
                  <span className="font-medium  col-span-1 lg:col-span-2 ">
                    {" "}
                    BDT {totalPrice}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="py-2 px-6 my-2.5 lg:my-6 bg-[#fff4f4] rounded-md">
        <PrimaryText
          textcolor="text-[#eb148c]"
          fontsize="text-[22px]"
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
            Name : {labPackageResponse?.userId?.firstName}{" "}
            {labPackageResponse?.userId?.lastName}
          </p>
          <p className="text-sm">
            Phone : {labPackageResponse?.userId?.dialCode}{" "}
            {labPackageResponse?.userId?.phone}
          </p>
          <p className="text-sm">Email : {labPackageResponse?.userId?.email}</p>
        </div>
        <div className="py-1 ">
          <div className="flex items-center">
            <PrimaryText
              textcolor="text-black"
              fontsize="text-[14px]"
              fontweight="font-medium"
            >
              Payment Method :{" "}
            </PrimaryText>
            <p className="text-sm ">
              {labPackageResponse?.paymentStatus == "success"
                ? labPackageResponse?.paymentMethod
                : "Cash On Delivery"}
              {/* {labPackageResponse?.paymentMethod} */}
            </p>
          </div>
          {auth_code && (
            <p className="text-sm ">Authorization Code : {auth_code} </p>
          )}
          <p className="text-sm ">
            Reference Number : {labPackageResponse?.invoiceNumber}
          </p>
          <p className="text-sm ">Transection Type : Purchase </p>
        </div>
      </div>
    </>
  );
};

export default LabPackage;
