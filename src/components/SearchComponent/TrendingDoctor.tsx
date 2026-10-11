"use client";
import React from "react";
import { DoctorProfile } from "../Doctor/Interface";
import DoctorListProfile from "../Doctor/DoctorListProfile";
import Link from "next/link";
export interface catagory {
  value: string;
  label: string;
}
const TrendingDoctor = ({
  allDoctor,
  searchKey,
  setDropDown,
  setSearchTerm,
}: {
  allDoctor: DoctorProfile[];
  searchKey: any;
  setDropDown: any;
  setSearchTerm: any;
}) => {
  return (
    allDoctor &&
    allDoctor.length > 0 && (
      <div className=" min-h-10  p-3  ">
        <p className="p-2 text-lg font-medium">
          {searchKey.length <= 0 ? "Specialized Doctor" : "All Doctor"}
        </p>
        {allDoctor && allDoctor?.length > 0 && (
          <div className="overflow-y-auto flex flex-col space-y-5 min-h-[40vh]  border p-3 rounded-md ">
            {allDoctor &&
              allDoctor?.length > 0 &&
              allDoctor?.map((item, index) => {
                return (
                  <Link
                    href={`/doctorlist?_doc_id_=${item._id}`}
                    onClick={() => {
                      setDropDown(false);
                      setSearchTerm("");
                    }}
                    className="p-4 rounded-xl bg-white hover:bg-[#FFF4F4] hover:bg-opacity-40 shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] w-full"
                    key={index}
                  >
                    {" "}
                    <DoctorListProfile data={item} />
                  </Link>
                );
              })}
          </div>
        )}
      </div>
    )
  );
};

export default TrendingDoctor;
