"use client";
import React, { useState } from "react";
import { Package, PackageVariation } from "./Interface";
import { FaCheck } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
const PackageInstantDoctor = ({
  gift,
  data,
  defaultplan,
  packageVar,
}: {
  gift: string;
  data: Package;
  defaultplan: string;
  packageVar: PackageVariation | null;
}) => {
  const { i18n, t } = useTranslation();
  const [isChecked, setIsChecked] = useState(gift === "true");
  const [phoneData, setPhoneData] = useState({
    countryCode: "",
    dialCode: "",
    phone: "",
  });
  const [username, setUsername] = useState<string>("");
  const handlePhoneChange = (value: string, country: any) => {
    let phoneWithoutDialCode = value.replace(`+${country.dialCode}`, "").trim();
    setPhoneData({
      countryCode: country.countryCode.toUpperCase(),
      dialCode: country.dialCode,
      phone: phoneWithoutDialCode.startsWith(country.dialCode)
        ? phoneWithoutDialCode.slice(country.dialCode.length)
        : phoneWithoutDialCode,
    });
  };
  const router = useRouter();
  const handleBuyPackage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      isChecked &&
      phoneData.countryCode &&
      phoneData.dialCode &&
      phoneData.phone
    ) {
      console.log("Gift");
      router.push(
        `/healthPackage/checkout?packageId=${data?._id}&packageTitle=${data?.type}&variationId=${packageVar?._id}&phone=${phoneData.phone}&countryCode=${phoneData.countryCode}&dialCode=${phoneData.dialCode}&gift=${gift}&fullname=${username}`
      );
    } else {
      console.log("normal");
      router.push(
        `/healthPackage/checkout?packageId=${data?._id}&packageTitle=${data?.type}&variationId=${packageVar?._id}`
      );
    }
  };
  return (
    <div className="grid lg:px-6 px-2">
      {" "}
      <p className="text-base font-medium tracking-tight text-justify9">
        Terms and Conditions for CliniCall Limited’s Health Package
      </p>
      {/* <p className="py-0.5 text-base">
        <span className="font-medium "> Effective Date : </span>{" "}
        <span> 01-02-2025</span>
      </p> */}
      <p className="text-sm text-justify">
        Welcome to CliniCall Limited’s Health Package. By purchasing or using
        our health package, you agree to abide by the following terms and
        conditions. Please read them carefully.
      </p>
      <span className=" my-2  bg-black h-[1px]" />
      <div>
        <p className="text-base t font-medium">
          Stay connected to your health anytime, anywhere with UNLIMITED audio
          and video calls to our doctors!
        </p>
        <div className="text-sm text-justify ml-3">
          <p className="flex items-center space-x-1.5 text-xs 2xl:text-sm">
            <span className="bg-[#16020B] p-0.5">
              <FaCheck className="text-white" size={11} />
            </span>
            <span>
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
        </div>
      </div>
      <span className=" my-2  bg-black h-[1px]" />
      <p className="text-base font-semibold ">Contact Information</p>
      <p className="text-sm">
        For any inquiries or clarifications related to the terms and conditions
        of the health package, please contact:
      </p>
      <ul className="list-disc ps-5">
        <li>
          {" "}
          <span className="font-medium text-sm"> Email :</span>{" "}
          info@theclinicall.com
        </li>
        <li>
          {" "}
          <span className="font-medium text-sm"> Phone :</span> ০৯৬ ৭৭৬ ০১০ ৫০
        </li>
        <li>
          {" "}
          <span className="font-medium text-sm"> Address:</span> House: 03,
          Road: 2, Baridhara J Block, Dhaka
        </li>
      </ul>
      <div className="mt-1">
        <p className="">
          <span  className="font-medium"> Disclaimer: </span>CliniCall Limited is a health-tech company
          primarily providing telemedicine services. Insurance benefits included
          with our packages are provided to customers free of charge. CliniCall
          Limited does not charge for insurance. We only charge for telemedicine
          calls.
        </p>
      </div>
      <hr className="my-1"/>
      <p>
        <span className="font-medium">Note : </span> CliniCall Limited is a
        health-tech company primarily providing telemedicine services. Insurance
        benefits included with our packages are provided to customers free of
        charge. CliniCall Limited does not charge for insurance. We only charge
        for telemedicine calls.
      </p>
      {gift == "true" && (
        <div className=" rounded-md  grid lg:grid-cols-2 my-2">
          <div className="py-2.5  p-3  bg-white shadow-[0px_0px_15px_2px_rgba(0,_0,_0,_0.1)]">
            <div className="py-2.5  p-3 bg-[#fff4f4] rounded">
              <div className="flex justify-between">
                <p className="font-semibold text-base capitalize">
                  {t(data?.type ?? "")}/ {t(packageVar?.duration ?? "")}
                </p>
                <div className="flex space-x-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="accent-pink-500"
                  />
                  <label htmlFor="gift">Send as gift</label>
                </div>
              </div>
              <p className="text-base font-medium">
                {" "}
                {t("moneyCount", {
                  count: packageVar?.sellingPrice ?? 0,
                })}
              </p>
              <div className="my-4">
                <label
                  className="block text-sm font-normal text-gray-700"
                  htmlFor="phone"
                >
                  {t("phoneNumber")}
                  <span className="text-red-500">*</span>
                </label>
                <PhoneInput
                  country={"bd"}
                  // disableCountryCode={false}
                  onChange={handlePhoneChange}
                  inputStyle={{ width: "100%" }}
                  disabled={!isChecked}
                />
              </div>
              <div className="">
                <label
                  className="block text-sm font-normal text-gray-700"
                  htmlFor="phone"
                >
                  {t("fullNamepackage")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="outline-none py-2.5 px-2 border-gray-300 w-full text-xs border rounded"
                  placeholder={t("enterFullNamepackage")}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  disabled={!isChecked}
                  name="fullname"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {gift == "true" && (
        <div className="flex justify-end">
          <button
            onClick={handleBuyPackage}
            className="w-[159px] h-10 py-[11px] rounded-full font-medium border border-black hover:border-[#E2136E] hover:text-white text-center flex justify-center items-center hover:bg-[#E2136E]"
          >
            {" "}
            {t("Buy Package")}
          </button>
        </div>
      )}
    </div>
  );
};

export default PackageInstantDoctor;
