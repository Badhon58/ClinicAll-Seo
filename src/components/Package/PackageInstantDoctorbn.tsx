"use client";
import React, { useState } from "react";
import { Package, PackageVariation } from "./Interface";
import { FaCheck } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
const PackageInstantDoctorbn = ({
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
    <div className=" grid lg:px-6 px-2">
      <div className="">
        <p className="text-base font-medium tracking-tight text-justify">
          ক্লিনিকল লিমিটেডের হেলথ প্যাকেজের শর্তাবলী
        </p>
        {/* <p className="py-0.5 text-base">
          <span className="font-medium "> কার্যকর তারিখ: </span>{" "}
          <span> 0১ ফেব্রুয়ারি ২০২৫</span>
        </p> */}
        <p className="text-sm text-justify">
          ক্লিনিকল লিমিটেডের হেলথ প্যাকেজ কেনা বা ব্যবহার করার মাধ্যমে আপনি
          নিম্নলিখিত শর্তাবলীর সাথে সম্মত হচ্ছেন। দয়া করে শর্তাবলী মনোযোগ
          সহকারে পড়ুন।
        </p>
      </div>
      <span className=" my-2  bg-black h-[1px] w-full" />
      <div>
        <p className="text-base font-medium">
          যেকোনো সময়, যেকোনো স্থান থেকে আপনার স্বাস্থ্যের সঙ্গে সংযুক্ত থাকুন
          আমাদের ডাক্তারদের সাথে আনলিমিটেড অডিও এবং ভিডিও কলের মাধ্যমে!
        </p>
        <div className="text-sm text-justify ml-3 ">
          <div className="text-sm text-justify ml-3">
            <p className="flex items-center space-x-1.5 text-xs 2xl:text-sm">
              <span className="bg-[#16020B] p-0.5">
                <FaCheck className="text-white" size={11} />
              </span>
              {/* <span>{data?.packageVariation?.[0]?.title ?? ""}</span> */}
              <span>
                {i18n.language === "bn"
                  ? packageVar?.bnTitle
                  : packageVar?.title}
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
      </div>
      <span className=" my-2  bg-black h-[1px] w-full" />
      <div>
        <p className="text-lg font-semibold ">যোগাযোগের তথ্য </p>
        <p className="text-sm">
          স্বাস্থ্য প্যাকেজের শর্তাবলী সম্পর্কিত যেকোনো প্রশ্ন বা স্পষ্টকরণের
          জন্য, অনুগ্রহ করে যোগাযোগ করুন:
        </p>
        <ul className="list-disc ps-5">
          <li>
            {" "}
            <span className="font-medium"> ইমেইল :</span> info@theclinicall.com
          </li>
          <li>
            {" "}
            <span className="font-medium"> ফোন : </span> ০৯৬ ৭৭৬ ০১০ ৫০
          </li>
          <li>
            {" "}
            <span className="font-medium"> ঠিকানা : </span> বাড়ি: ০৩, রোড: ২,
            বারিধারা জে ব্লক, ঢাকা
          </li>
        </ul>
      </div>
      {/* bottom test  */}
      <div className="mt-1">
        <p className="text-sm">
          <span  className="font-medium">ডিসক্লেইমার : </span>ক্লিনিকল লিমিটেড একটি হেলথ-টেক প্রতিষ্ঠান।
          আমরা মূলত টেলিমেডিসিন সেবা প্রদান করি। আমাদের প্রদত্ত প্যাকেজের সাথে
          বীমা সুবিধা গ্রাহকদের বিনামূল্যে দেওয়া হয়। এই বীমার জন্য ক্লিনিকল
          লিমিটেড কোনো ধরনের চার্জ গ্রহণ করে না। আমরা শুধুমাত্র টেলিমেডিসিন কলের
          জন্য ফি গ্রহণ করি।
        </p>
      </div>
       <hr className="my-1"/>
      <div className=" mt-1">
        <p className=" text-sm">
          <span className="font-medium">মন্তব্য:</span>
          ক্লিনিকল লিমিটেড পূর্ব বিজ্ঞপ্তি ছাড়াই এই শর্তাবলী পরিবর্তন বা সংশোধন
          করার অধিকার সংরক্ষণ করে। আমাদের সেবা ব্যবহার অব্যাহত রেখে, আপনি
          সংশোধিত শর্তাবলী মেনে নিচ্ছেন বলে ধরে নেওয়া হবে।
        </p>
        <p className="my-0.5 text-sm">
          ক্লিনিকল লিমিটেড বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।
        </p>
      </div>

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

export default PackageInstantDoctorbn;
