import React from "react";
import { PatientOrder } from "../interface";
import PrimaryText from "../PrimaryText";
import moment from "moment";

const PhysicalDoctor = ({
  PhysicalDoctorResponse,
  auth_code,
}: {
  PhysicalDoctorResponse: PatientOrder;
  auth_code: any;
}) => {
  
  return (
    <div>
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
            {PhysicalDoctorResponse?.userId?.firstName}{" "}
            {PhysicalDoctorResponse?.userId?.lastName}
          </p>
          <p className="text-sm w-[230px] md:w-full">
            Address : {PhysicalDoctorResponse?.address}
          </p>
          <p className="text-sm w-[230px] md:w-full"></p>

          <p className="text-sm w-[230px] md:w-full">
            Visit Date :{" "}
            {new Date(PhysicalDoctorResponse?.visitTime).toLocaleString()}
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
        <div className="grid grid-cols-4 sm:grid-cols-12 p-4 bg-[#fff4f4] text-xs md:text-sm font-semibold text-center">
          <p className="sm:col-span-3 text-start">Service Name</p>
          <p className="sm:col-span-2 ">MRP</p>
          <p className="sm:col-span-2 ">Discount</p>
          <p className="hidden md:block sm:col-span-2 ">Quantity</p>
          <p className="md:hidden block sm:col-span-2 ">Qty</p>
          <p className="sm:col-span-3 ">Price</p>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-12 p-2 border-b font-[450] text-xs md:text-sm">
          <p className="sm:col-span-3 line-clamp-2">
            {PhysicalDoctorResponse.physicalDoctorId.scope}
            {"("}
            <span className="capitalize">
              {PhysicalDoctorResponse.category
                ? PhysicalDoctorResponse.category
                : "General Doctor"}
              {")"}
            </span>
          </p>
          <p className="sm:col-span-2 text-center">
            BDT {PhysicalDoctorResponse.physicalDoctorId.price}
          </p>
          <p className="sm:col-span-2 text-center">0</p>
          <p className="sm:col-span-2 text-center">1</p>
          <p className="sm:col-span-3  text-center">
            {" "}
            BDT {PhysicalDoctorResponse.physicalDoctorId.price}
          </p>
        </div>
        <div className="grid grid-cols-12  md:grid-cols-10 p-2">
          <span className="col-span-4 md:col-span-6 "></span>
          <div className=" col-span-8 md:col-span-4">
            <p className=" grid grid-cols-3 md:grid-cols-5 text-xs md:text-sm font-[450]">
              <span className=" col-span-2">Total MRP</span>
              <span className=" col-span-1 md:col-span-3  text-center">
                {" "}
                BDT {PhysicalDoctorResponse.physicalDoctorId.price}
              </span>
            </p>
            {/* ----------------------- */}
            <p className="my-2 border-b border-[#6b7588] grid grid-cols-3 md:grid-cols-5 text-xs md:text-sm font-[450]">
              <span className="  col-span-2 line-clamp-2">
                Discount &nbsp;{" "}
              </span>
              <span className="col-span-1 md:col-span-3 text-center">
                {" "}
                BDT 0
              </span>
            </p>
            {/* ---------------------------- */}
            <p className=" my-2 grid grid-cols-3 md:grid-cols-5 text-xs md:text-sm font-[450]">
              <span className=" col-span-2">Grand Total &nbsp; </span>
              <span className=" col-span-1 md:col-span-3 text-center">
                {" "}
                BDT {PhysicalDoctorResponse.physicalDoctorId.price}
              </span>
            </p>
            {PhysicalDoctorResponse?.paymentStatus === "success" && (
              <>
                <hr className="border border-gray-500" />
                <p className=" my-2 grid grid-cols-3 md:grid-cols-5 text-xs md:text-sm font-[450] ">
                  <span className="  col-span-2">Paid &nbsp; </span>
                  <span className="col-span-1 md:col-span-3 text-center ">
                    {" "}
                    BDT {PhysicalDoctorResponse.physicalDoctorId.price}
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
          fontsize="text-[14px]"
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
              Name : {PhysicalDoctorResponse?.userId?.firstName}{" "}
              {PhysicalDoctorResponse?.userId?.lastName}
            </p>
            <p className="text-sm">
              Phone : {PhysicalDoctorResponse?.userId?.dialCode}{" "}
              {PhysicalDoctorResponse?.userId?.phone}
            </p>
            <p className="text-sm">
              Email : {PhysicalDoctorResponse?.userId?.email}
            </p>
            {/* <p className="text-sm w-[230px] md:w-full">
              {PhysicalDoctorResponse?.userId?.address}
            </p>
            <p className="text-sm w-[230px] md:w-full">
              P.O. {PhysicalDoctorResponse?.userId?.thana}
            </p>
            <p className="text-sm w-[230px] md:w-full">
              {PhysicalDoctorResponse?.userId?.postalCode} ,
              {PhysicalDoctorResponse?.userId?.district}, Bangladesh
            </p> */}
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
          <p className="text-sm capitalize ">
            {PhysicalDoctorResponse?.paymentStatus == "success"
              ? PhysicalDoctorResponse?.paymentMethod
              : "Cash On Delivery"}
          </p>
          {auth_code && (
            <p className="text-sm ">Authorization Code : {auth_code} </p>
          )}
          <p className="text-sm ">
            Reference Number : {PhysicalDoctorResponse?.invoiceNumber}
          </p>
          <p className="text-sm ">Transaction Type : Purchase </p>
        </div>
      </div>
    </div>
  );
};

export default PhysicalDoctor;
