"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PrescriptionPrint } from "../common/PrescriptionPrint";

const Prescription = ({ item }: { item: any }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint: any = useReactToPrint({
    contentRef,
    documentTitle: `${item?.fullName}`,
  });
  return (
    <div className="place-content-center text-center items-center flex border-y md:border-0 md:border-x p-1.5  font-medium text-sm md:text-base">
      {item.status == "done" ? (
        <button
          onClick={handlePrint}
          className={
            " h-full text-[#5f8d4e] bg-[#f4fff3] w-full flex items-center justify-center p-2 rounded-md"
          }
        >
          View PDF
        </button>
      ) : (
        <p
          className={
            " h-full bg-[#fde6e9] text-[#f65b6b] w-full  flex items-center justify-center p-2 rounded-md"
          }
        >
          View PDF
        </p>
      )}

      <div className="hidden">
        <PrescriptionPrint innerRef={contentRef} data={item} />
      </div>
    </div>
  );
};

export default Prescription;
