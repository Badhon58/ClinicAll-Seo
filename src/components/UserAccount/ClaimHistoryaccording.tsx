"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Claimhistory } from "./Interface";
import ClaimStatus from "./ClaimStatus";

const ClaimHistoryaccording = ({
  item,
  index,
}: {
  item: Claimhistory;
  index: number;
}) => {
  const [according, setAccording] = useState(false);
  const [status, setStatus] = useState(3);

  useEffect(() => {
    if (item.status == "processing") {
      setStatus(3);
    } else if (item.status == "approved") {
      setStatus(4);
    } else if (item.status == "disbursement") {
      setStatus(5);
    }
  }, []);

  return (
    <>
      <div
        className={`grid grid-cols-5 lg:grid-cols-12 ${
          index % 2 != 0 && "bg-gray-50"
        }`}
      >
        <div className=" lg:col-span-4 text-base flex  items-center space-x-2 ">
          <Image
            src={item?.user?.image || "/default-image.png"}
            alt={item?.user?.firstName || "User Image"}
            width={50}
            height={50}
            className="border rounded"
          />
          <div>
            <p className="font-semibold text-[#6B7588] text-sm">
              {item?.user?.firstName} {item?.user?.lastName}
            </p>
            <p className="text-xs font-medium text-[#8F90A6]">
              {item?.user?.email}
            </p>
          </div>
        </div>
        <p className="lg:col-span-2 capitalize text-sm text-[#6B7588] font-[550] flex items-center justify-center ">
          {item?.bookedPackage?.packageId?.type}
        </p>
        <p className="lg:col-span-2 flex items-center justify-center text-sm text-[#6B7588] font-[550]   ">
          {item?.claimAmount}
        </p>
        <p className="flex items-center justify-center lg:col-span-2  capitalize ">
          <span className="py-2 px-1.5 bg-[#F4FFF3] text-[#5F8D4E] rounded text-[13px] font-medium ">
            {item.status}
          </span>
        </p>
        <button
          onClick={() => setAccording(!according)}
          className={`lg:col-span-2 grid place-items-center text-2xl transition outline-none  ${
            according ? "rotate-90" : "rotate-0"
          }`}
        >
          {">"}
        </button>
      </div>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          according
            ? "grid-rows-[1fr] opacity-100   p-2 my-3"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div
          className={`overflow-hidden ${
            according ? "" : "transition-all duration-300 ease-in-out"
          }`}
        >
          <ClaimStatus currentStep={status} />
        </div>
      </div>
    </>
  );
};

export default ClaimHistoryaccording;
