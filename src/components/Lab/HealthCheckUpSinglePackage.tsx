"use client";
import React, { useEffect, useState } from "react";
import { LabPackage } from "./Interface";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HealthCheckUpSinglePackage = ({ data }: { data: LabPackage }) => {
  const path = usePathname();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  return loading ? (
    "Loading.."
  ) : (
    <div className={`packagecss`}>
      <div className="flex items-center">
        <Image
          src={data.image ?? ""}
          alt={data.title ?? ""}
          width={334}
          height={161}
          className={`object-contain w-full rounded-t-[14px] `}
        />
      </div>
      <div className="px-4 py-2.5 h-full">
        {data.labPackageItems.map((item, index) => {
          return (
            <div className="flex flex-col items-start py-1 " key={index}>
              <div className="flex space-x-1">
                <input
                  type="checkbox"
                  className="accent-[#05A660] bg-white mt-1 w-4 h-[14px]"
                  checked
                  readOnly
                />
                <p className="text-xs lg:text-sm font-medium">{item.title}</p>
              </div>
              <div className=" flex flex-wrap  text-[9px] items-center ml-4">
                {item.subItems.map((item, index) => {
                  return (
                    <p key={index} className="flex items-center pl-1">
                      {" "}
                      <span className="size-1 bg-[#EB148C] rounded-full" />{" "}
                      <span className="pl-1"> {item}</span>
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {path != "/lab/healthcheckup" && (
        <div className="flex items-center justify-center pb-4">
          <Link
            href={`/lab/healthcheckup?query=${data._id}`}
            className="bg-[#E2136E] text-white text-sm font-medium px-5 py-1.5 rounded-[5px]"
          >
            {t("bookNow")}
          </Link>
        </div>
      )}
    </div>
  );
};

export default HealthCheckUpSinglePackage;
