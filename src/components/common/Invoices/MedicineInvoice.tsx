"use client";
import React, { useEffect, useState } from "react";
import { Order } from "../interface";
import PrimaryText from "../PrimaryText";
import { Placeholder } from "rsuite";

const MedicineInvoice = ({
  medicineResponse,
  auth_code,
}: {
  medicineResponse: Order;
  auth_code: string;
}) => {
  const [totalMrp, setTotalMrp] = useState<number>();
  const [totalDiscountPrice, setTotalDiscountPrice] = useState<number>();
  const [grandTotal, setGrandTotal] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [deliveryCharge, setDeliveryCharge] = useState<number>();

  const init = async () => {
    try {
      setLoading(true);
      // console.log(medicineResponse);

      const total = medicineResponse.orderItems.reduce((sum, item) => {
        return sum + Number(item.medicine.price) * item.quantity;
      }, 0);
      setTotalMrp(total);
      const discountPrice = medicineResponse.orderItems.reduce((sum, item) => {
        return sum + Number(item.itemCost) * item.quantity;
      }, 0);

      // console.log(medicineResponse);

      setTotalDiscountPrice(discountPrice);
      setDeliveryCharge(medicineResponse?.deliveryCharge);
      setGrandTotal(medicineResponse.totalCost);
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
    <Placeholder.Paragraph rows={8} />
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
            {medicineResponse?.currentAddress?.firstName}{" "}
            {medicineResponse?.currentAddress?.lastName}
          </p>
          <p className="text-sm w-[230px] md:w-full">
            {medicineResponse?.currentAddress?.address}
          </p>
          <p className="text-sm w-[230px] md:w-full">
            {medicineResponse?.currentAddress?.postalCode},{" "}
            {medicineResponse?.currentAddress?.district}, Bangladesh
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
        <div className="grid grid-cols-5 sm:grid-cols-12 p-4 bg-[#fff4f4] font-semibold text-xs md:text-sm">
          <p className="sm:col-span-3 ">Product</p>
          <p className="sm:col-span-2 text-center ">MRP</p>
          <p className="sm:col-span-2 text-center ">Discount Price</p>

          <p className="hidden lg:block sm:col-span-2 text-center ">Quantity</p>
          <p className="lg:hidden block sm:col-span-2 text-center ">Qty</p>
          <p className="sm:col-span-3 text-center font-semibold ">Price</p>
        </div>
        {medicineResponse?.orderItems.map((item, index) => (
          <div
            className="grid grid-cols-5 sm:grid-cols-12 p-2 border-b font-[450] text-xs md:text-sm "
            key={index}
          >
            <p className="sm:col-span-3 line-clamp-2">
              {item.medicine?.product_name}
            </p>
            <p className="sm:col-span-2 text-center line-clamp-2">
              BDT {item.medicine?.price}
            </p>
            <p className="sm:col-span-2 text-center">
              BDT {Number(item.itemCost)}
            </p>
            <p className="sm:col-span-2 text-center">{item.quantity}</p>
            <p className="sm:col-span-3 text-center ">
              BDT {Number(item.itemCost * item.quantity).toFixed(0)}
            </p>
          </div>
        ))}
        <div className="grid grid-cols-12  lg:grid-cols-9 p-2">
          <span className="col-span-5 lg:col-span-6 "></span>
          <div className=" col-span-7 lg:col-span-3   text-[#333843] text-xs md:text-sm">
            <p className=" grid grid-cols-3 lg:grid-cols-4 font-[450]">
              <span className=" text-[#333843] font-[450] col-span-2">
                Total MRP
              </span>
              <span className=" font-[450] text-[#333843]  col-span-1 lg:col-span-2">
                {" "}
                {/* BDT {totalCost - 50} */}
                BDT {totalMrp?.toFixed(0)}
              </span>
            </p>
            {/* --------------------- */}
            <p className=" grid grid-cols-3 my-2 lg:grid-cols-4 font-[450] border-b border-[#6b7588] ">
              <span className=" text-[#333843] font-[450] col-span-2">
                Discount
              </span>
              <span className=" font-[450] text-[#333843]  col-span-1 lg:col-span-2">
                {" "}
                {/* BDT {totalCost - 50} */}
                {totalDiscountPrice &&
                  totalMrp &&
                  `BDT ${Number(totalMrp - totalDiscountPrice).toFixed(0)}`}
              </span>
            </p>
            <p className=" grid grid-cols-3 lg:grid-cols-4 font-[450]">
              <span className=" text-[#333843] font-[450] col-span-2">
                Sub Total
              </span>
              <span className=" font-[450] text-[#333843]  col-span-1 lg:col-span-2">
                {" "}
                BDT {totalDiscountPrice?.toFixed(0)}
              </span>
            </p>

            {/* ----------------------- */}
            <p className="my-2 border-b border-[#6b7588] grid grid-cols-3 lg:grid-cols-4 font-[450]">
              <span className=" text-[#333843] font-[450] col-span-2 line-clamp-2">
                Delivery Charge &nbsp;{" "}
              </span>
              <span className=" font-[450] text-[#333843] col-span-1 lg:col-span-2">
                {" "}
                BDT {deliveryCharge}
              </span>
            </p>
            {/* ---------------------------- */}
            <p className=" my-2 grid grid-cols-3 lg:grid-cols-4 font-[450]">
              <span className=" font-[450] text-[#333843] col-span-2">
                Grand Total &nbsp;{" "}
              </span>
              <span className="font-[450]   col-span-1 lg:col-span-2">
                {" "}
                BDT {grandTotal?.toFixed(0)}
              </span>
            </p>

            {medicineResponse?.paymentStatus === "success" && (
              <>
                <hr className="border border-gray-500" />
                <p className=" my-2 grid grid-cols-3 lg:grid-cols-4 font-[450]">
                  <span className=" font-[450] text-[#333843] col-span-2">
                    Paid &nbsp;{" "}
                  </span>
                  <span className="font-[450]  col-span-1 lg:col-span-2 ">
                    {" "}
                    BDT {grandTotal?.toFixed(0)}
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
            Name : {medicineResponse?.currentAddress?.firstName}{" "}
            {medicineResponse?.currentAddress?.lastName}
          </p>
          <p className="text-sm">
            Phone : {medicineResponse?.user?.dialCode}{" "}
            {medicineResponse?.currentAddress?.phone}
          </p>
          <p className="text-sm">
            Email : {medicineResponse?.currentAddress?.email}
          </p>
          <p className="text-sm w-[230px] md:w-full">
            {medicineResponse?.currentAddress?.address}
          </p>
          <p className="text-sm w-[230px] md:w-full">
            P.O. {medicineResponse?.currentAddress?.thana}
          </p>
          <p className="text-sm w-[230px] md:w-full">
            {medicineResponse?.currentAddress?.postalCode} ,
            {medicineResponse?.currentAddress?.district}, Bangladesh
          </p>
        </div>
        <div className="py-1 ">
          <div className="flex items-center">
            <PrimaryText
              textcolor="text-black"
              fontsize="text-[14px]"
              fontweight="font-medium"
            >
              Payment Method : {" "}
            </PrimaryText>
            <p className="text-sm capitalize">{" "}{medicineResponse?.paymentMethod}</p>
          </div>
          {auth_code && (
            <p className="text-sm ">Authorization Code : {auth_code} </p>
          )}
          <p className="text-sm ">
            Reference Number : {medicineResponse?.invoiceNumber}
          </p>
          <p className="text-sm ">Transaction Type : Purchase </p>
        </div>
      </div>
    </>
  );
};

export default MedicineInvoice;
