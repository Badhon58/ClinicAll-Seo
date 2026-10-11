"use client";
import React from "react";
import { DoctorProfile } from "./Interface";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";

const DoctorListProfile = ({ data }: { data: DoctorProfile }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col sm:items-start items-center  sm:flex-row min-h-[20vh] w-full sm:w-[78%] ">
      <div className="relative rounded-full size-36 items-center flex">
        <img
          src={data.image || "/MediServices/Doctor.svg"}
          alt={data.firstName}
          width={140}
          height={140}
          className="w-full h-full rounded-full border-[1.5px] border-[#EB148C]"
        />
        <Image
          src="/other/doctorbadge.svg"
          alt="Doctor badge"
          width={20}
          height={20}
          className="absolute -right-0 top-[65%]"
        />
      </div>
      <div className="md:ml-4 mt-1.5 lg:w-[70%]  sm:w-9/12 w-full">
        <Link href={`/doctorprofile/${data.slug}`} className="text-[#EB148C] cursor-pointer no-underline text-lg font-medium">
          {data?.firstName} {data?.lastName}
        </Link>
        <p className="text-[#6B7588] text-sm font-normal">
          {data.bmdcRegistered && `BMDC No: ${data.bmdc}`}
        </p>
        <p className="text-[#6B7588] text-sm font-normal break-words">
          {data.category.map((item, index) => (
            <span key={index} className="mr-2">
              {item.name}
            </span>
          ))}
          <span>( {data.degree} )</span>
        </p>
        <p className="text-[#6B7588] text-sm font-normal">
          {data.yearsOfExperience} years experience overall
        </p>
        <p className=" flex space-x-6">
          <span>{t("consultationFee")}</span>
          <span>
            {t("moneyCount", {
              count: data.visitFee,
            })}
          </span>
        </p>
        <hr className="my-1 w-[50%] border border-dashed border-gray-400" />

      </div>
    </div>
  );
};

export default DoctorListProfile;
