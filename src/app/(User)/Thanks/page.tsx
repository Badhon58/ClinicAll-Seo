"use client";
import moment from "moment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const page = () => {
  const query = useSearchParams();
  const mobileNo = query.get("mobile_no");
  const invo = query.get("invo");
  const amount = query.get("amount");
  const [discount, setDiscount] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint: any = useReactToPrint({
    contentRef,
    documentTitle: `TITLE`,
  });
  useEffect(() => {
    if (invo?.startsWith("LAB")) {
      setDiscount(500);
    } else if (invo?.startsWith("MED")) {
      setDiscount(50);
    }
  }, []);
  return (
    <section className="xl:container xl:mx-auto">
      <main ref={contentRef}>
        <div className="container mx-auto lg:w-[50%] 2xl:mt-[70px] mt-[35px] border border-[#8F90A6] px-[32px] py-[40px] rounded-3xl">
          <div className="flex items-center justify-center">
            <img
              src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-05012025T125140-thanks.svg"
              alt="Thanks Image"
              className="w-[149px] h-[146.79px]"
            />
          </div>
          <div className="text-center lg:mt-8">
            <p className="font-bold text-xl text-[#3A3A3C]">
              Thank you for your order!
            </p>
            <p className="opacity-60 mt-[10px]">
              The order confirmation has been sent to {mobileNo}
            </p>
          </div>
          <div className="flex flex-col space-y-[16px]">
            <div className="mt-[25px] flex flex-col space-y-[13px]">
              <p className="font-semibold text-lg text-[#3A3A3C]">
                Transaction Date
              </p>
              <p className="opacity-60">{moment().format("dddd, MMMM D, YYYY")}</p>
            </div>
            <hr className="border-dashed border w-full border-[#8F90A6]" />
            <div className="mt-[25px] flex flex-col space-y-[13px]">
              <p className="font-semibold text-lg text-[#3A3A3C]">Order ID</p>
              <p className="opacity-60">{invo}</p>
            </div>
            <hr className="border-dashed border w-full border-[#8F90A6]" />
            <div className="mt-[25px] flex flex-col space-y-[13px]">
              <p className="font-semibold text-lg text-[#3A3A3C]">
                Payment Method
              </p>
              <p className="opacity-60">Cash On Delivery</p>
            </div>
            <hr className="border-dashed border w-full border-[#8F90A6]" />
            <div className="mt-[25px] flex flex-col space-y-[13px]">
              <p className="font-semibold text-lg text-[#3A3A3C]">
                Shipping Method
              </p>
              <p className="opacity-60">Express delivery (2-7 business days)</p>
            </div>
            <hr className="border-dashed border w-full border-[#8F90A6]" />
            <div className="mt-[10px] flex flex-col space-y-[13px]">
              <div className="flex justify-between">
                <p className="font-semibold text-lg text-[#3A3A3C]">Subtotal</p>
                {/* <p>BDT {amount}</p> */}
                <p>BDT {parseInt(amount?.toString() || "") - discount}</p>
              </div>
            </div>
            <hr className="border-dashed border w-full border-[#8F90A6]" />
            <div className="mt-[10px] flex flex-col space-y-[13px]">
              <div className="flex justify-between">
                <p className="font-medium text-sm text-[#8F90A6]">
                  Delivery charge
                </p>
                <p className="font-medium text-sm text-[#8F90A6]">
                  BDT {discount}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-sm text-[#8F90A6]">Tax & Fee</p>
                <p className="font-medium text-sm text-[#8F90A6]">BDT 0</p>
              </div>
              <hr className="border-dashed border w-full border-[#8F90A6]" />
            </div>
            <div className="mt-[10px] flex flex-col space-y-[13px]">
              <div className="flex justify-between">
                <p className="font-semibold text-lg text-[#3A3A3C]">
                  Grand Total
                </p>
                <p>BDT {amount}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center lg:mt-10 mt-2 justify-center lg:space-x-[24px] space-x-3">
            <Link
              href={"/"}
              className="text-[16px] font-medium text-white bg-[#E2136E] lg:px-8 lg:py-4 p-2 rounded-full"
            >
              Back to Home
            </Link>
            <button onClick={handlePrint} className="text-[16px] font-medium text-[#E2136E] border border-[#E2136E] rounded-full p-2 lg:px-8 lg:py-4">
              Get PDF Receipt
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default page;
