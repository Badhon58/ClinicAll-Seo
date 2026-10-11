import React from "react";
import { Appointment } from "../interface";
import PrimaryText from "../PrimaryText";
import moment from "moment";

const AppInvoice = ({
  AppoitmentResponse,
  auth_code,
}: {
  AppoitmentResponse: Appointment;
  auth_code: string;
}) => {
  return (
    <>
      <div className=" border rounded-md px-6 py-3 flex justify-between">
        <div>
          <PrimaryText
            textcolor="text-black"
            fontsize="text-[16px]"
            fontweight="font-medium"
          >
            Doctor Information
          </PrimaryText>
          <p className="mt-1 text-sm font-medium">
            {AppoitmentResponse.doctor?.firstName}{" "}
            {AppoitmentResponse.doctor?.lastName}
          </p>
          <p className="text-sm">BMDC No : {AppoitmentResponse.doctor?.bmdc}</p>

          <p className="text-sm capitalize">
            {AppoitmentResponse.doctor?.degree} ({" "}
            {AppoitmentResponse.doctor?.hospital})
          </p>
        </div>

        <div className="">
          {" "}
          <PrimaryText
            textcolor="text-black"
            fontsize="text-[17px]"
            fontweight="font-medium"
          >
            User Information :
          </PrimaryText>
          <div className="text-sm">
            <p className="">
              <span className=""> Name :</span>
              <span className="">
                {" "}
                {AppoitmentResponse.user?.firstName}{" "}
                {AppoitmentResponse.user?.lastName}
              </span>
            </p>

            <p className="">
              <span className="">Contact :</span>
              <span className=""> {AppoitmentResponse.phone}</span>
            </p>
            <p className="flex justify-between ">
              <span className="">Email :</span>
              <span className=""> {AppoitmentResponse.email}</span>
            </p>
          </div>
        </div>
      </div>

      <div className=" border rounded-md my-2 lg:my-5">
        <div className="grid grid-cols-4 sm:grid-cols-10 p-4 bg-[#fff4f4] text-xs md:text-sm">
          <p className="sm:col-span-2 font-semibold ">Doctor Name</p>
          <p className="sm:col-span-2 font-semibold text-center ">
            Patient Name{" "}
          </p>
          <p className="sm:col-span-2 font-semibold text-center ">
            Patient Age{" "}
          </p>
          <p className="sm:col-span-2 font-semibold text-center ">
            Time & Date{" "}
          </p>
          <p className="sm:col-span-2 text-center font-semibold ">Fee</p>
        </div>
        <div className="grid grid-cols-4 border-b sm:grid-cols-10 p-4 ">
          <p className="sm:col-span-2  ">
            {AppoitmentResponse.doctor?.firstName}{" "}
            {AppoitmentResponse.doctor?.lastName}
          </p>
          <p className="sm:col-span-2  text-center flex flex-col">
            <span> {AppoitmentResponse.fullName}</span>{" "}
          </p>
          <p className="sm:col-span-2 text-center ">{AppoitmentResponse.age}</p>
          {/* <p className="sm:col-span-2  text-center ">
            {AppoitmentResponse.phone}{" "}
          </p> */}
          <p className="sm:col-span-2  text-center">
            <span>{AppoitmentResponse.time}</span> /
            <span> {moment(AppoitmentResponse.date).format("DD-MM-YYYY")}</span>
          </p>
          <p className="sm:col-span-2 text-center  ">
            BDT {AppoitmentResponse.paymentFee}
          </p>
        </div>
        <div className="grid grid-cols-12  lg:grid-cols-10">
          <span className="col-span-5 lg:col-span-7 "></span>
          <div className=" col-span-7 lg:col-span-3  text-xs md:text-sm  text-[#333843] ">
            <p className=" grid grid-cols-3 lg:grid-cols-4 font-medium">
              <span className=" text-[#333843] font-medium col-span-2">
                Sub Total
              </span>
              <span className=" font-medium text-[#333843]  col-span-1 lg:col-span-2">
                {" "}
                {/* BDT {totalCost - 50} */}
                BDT {AppoitmentResponse.paymentFee}
              </span>
            </p>

            <p className=" my-2 grid grid-cols-3 lg:grid-cols-4 font-medium">
              <span className=" font-medium text-[#333843] col-span-2">
                Grand Total &nbsp;{" "}
              </span>
              <span className="font-medium   col-span-1 lg:col-span-2">
                {" "}
                BDT {AppoitmentResponse.paymentFee}
              </span>
            </p>
            <p className=" my-2 grid grid-cols-3 lg:grid-cols-4 font-medium border-t-2 border-gray-600 ">
              <span className=" font-medium text-[#333843] col-span-2">
                Paid &nbsp;{" "}
              </span>
              <span className="font-medium  col-span-1 lg:col-span-2 ">
                {" "}
                BDT {AppoitmentResponse.paymentFee}
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
              Name : {AppoitmentResponse.user?.firstName}{" "}
              {AppoitmentResponse.user?.lastName}
            </p>
            <p className="text-sm">
              Phone : {AppoitmentResponse?.user?.countryCode}{" "}
              {AppoitmentResponse.user?.phone}
            </p>
            <p className="text-sm">Email : {AppoitmentResponse.user?.email}</p>
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
          <p className="text-sm ">{AppoitmentResponse.paymentStatus}</p>
          {auth_code && (
            <p className="text-sm ">Authorization Code : {auth_code} </p>
          )}
          <p className="text-sm ">
            Reference Number : {AppoitmentResponse.invoiceNumber}
          </p>
          <p className="text-sm ">Transaction Type : Purchase </p>
        </div>
      </div>
    </>
  );
};

export default AppInvoice;
