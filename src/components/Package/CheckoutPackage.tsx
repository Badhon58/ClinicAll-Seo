import React, { useState } from "react";
import {
  NewBronze,
  newGold,
  newSilver,
  Package,
  PackageVariation,
} from "./Interface";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { Trans, useTranslation } from "react-i18next";
import Link from "next/link";
const CheckoutPackage = ({ data }: { data: Package }) => {
  const { i18n, t } = useTranslation();
  const [defaultplan, setDefaultplan] = useState<string>(
    data?.packageVariation?.[0]
      ? `${data.packageVariation[0].duration}/${data.type}`
      : ""
  );

  const [packageVar, setPackageVar] = useState<PackageVariation | null>(
    data?.packageVariation?.[0] || null
  );

  const handleDurationCheck = async (
    e: React.ChangeEvent<HTMLInputElement>,
    item: PackageVariation
  ) => {
    setDefaultplan(e.target.value);
    setPackageVar(item);
    // console.log(item);
    // console.log(e.target.value);
  };

  const imgSrc =
    data.type === "bronze"
      ? NewBronze
      : data.type === "silver"
      ? newSilver
      : newGold;

  return (
    <div className="bg-[#FFF4F4] border rounded-t-[26px] h-full">
      <div className="relative flex  items-center">
        <Image
          src={imgSrc}
          alt={data?.type ?? ""}
          width={434}
          height={261}
          className="object-cover w-full rounded-t-md"
        />
        {/* <p className="absolute pl-5 capitalize font-medium text-base">
          {t(data?.type ?? "")}/{t(packageVar?.duration ?? "")}
        </p>{" "} */}
        <div className="absolute top-0 h-full flex justify-between flex-col">
          <Image
            src={"/services/HeroImage2.svg"}
            alt="Package Image"
            width={100}
            height={100}
            className="pl-3 w-40 h-40"
          />
          <p className=" pl-3 capitalize  mb-6 bg-[#f8c4db] text-black  rounded-r-full pr-2">
            <span className=" text-lg 2xl:text-xl font-semibold">
              {" "}
              {t(data?.type ?? "")}
            </span>
            /
            <span className="text-[10px] 2xl:text-xs font-medium">
              {t(packageVar?.duration ?? "")}
            </span>
          </p>{" "}
        </div>
        {/* Add text color for visibility */}
      </div>
      <div className="p-3 text-justify">
        <p className=" capitalize mb-1">
          <span className="font-medium">
            {t(packageVar?.duration ?? "")} - {""}
          </span>
          <span className="text-[#EB148C] font-medium">
            {t("moneyCount", { count: packageVar?.sellingPrice })}
          </span>
        </p>
        <div className=" border-y-2 p-1 py-2 flex justify-between items-center border-[#D9D9D9]">
          {data?.packageVariation?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center space-x-2"
            >
              <input
                type="radio"
                name={`${item.duration}/${data.type}`}
                id={`${item.duration}/${data.type}`}
                className="cursor-pointer accent-pink-500"
                // checked
                value={`${item.duration}/${data.type}`}
                checked={defaultplan === `${item.duration}/${data.type}`}
                onChange={(e) => handleDurationCheck(e, item)}
              />
              <label
                htmlFor={`${item.duration}/${data.type}`}
                className="capitalize cursor-pointer "
              >
                {t(item?.duration ?? "")}
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-2 mt-2">
          <p className="flex items-center space-x-1.5 text-sm">
            {" "}
            <span className="bg-[#16020B] p-0.5">
              <FaCheck className="text-white" size={11} />
            </span>{" "}
            <span>
              {" "}
              {i18n.language === "bn" ? packageVar?.bnTitle : packageVar?.title}
            </span>
          </p>
          {data.type == "telemedicine" && (
            <p className="flex items-center space-x-1.5 text-xs 2xl:text-sm">
              <span className="bg-[#16020B] p-0.5">
                <FaCheck className="text-white" size={11} />
              </span>
              <span>{t("telemedicinetext")}</span>
            </p>
          )}
          {packageVar?.hospitalCashback && (
            <p className="flex items-center space-x-1.5 text-sm">
              {" "}
              <span className="bg-[#16020B] p-0.5">
                <FaCheck className="text-white" size={11} />
              </span>{" "}
              <span>
                <Trans
                  i18nKey="hospital_cashback_package"
                  values={{ count: packageVar?.hospitalCashback ?? 0 }}
                  components={{
                    bold: (
                      <strong className="font-normal text-[15px] text-gray-900" />
                    ),
                  }}
                />
              </span>
            </p>
          )}
          {packageVar?.perClaimBenefit && (
            <p className="flex items-center space-x-1.5 text-sm">
              {" "}
              <span className="bg-[#16020B] p-0.5">
                <FaCheck className="text-white" size={11} />
              </span>{" "}
              <span>
                {t("per_claim_benefit")}{" "}
                <strong className="font-normal text-[15px] text-gray-900">
                  {t("moneyCount", {
                    count: packageVar?.perClaimBenefit ?? 0,
                  })}
                </strong>
              </span>
            </p>
          )}

          {packageVar?.perClaimBenefit && (
            <p className="flex items-center space-x-1.5 text-sm">
              {" "}
              <span className="bg-[#16020B] p-0.5">
                <FaCheck className="text-white" size={11} />
              </span>{" "}
              <span>
                {t("per_day_benefit")}{" "}
                <strong className="font-normal text-[15px] text-gray-900">
                  {t("moneyCount", { count: packageVar?.perDayBenefit ?? 0 })}
                </strong>
              </span>
            </p>
          )}
          {packageVar?.isolationCoverage && (
            <p className="flex items-center space-x-1.5 text-sm">
              {" "}
              <span className="bg-[#16020B] p-0.5">
                <FaCheck className="text-white" size={11} />
              </span>{" "}
              <span>
                {t("isolation_coverage")}{" "}
                <strong className="font-normal text-[15px] text-gray-900">
                  {t("moneyCount", {
                    count: packageVar?.isolationCoverage ?? 0,
                  })}
                </strong>
              </span>
            </p>
          )}
          {packageVar?.opd && (
            <p className="flex items-center space-x-1.5 text-sm">
              {" "}
              <span className="bg-[#16020B] p-0.5">
                <FaCheck className="text-white" size={11} />
              </span>{" "}
              <span>
                {t("opd_consultation")}{" "}
                <strong className="font-normal text-[15px] text-gray-900">
                  {t("moneyCount", { count: packageVar?.opd ?? 0 })}
                </strong>
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPackage;
