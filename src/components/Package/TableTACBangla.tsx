"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import PackageBangla from "./PackageBangla";
import { Package, PackageVariation } from "./Interface";
import { FaCheck, FaRegCircleUser } from "react-icons/fa6";
import { Trans, useTranslation } from "react-i18next";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
const TableTACBangla = ({
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
  const [isChecked, setIsChecked] = useState(gift === "true");
  const [phoneData, setPhoneData] = useState({
    countryCode: "",
    dialCode: "",
    phone: "",
  });
  const { t } = useTranslation();
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
  const [waitingPeriod, setWaitingPeriod] = useState<string>("৭ দিনের");
  const init = () => {
    if (packageVar?.duration === "monthly") {
      setWaitingPeriod("৭ দিনের");
    } else if (packageVar?.duration === "yearly") {
      setWaitingPeriod("৩০ দিনের");
    } else if (packageVar?.duration === "half-yearly") {
      setWaitingPeriod("৩০ দিনের");
    }
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
      // console.log("Gift");
      router.push(
        `/healthPackage/checkout?packageId=${data?._id}&packageTitle=${data?.type}&variationId=${packageVar?._id}&phone=${phoneData.phone}&countryCode=${phoneData.countryCode}&dialCode=${phoneData.dialCode}&gift=${gift}&fullname=${username}`
      );
    } else {
      // console.log("normal");
      router.push(
        `/healthPackage/checkout?packageId=${data?._id}&packageTitle=${data?.type}&variationId=${packageVar?._id}`
      );
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-3 lg:grid-cols-2">
        <div className="flex flex-col lg:px-6 px-2 border-black lg:border-r-4">
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
          <span className=" my-2  bg-black h-[1px] w-[95%]" />
          <p className="text-lg font-semibold">বিশেষ শর্তাবলী</p>
          <p className="text-base font-medium">১. হাসপাতালে ভর্তির সুবিধা:</p>
          <ul className="list-disc list-inside ps-6">
            <li className="text-sm">
              হাসপাতালে ভর্তি সুবিধা পেতে হলে অন্তত ২৪ ঘণ্টা অবস্থান করা আবশ্যক।
            </li>
          </ul>

          <p className="pt-2 text-base font-medium">
            ২. পূর্ণ বছরের প্রিমিয়াম পেমেন্ট:
          </p>
          <ul className="pb-2 list-disc list-inside ps-6">
            <li className="text-sm">
              মাসিক পেমেন্ট মোডে সম্পূর্ণ কভারেজ পেতে হলে পুরো বছরের প্রিমিয়াম
              একসাথে পরিশোধ করতে হবে।
            </li>
          </ul>

          <p className="text-base font-medium">৩. ফ্যামিলি ফ্লোটার কভারেজ:</p>
          <ul className="list-disc list-inside ps-6">
            <li className="text-sm">
              ফ্যামিলি ফ্লোটার প্যাকেজে নাম অন্তর্ভুক্ত সকল সদস্য সম্মিলিতভাবে
              সর্বোচ্চ ১০০% কভারেজের জন্য যোগ্য হবেন।
            </li>
          </ul>
          <p className="text-base font-medium">
            ৪. ফ্যামিলি ফ্লোটারে লাইফ কভারেজ:
          </p>
          <ul className="list-disc list-inside ps-6">
            <li className="text-sm">
              ফ্যামিলি ফ্লোটার প্যাকেজে শুধুমাত্র প্রাইমারি সদস্য লাইফ কভারেজের
              জন্য যোগ্য হবেন।
            </li>
          </ul>
          <span className=" my-2  bg-black h-[1px] w-[95%]" />
          <p className="text-lg font-semibold">ওয়েটিং পিরিয়ড</p>
          <ul className="list-disc ps-4">
            <li className="">
              <p className="text-sm leading-5 ">
                সমস্ত পরিকল্পনার জন্য{" "}
                <span className="font-semibold ">
                  {waitingPeriod} ওয়েটিং পিরিয়ড{" "}
                </span>{" "}
                প্রযোজ্য হবে, যা কভারেজ শুরুর তারিখ থেকে গণনা করা হবে। এই
                সুবিধাগুলো অন্তর্ভুক্ত:
              </p>
              <ol className="text-sm list-none list-inside ps-3">
                <li> ১. আউটপেশেন্ট ডিপার্টমেন্ট (ওপিডি) সেবা</li>
                <li> ২. হাসপাতাল ক্যাশব্যাক সুবিধা</li>
              </ol>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold ">সাধারণ শর্তাবলী</p>
          <ul className="list-none list-inside ps-4">
            <li>
              <span className="text-base font-medium">১. যোগ্যতা : </span>
              <ol className="pl-5 text-sm list-disc ">
                <li>
                  হেলথ প্যাকেজ শুধুমাত্র তাদের জন্য উন্মুক্ত যারা নির্দিষ্ট
                  যোগ্যতার মানদণ্ড পূরণ করেন।
                </li>
              </ol>
            </li>
            <li>
              <span className="text-base font-medium">
                ২. হস্তান্তরযোগ্য নয়:
              </span>
              <ol className="pl-5 text-sm list-disc ">
                <li>
                  হেলথ প্যাকেজের সুবিধা হস্তান্তরযোগ্য নয় এবং শুধুমাত্র
                  তালিকাভুক্ত সদস্য বা পরিবারের জন্য প্রযোজ্য।
                </li>
              </ol>
            </li>
            <li>
              <span className="text-base font-medium">৩. পলিসি নবায়ন:</span>
              <ol className="pl-5 text-sm list-disc ">
                <li>
                  পলিসি নবায়ন বর্তমান শর্তাবলীর উপর নির্ভরশীল এবং কভারেজ বন্ধ
                  হওয়ার আগেই সম্পন্ন করতে হবে।
                </li>
              </ol>
            </li>
            <li>
              <span className="text-base font-medium">৪. অব্যাহতি: </span>
              <ol className="pl-5 text-sm list-disc ">
                <li>
                  প্রি-এক্সিস্টিং কন্ডিশন এবং প্যাকেজের নির্দিষ্ট শর্ত অনুযায়ী
                  কোনো কিছু কভারেজের অন্তর্ভুক্ত নয়।
                </li>
              </ol>
            </li>
            <li>
              <span className="text-base font-medium">
                ৫. ক্লেইম প্রক্রিয়া:
              </span>
              <ol className="pl-5 text-sm list-disc ">
                <li>
                  প্যাকেজের সুবিধার জন্য ক্লেইম নির্ধারিত সময়ের মধ্যে যথাযথ
                  ডকুমেন্টেশনের সাথে জমা দিতে হবে।
                </li>
              </ol>
            </li>

            <p className="flex items-start space-x-1.5 text-sm mt-1">
              <span className="bg-[#16020B] p-0.5">
                <FaCheck className="text-white" size={11} />
              </span>
              <span>
                <Trans
                  i18nKey="package"
                  values={{ count: packageVar?.hospitalCashback ?? 0 }}
                  components={{
                    bold: (
                      <strong className="font-normal text-sm text-gray-900" />
                    ),
                  }}
                />
              </span>
            </p>

          </ul>
          <span className=" my-2  bg-black h-[1px] w-[95%]" />
          <p className="text-lg font-semibold ">যোগাযোগের তথ্য </p>
          <p className="text-sm">
            স্বাস্থ্য প্যাকেজের শর্তাবলী সম্পর্কিত যেকোনো প্রশ্ন বা স্পষ্টকরণের
            জন্য, অনুগ্রহ করে যোগাযোগ করুন:
          </p>
          <ul className="list-disc ps-5">
            <li>
              {" "}
              <span className="font-medium"> ইমেইল :</span>{" "}
              info@theclinicall.com
            </li>
            <li>
              {" "}
              <span className="font-medium"> ফোন : </span> ০১৭১১৬৩৩৫১৯
            </li>
            <li>
              {" "}
              <span className="font-medium"> ঠিকানা : </span> বাড়ি: ০৩, রোড: ২,
              বারিধারা জে ব্লক, ঢাকা
            </li>
          </ul>
        </div>
      </div>
      {/* <p className=" my-2  bg-black h-[1px] w-[95%] mx-auto"></p> */}
      <hr className="mt-1 border border-gray-400 w-[95%] mx-auto" />
      <div className="px-6">
        <p className="pt-2 text-base">
          <span className="font-medium">ডিসক্লেইমার :</span>
          ক্লিনিকল লিমিটেড একটি হেলথ-টেক প্রতিষ্ঠান। আমরা মূলত টেলিমেডিসিন সেবা
          প্রদান করি। আমাদের প্রদত্ত প্যাকেজের সাথে বীমা সুবিধা গ্রাহকদের
          বিনামূল্যে দেওয়া হয়। এই বীমার জন্য ক্লিনিকল লিমিটেড কোনো ধরনের চার্জ
          গ্রহণ করে না। আমরা শুধুমাত্র টেলিমেডিসিন কলের জন্য ফি গ্রহণ করি।
        </p>
        <p className="pt-2 text-base">
          <span className="font-medium">মন্তব্য:</span>
          ক্লিনিকল লিমিটেড পূর্ব বিজ্ঞপ্তি ছাড়াই এই শর্তাবলী পরিবর্তন বা সংশোধন
          করার অধিকার সংরক্ষণ করে। আমাদের সেবা ব্যবহার অব্যাহত রেখে, আপনি
          সংশোধিত শর্তাবলী মেনে নিচ্ছেন বলে ধরে নেওয়া হবে।
        </p>
        <p className="my-0.5">
          ক্লিনিকল লিমিটেড বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ।
        </p>
        {gift == "true" && (
          <div className=" rounded-md  grid lg:grid-cols-2 my-2">
            <div className="py-2.5  p-3  bg-white shadow-[0px_0px_15px_2px_rgba(0,_0,_0,_0.1)] duration-150">
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
                    <label htmlFor="gift">গিফট পাঠান </label>
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
                    disabled={!isChecked}
                    onChange={handlePhoneChange}
                    inputStyle={{ width: "100%" }}
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
      </div>

      <div className="w-full px-6 ">
        <details>
          <summary className="text-sm font-medium cursor-pointer">
            মাসিক পেমেন্টের ক্ষেত্রে কভারেজ বীমা |
          </summary>
          <div className="mt-2">
            <p className="text-xs">
              প্রতি পলিসি বছরে ইন-পেশেন্ট হাসপাতালাইজেশনের জন্য বার্ষিক সীমা
              পরিকল্পনার অধীনে থাকা সকল ব্যক্তির মধ্যে ভাগ করা হয়। একক পলিসিতে
              অন্তর্ভুক্ত কোনো ব্যক্তির দাবির জন্য কোনো ব্যক্তিগত সীমা প্রযোজ্য
              নয়।{" "}
            </p>
            <p className="text-xs my-0.5">
              বার্ষিক কভারেজ সীমার প্রাপ্যতা নিম্নলিখিত নিয়মের অধীন, তবে B2B
              কভারেজ পরিকল্পনার ক্ষেত্রে এটি প্রযোজ্য নয়।
            </p>
            <ul className="text-xs list-disc list-inside ps-4">
              <li>
                যারা একবারে ১২ মাস/১ বছরের জন্য পলিসি পেমেন্ট সম্পূর্ণ করবেন,
                তারা ইন-পেশেন্ট হাসপাতালাইজেশন কভারেজের বার্ষিক সীমার ১০০%
                অবিলম্বে অ্যাক্সেস পাবেন, তবে প্রযোজ্য অপেক্ষার সময়সীমার শর্ত
                প্রযোজ্য।
              </li>
              <li>
                যারা মাসিক ভিত্তিতে পলিসি পেমেন্ট করবেন, তাদের জন্য ইন-পেশেন্ট
                হাসপাতালাইজেশন সুবিধার বার্ষিক সীমা নিম্নলিখিতভাবে বিতরণ করা
                হবে:
              </li>
            </ul>

            <div className="mb-2 text-xs list-disc list-inside ps-4">
              <li>
                কভারেজ সর্বশেষ পেমেন্ট চক্র পর্যন্ত করা পেমেন্টের সংখ্যার
                ভিত্তিতে বরাদ্দ করা হবে।
              </li>
              <li>
                যেকোনো সময়ে কভারেজ হিসাব করা হয়: “করা পেমেন্টের সংখ্যা” ভাগ
                করা “বছরের জন্য প্রত্যাশিত পেমেন্টের সংখ্যা” দিয়ে এবং তা বার্ষিক
                সীমার সঙ্গে গুণ করা।{" "}
              </li>
              <div className="flex items-center justify-center pt-3 space-x-4">
                <p className="flex flex-col text-center">
                  <span className="italic border-b border-black">
                    করা পেমেন্টের সংখ্যা
                  </span>
                  <span className="italic">
                    বছরের জন্য প্রত্যাশিত পেমেন্টের সংখ্যা
                  </span>
                </p>
                <span>X</span>
                <p className="italic"> বার্ষিক সীমা</p>
                <span>=</span>
                <p className="italic"> মাসের জন্য কভারেজ</p>
              </div>
              <li>
                উদাহরণস্বরূপ, একজন গ্রাহক যদি M4-এ দাবি করেন এবং M1, M2, M3 এবং
                M4-এ পেমেন্ট করে থাকেন, তবে M4-এ তার কভারেজ সীমা হবে 4/12*
                বার্ষিক বীমা বিস্তারিত ।
              </li>
            </div>

            <PackageBangla />
          </div>
        </details>
      </div>

      {/* <div> */}
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
      {/* </div> */}
    </>
  );
};

export default TableTACBangla;
