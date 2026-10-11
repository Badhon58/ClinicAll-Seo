"use client";
import React, { useEffect, useState } from "react";
import PackageTable from "./PackageTable";
import { Package, PackageVariation } from "./Interface";
import { FaCheck, FaRegCircleUser } from "react-icons/fa6";
import { Trans, useTranslation } from "react-i18next";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
const TableTAC = ({
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
  const [waitingPeriod, setWaitingPeriod] = useState<string>("7-day");
  const [username, setUsername] = useState<string>("");
  const init = () => {
    if (packageVar?.duration === "monthly") {
      setWaitingPeriod("7-day");
    } else if (packageVar?.duration === "yearly") {
      setWaitingPeriod("30-day");
    } else if (packageVar?.duration === "half-yearly") {
      setWaitingPeriod("30-day");
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
          <p className="text-base font-medium tracking-tight text-justify9">
            Terms and Conditions for CliniCall Limited’s Health Package
          </p>
          {/* <p className="py-0.5 text-base">
            <span className="font-medium "> Effective Date : </span>{" "}
            <span> 01-02-2025</span>
          </p> */}
          <p className="text-sm text-justify">
            Welcome to CliniCall Limited’s Health Package. By purchasing or
            using our health package, you agree to abide by the following terms
            and conditions. Please read them carefully.
          </p>
          <span className=" my-2  bg-black h-[1px] w-[95%]" />
          <p className="text-lg font-semibold">SPECIAL CONDITIONS</p>
          <p className="text-base font-medium">
            a{")"} Hospitalization Benefit:
          </p>
          <ul className="list-disc list-inside ps-6">
            <li className="text-sm">
              A minimum of 24 hours of hospital stay is required to avail of the
              hospitalization benefit.
            </li>
          </ul>

          <p className="pt-2 text-base font-medium">
            b{")"} Full-Year Premium Payment:
          </p>
          <ul className="pb-2 list-disc list-inside ps-6">
            <li className="text-sm">
              For customers opting for the monthly payment mode, full-year
              premium payment is mandatory to avail full coverage benefits.
            </li>
          </ul>

          <p className="text-base font-medium">
            c{")"} Family Floater Coverage:
          </p>
          <ul className="list-disc list-inside ps-6">
            <li className="text-sm">
              For Family Floater packages, all enrolled family members are
              collectively eligible for a maximum of 100% of the total coverage
              amount.
            </li>
          </ul>
          <p className="text-base font-medium">
            d{")"} Life Coverage in Family Floater Plans:
          </p>
          <ul className="list-disc list-inside ps-6">
            <li className="text-sm">
              In Family Floater packages, only the primary member is eligible
              for life coverage
            </li>
          </ul>
          <span className=" my-2  bg-black h-[1px] w-[95%]" />
          <p className="text-lg font-semibold">Waiting Period</p>
          <ul className="list-disc ps-4">
            <li className="">
              <p className="text-sm leading-5 ">
                A{" "}
                <span className="font-semibold ">
                  {waitingPeriod} waiting period
                </span>{" "}
                applies from the date of commencement of coverage for the
                following benefits across all plans:
              </p>
              <ol className="text-sm list-decimal list-inside ps-3">
                <li>Outpatient Department (OPD) services</li>
                <li>Hospital cashback benefit</li>
              </ol>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold ">General Conditions</p>
          <ul className="list-decimal list-inside ps-4">
            <li>
              <span className="text-base font-medium">Eligibility :</span>
              <ol className="pl-5 text-sm list-disc ">
                <li>
                  The health package is open to individuals who meet the
                  eligibility criteria as specified during the enrollment
                  process.
                </li>
              </ol>
            </li>
            <li>
              <span className="text-base font-medium">
                Non-Transferability :
              </span>
              <ol className="pl-5 text-sm list-disc ">
                <li>
                  Health package benefits are non-transferable and can only be
                  utilized by the enrolled individual(s) or family members
                  listed under the package.
                </li>
              </ol>
            </li>
            <li>
              <span className="text-base font-medium">Policy Renewal :</span>
              <ol className="pl-5 text-sm list-disc ">
                <li>
                  Renewal of the health package is subject to the terms and
                  conditions prevailing at the time of renewal and must be
                  completed before the expiry date to avoid coverage lapse.
                </li>
              </ol>
            </li>
            <li>
              <span className="text-base font-medium">Exclusions:</span>
              <ol className="pl-5 text-sm list-disc ">
                <li>
                  Any pre-existing conditions, as well as exclusions specified
                  in the detailed plan document, will not be covered unless
                  explicitly stated otherwise.
                </li>
              </ol>
            </li>
            <li>
              <span className="text-base font-medium">Claims Process:</span>
              <ol className="pl-5 text-sm list-disc ">
                <li>
                  Claims for benefits under this package must be submitted with
                  proper documentation within the prescribed timeline to be
                  eligible for reimbursement or benefits.
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
          <p className="text-lg font-semibold ">Contact Information</p>
          <p className="text-sm">
            For any inquiries or clarifications related to the terms and
            conditions of the health package, please contact:
          </p>
          <ul className="list-disc ps-5">
            <li>
              {" "}
              <span className="font-medium"> Email :</span>{" "}
              info@theclinicall.com
            </li>
            <li>
              {" "}
              <span className="font-medium"> Phone :</span> 01711633519
            </li>
            <li>
              {" "}
              <span className="font-medium"> Address:</span> House: 03, Road: 2,
              Baridhara J Block, Dhaka
            </li>
          </ul>
        </div>
      </div>
      {/* <p className=" my-2  bg-black h-[1px] w-[95%] mx-auto"></p> */}
      <hr className="mt-1 border border-gray-400 w-[95%] mx-auto" />
      <div className="px-6">
        <p className="pt-2 text-base">
          <span className="font-[550]">Disclaimer :</span>
          CliniCall Limited is a health-tech company primarily providing
          telemedicine services. Insurance benefits included with our packages
          are provided to customers free of charge. CliniCall Limited does not
          charge for insurance. We only charge for telemedicine calls.
        </p>
        <p className="pt-2 text-base">
          <span className="font-medium">Note : </span>
          CliniCall Limited reserves the right to amend or modify these terms
          and conditions at any time without prior notice. By continuing to use
          our services, you agree to the updated terms and conditions.
        </p>

        <p className="my-0.5">
          Thank you for choosing CliniCall Limited. We look forward to serving
          you with the best health care solutions.
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
      </div>
      <div className="px-6 ">
        <div className="w-full ">
          <details>
            <summary className="text-sm font-medium cursor-pointer">
              COVERAGE LIMITS IN CASE MONTHLY PAYMENT
            </summary>
            <div className="mt-2">
              <p className="text-xs">
                The annual limit for In-patient Hospitalization per policy year
                is shared amongst all the people covered under the plan. There
                is no individual limit applied to the amount for which any one
                individual covered under a shared policy may claim.{" "}
              </p>
              <p className="text-xs my-0.5">
                The annual coverage limit availability is subject to the
                following rules, except for the B2B Coverage Plan
              </p>
              <ul className="text-xs list-disc list-inside ps-4">
                <li>
                  Subscribers paying for the policy for 12 months/1 year upfront
                  shall have access to 100% of the annual limit for the
                  in-patient hospitalization coverage immediately, subject to
                  the applicable waiting periods.
                </li>
                <li>
                  For subscribers paying for the policy on monthly basis, the
                  annual limit for the in-patient hospitalization benefit will
                  be distributed as follow:
                </li>
              </ul>
              <div className="mb-2 text-xs list-disc list-inside ps-4">
                <li>
                  Coverage will be allocated based on the number of payments
                  made till the last payment cycle.
                </li>
                <li>
                  At any given time, coverage is calculated as: “number of
                  payments made” divided by “number of expected payments for the
                  year” multiplied by annual limit.{" "}
                </li>
                <div className="flex items-center justify-center p-3 space-x-4">
                  <p className="flex flex-col text-center">
                    <span className="italic border-b border-black">
                      Number of Payments made
                    </span>
                    <span className="italic">
                      Number of expected payments for the year
                    </span>
                  </p>
                  <span>X</span>
                  <p className="italic"> Annual limit</p>
                  <span>=</span>
                  <p className="italic"> Coverage for the month</p>
                </div>
                <li>
                  For example, a subscriber claiming in M4, and having paid in,
                  M1, M2, M3 & M4 would have a coverage limit of 4/12*Annual
                  limit in M4.
                </li>
              </div>
              <PackageTable />
            </div>
          </details>
        </div>
      </div>
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
    </>
  );
};

export default TableTAC;
