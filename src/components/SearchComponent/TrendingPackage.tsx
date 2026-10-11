"use client";
import React from "react";
import {
  // bronzeBg,
  // bronzeButton,
  DoctorConsultation,
  // goldBg,
  // GoldButton,
  Package,
  // silverBg,
  // SilverButton,
} from "../Package/Interface";

import NewSinglePackageSearch from "../Package/NewSinglePackageSearch";

const TrendingPackage = ({
  searchKey,
  packages,
  setDropDown,
  setSearchTerm,
}: {
  searchKey: string;
  packages: Package[];
  setDropDown: any;
  setSearchTerm: any;
}) => {
  return (
    packages &&
    packages.length > 0 && (
      <div className=" 2xl:min-h-[35vh]  p-3  ">
        <p className="p-2 text-xl font-medium">
          {packages.length <= 0
            ? "Trending Health Package"
            : "All Health Package"}
        </p>
        <div className="overflow-y-hidden overflow-x-hidden grid lg:grid-cols-2 min-h-[40vh] gap-5 max-w-sm lg:max-w-2xl 2xl:max-w-full mx-auto rounded-md">
          {packages &&
            packages?.map((data, index) => {
              if (!data.showHome) {
                return null;
              }
              return (
                <div key={index} className="" onClick={() => setSearchTerm("")}>
                  <NewSinglePackageSearch data={data} />
                </div>
              );
            })}
        </div>
      </div>
    )
  );
};

export default TrendingPackage;
