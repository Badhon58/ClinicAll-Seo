import React, { useEffect, useState } from "react";
import { LabOrder } from "../interface";
import PrimaryText from "../PrimaryText";
import moment from "moment";
import { Placeholder } from "rsuite";

const LabInvoice = ({
  labResponse,
  auth_code,
}: {
  labResponse: LabOrder;
  auth_code: string;
}) => {
  const [totalMrp, setTotalMrp] = useState<number>();
  const [totalDiscountPrice, setTotalDiscountPrice] = useState<number>();
  const [grandTotal, setGrandTotal] = useState<any>();
  const [loading, setLoading] = useState(true);

  const init = async () => {
    try {
      setLoading(true);

      const total = labResponse.labTestItems.reduce((sum, item) => {
        return sum + Number(item.lab_test.mrp) * item.quantity;
      }, 0);
      setTotalMrp(total);

      const TotalDiscountPrice = labResponse.labTestItems.reduce(
        (sum, item) => {
          return sum + Number(item.lab_test.discountPrice) * item.quantity;
        },
        0
      );
      // console.log(labResponse);

      setTotalMrp(total);
      setGrandTotal(labResponse.totalCost);
      setTotalDiscountPrice(TotalDiscountPrice);
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
            {labResponse?.currentAddress?.firstName}{" "}
            {labResponse?.currentAddress?.lastName}
          </p>
          <p className="text-sm w-[230px] md:w-full">
            {labResponse?.currentAddress?.address}
          </p>
          <p className="text-sm w-[230px] md:w-full">
            {labResponse?.currentAddress?.postalCode} ,
            {labResponse?.currentAddress?.district}, Bangladesh
          </p>
          <p className="text-sm w-[230px] md:w-full">
            Sample Collection Time:{" "}
            {labResponse?.collectionTime ?
              new Date(labResponse?.collectionTime).toLocaleString() :
              "Not Set Yet"}
          </p>
          <p className="text-sm w-[230px] md:w-full">
            Location : {labResponse.location}
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
        <div className="grid grid-cols-5 sm:grid-cols-12 p-4 bg-[#fff4f4] text-xs md:text-sm font-semibold text-center">
          <p className="sm:col-span-3 text-start">Product</p>
          <p className="sm:col-span-2 ">MRP</p>
          <p className="sm:col-span-2 ">Discount Price</p>
          <p className="hidden lg:block sm:col-span-2 ">Quantity</p>
          <p className="md:hidden block sm:col-span-2 ">Qty</p>
          <p className="sm:col-span-3 ">Price </p>
        </div>

        {labResponse?.labTestItems.map((item, index) => (
          <div
            className="grid grid-cols-5 sm:grid-cols-12 p-2 border-b font-[450] text-xs md:text-sm"
            key={index}
          >
            <p className="sm:col-span-3 line-clamp-2">{item.lab_test.name}</p>
            <p className="sm:col-span-2 text-center">BDT {item.lab_test.mrp}</p>
            <p className="sm:col-span-2 text-center">BDT {item.itemCost}</p>
            <p className="sm:col-span-2 text-center">{item.quantity}</p>
            <p className="sm:col-span-3 text-center">
              BDT {Number(item.itemCost) * Number(item.quantity)}
            </p>
          </div>
        ))}

        <div className="grid grid-cols-12  md:grid-cols-10 p-2">
          <span className="col-span-4 md:col-span-6 "></span>
          <div className=" col-span-8 md:col-span-4">
            <p className=" grid grid-cols-3 md:grid-cols-5 text-xs md:text-sm font-[450]">
              <span className=" col-span-2">Total MRP</span>
              <span className=" col-span-1 md:col-span-3  text-center">
                {" "}
                {/* BDT {totalCost - 50} */}
                BDT {totalMrp}
              </span>
            </p>
            {/* --------------------- */}
            <p className=" grid grid-cols-3 my-2 md:grid-cols-5 border-b border-[#6b7588] text-xs md:text-sm font-[450]">
              <span className=" col-span-2">Discount</span>
              <span className="col-span-1 md:col-span-3 text-center">
                {" "}
                {/* BDT {totalCost - 50} */}
                {totalDiscountPrice &&
                  totalMrp &&
                  `BDT ${totalMrp - totalDiscountPrice}`}
              </span>
            </p>
            <p className=" grid grid-cols-3 md:grid-cols-5 text-xs md:text-sm font-[450]">
              <span className=" col-span-2">Sub Total</span>
              <span className="col-span-1 md:col-span-3 text-center">
                {" "}
                BDT {totalDiscountPrice}
              </span>
            </p>

            {/* ----------------------- */}
            <p className="my-2 border-b border-[#6b7588] grid grid-cols-3 md:grid-cols-5 text-xs md:text-sm font-[450]">
              <span className="  col-span-2 line-clamp-2">
                Home Sample Collection Fee &nbsp;{" "}
              </span>
              <span className="col-span-1 md:col-span-3 text-center">
                {" "}
                BDT {labResponse.deliveryCharge}
              </span>
            </p>
            {/* ---------------------------- */}
            <p className=" my-2 grid grid-cols-3 md:grid-cols-5 text-xs md:text-sm font-[450]">
              <span className=" col-span-2">Grand Total &nbsp; </span>
              <span className=" col-span-1 md:col-span-3 text-center">
                {" "}
                BDT {grandTotal}
              </span>
            </p>

            {labResponse?.paymentStatus === "success" && (
              <>
                <hr className="border border-gray-500" />
                <p className=" my-2 grid grid-cols-3 md:grid-cols-5 text-xs md:text-sm font-[450] ">
                  <span className="  col-span-2">Paid &nbsp; </span>
                  <span className="col-span-1 md:col-span-3 text-center ">
                    {" "}
                    BDT {grandTotal}
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
        <div className="py-1 ">
          <div>
            <PrimaryText
              textcolor="text-black"
              fontsize="text-[14px]"
              fontweight="font-medium"
            >
              Billing Address
            </PrimaryText>
            <p className="my-1 text-sm">
              Name :   {labResponse?.currentAddress?.firstName}{" "}
              {labResponse?.currentAddress?.lastName}
            </p>
            <p className="text-sm">
              Phone : {labResponse?.user?.dialCode}{" "}
              {labResponse?.currentAddress?.phone}
            </p>
            <p className="text-sm">
              Email : {labResponse?.currentAddress?.email}
            </p>
            <p className="text-sm w-[230px] md:w-full">
              {labResponse?.currentAddress?.address}
            </p>
            <p className="text-sm w-[230px] md:w-full">
              P.O. {labResponse?.currentAddress?.thana}
            </p>
            <p className="text-sm w-[230px] md:w-full">
              {labResponse?.currentAddress?.postalCode} ,
              {labResponse?.currentAddress?.district}, Bangladesh
            </p>
          </div>
        </div>
        <div className="py-1 ">
          <PrimaryText
            textcolor="text-black"
            fontsize="text-[14px]"
            fontweight="font-medium"
          >
            Payment Method
          </PrimaryText>
          <p className="text-sm ">
            {labResponse?.paymentStatus == "success"
              ? labResponse?.paymentMethod
              : "Cash On Delivery"}
          </p>
          {auth_code && (
            <p className="text-sm ">Authorization Code : {auth_code} </p>
          )}
          <p className="text-sm ">
            Reference Number : {labResponse?.invoiceNumber}
          </p>
          <p className="text-sm ">Transaction Type : Purchase </p>
        </div>
      </div>
    </>
  );
};

export default LabInvoice;
