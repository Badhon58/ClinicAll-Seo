"use client";
import React from "react";
import { labCart } from "../Lab/Interface";
import LabCart from "./LabCart";
import Link from "next/link";

const TrendingLab = ({
  allLabtest,
  setDropDown,
  setSearchTerm,
}: {
  allLabtest: labCart[];
  setDropDown: any;
  setSearchTerm: any;
}) => {
  return (
    allLabtest &&
    allLabtest.length > 0 && (
      <div className=" 2xl:min-h-[35vh]  p-3  ">
        <p className="p-2 text-xl font-medium">
          {allLabtest.length <= 0 ? "Trending Lab Item" : "All Lab Item"}
        </p>
        <div className="overflow-y-auto grid  gap-3  border p-3 rounded-md">
          {allLabtest?.map((item, index) => (
            <div
              onClick={() => {
                setDropDown(false);
                setSearchTerm("");
              }}
              key={index}
              className="grid grid-cols-11 p-3 rounded-md shadow-[0px_0px_10px_0px_rgba(0,_0,_0,_0.1)] hover:bg-gray-50 "
            >
              <LabCart item={item} />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default TrendingLab;
