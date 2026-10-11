"use client";
import { getUserID } from "@/lib/authHandler";
import React, { useEffect, useState } from "react";
import { getPackageImage, Package } from "./Interface";
import { useAppSelector } from "@/redux/Hooks";
import Image from "next/image";
import { HealthCardTerms } from "@/lib/packagetype";
import { formatDate, mapIdToLanguage } from "@/lib/packagetype";
import "./Stepper.css";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import PageLoading from "../Seo/PageLoading";
import { useTranslation } from "react-i18next";
import { IoCall, IoEarth } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
const healthPackageimage =
  "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-30122024T151802-healthcarddoctorimage.png";

const HealthCard = () => {
  const [packageInfo, setPackageInfo] = useState<Package>();
  const [loading, setLoading] = useState(true);
  const language = useAppSelector((state) => state.languageSlice.language);
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const init = async () => {
    try {
      setLoading(true);
      let userId;
      // console.log(pathname);


      userId = await getUserID();

      // console.log(userId);

      await apiCall(Methods.GET, `${EndPoint.GET_BOOK_PACKAGE}/${userId}`)
        .then((response) => {
          // if (response.success) {
          setPackageInfo(response.data);
          console.log(response.data);

          // }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return loading ? (
    <PageLoading />
  ) : packageInfo ? (
    <section className="min-h-[80vh]  xl:container xl:mx-auto pt-4 px-2 lg:pt-3 lg::pt-4 xl:pt-6 2xl:pt-8 lg:px-2 2xl:px-8 shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)]">
      <p className="text-[#16020B] text-xl lg:text-2xl xl:text-3xl 2xl:text-[32px] font-semibold">
        {t("Health Card")}
      </p>
      <div className="mainpackageDiv">
        <aside className={`heathcardimage1 relative `}>
          <div className="grid grid-cols-10 lg:h-[80%] ">
            <div className="col-span-6 p-6 text-[13px] font-medium">
              <div className="w-[175px]">
                <p className="px-2 py-1 font-semibold border text-center text-2xl border-[#EB148C] text-[#EB148C]">
                  {t("Health Card")}
                </p>
                <p className="text-[#EB148C]  text-[10px] text-center">
                  {t("onApp")}
                </p>
              </div>
              <p className="mt-2">
                {t("userpackage.username")}: {packageInfo.userId.firstName}{" "}
                {packageInfo.userId.lastName}
              </p>
              <p className="my-1">
                {" "}
                {t("userpackage.customerId")} :{" "}
                {mapIdToLanguage(packageInfo.healthCardId.toString(), language)}
              </p>
              <p className="mb-1 capitalize">
                {t("userpackage.packageName")} :{" "}
                {t(packageInfo.packageId.type.trim().toLowerCase())}
                <span className="capitalize">
                  /
                  {t(
                    packageInfo?.packageId?.packageVariation?.[0]?.duration ??
                    ""
                  )}
                </span>
              </p>
              <p>
                {t("userpackage.PackageDuration")} :{" "}
                {formatDate(packageInfo.packageExpiredDate, language)}
              </p>
            </div>
            <div className="col-span-4 flex flex-col ">
              <div className="flex justify-end p-4 ">
                <Image
                  src={"/services/Group.svg"}
                  alt="Logo"
                  width={92}
                  height={18}
                />
              </div>
              <Image
                src={healthPackageimage}
                alt="Logo"
                width={131}
                height={145}
              />
            </div>
          </div>
          <p className="h-2.5 w-[97%] mx-auto bg-[#EB148C] " />
          <div className="grid grid-cols-3 text-[10px] py-1 rounded-b-xl space-x-1 ">
            <div className="flex items-center justify-center  h-full space-x-1 text-center ">
              <span className="bg-[#EB148C] p-[3px] text-white rounded-full">
                <IoCall size={6} />
              </span>
              <p className=" font-medium text-[#16020B] text-[7px] md:text-[10px]">
                {t("mobile")}
              </p>
            </div>
            <div className="flex items-center justify-center h-full space-x-1 text-center ">
              <span className="bg-[#EB148C] p-[3px] text-white rounded-full -rotate-90">
                <IoIosSend size={6} />
              </span>
              <p className=" font-medium text-[#16020B] text-[7px] md:text-[10px]">
                customer.service@theclinicall.com
              </p>
            </div>
            <div className="flex items-center justify-center h-full space-x-1 text-center ">
              <span className="bg-[#EB148C] p-[3px] text-white rounded-full -rotate-90">
                <IoEarth size={6} />
              </span>
              <p className=" font-medium text-[#16020B] text-[7px] md:text-[10px]">
                www.theclinicall.com
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 px-5 pb-2.5 sm:pb-0">
            <p className="text-[7px] text-start text-gray-500">
              * {t("conditionapply")}
            </p>
            {packageInfo.poweredBy && <div className="flex items-center justify-end space-x-1">
              <p className="text-[7px] text-end text-[#16020B] font-medium">
                Powered By :{" "}
              </p>

              <Image
                src={packageInfo.poweredBy || ""}
                alt="Pragati Life Insurance PLC"
                width={40}
                height={8}
                className="w-10 h-2"
              />
            </div>
            }

          </div>
          <Image
            src={getPackageImage(packageInfo.packageId.type)}
            alt="THis is iamge"
            width={400}
            height={500}
            className="h-full w-full absolute top-0 -z-10 rounded-md"
          />
        </aside>

        <aside className={` healthcardimage2 relative `}>
          <div className="p-4">
            <div className="flex justify-between">
              <p className="px-2 py-1 font-semibold  text-center text-2xl  text-[#EB148C]">
                {t("Health Card")}
              </p>
              <Image
                src={"/services/Group.svg"}
                alt="Logo"
                width={92}
                height={18}
                className="-mt-5"
              />
            </div>
            <div className="ps-1 lg:ps-2">
              <p className="text-lg font-medium">
                {language == "bn"
                  ? HealthCardTerms.bn.termsTitle
                  : HealthCardTerms.en.termsTitle}
              </p>
            </div>
            <ul className="list-disc list-inside text-xs space-y-1 mt-2 ps-2 lg:ps-4 font-normal w-full lg:w-[90%]">
              <li>
                {language === "bn"
                  ? HealthCardTerms.bn.validity
                  : HealthCardTerms.en.validity}
              </li>
              <li>
                {language === "bn"
                  ? HealthCardTerms.bn.doctorCallUse
                  : HealthCardTerms.en.doctorCallUse}
              </li>
              <li>
                {language === "bn"
                  ? HealthCardTerms.bn.noRefund
                  : HealthCardTerms.en.noRefund}
              </li>
              <li>
                {language === "bn"
                  ? HealthCardTerms.bn.confidentiality
                  : HealthCardTerms.en.confidentiality}
              </li>
              <li>
                {language === "bn"
                  ? HealthCardTerms.bn.rightsReserved
                  : HealthCardTerms.en.rightsReserved}
              </li>
            </ul>
            {packageInfo.poweredBy && <div className="flex items-center justify-end space-x-1">
              <p className="text-[7px] text-end text-[#16020B] font-medium">
                Powered By :{" "}
              </p>

              <Image
                src={packageInfo.poweredBy || ""}
                alt="Pragati Life Insurance PLC"
                width={40}
                height={8}
                className="w-10 h-2"
              />
            </div>
            }{" "}
          </div>
          <Image
            src={getPackageImage(packageInfo.packageId.type)}
            alt="THis is iamge"
            width={400}
            height={500}
            className="h-full w-full absolute top-0 -z-10 rounded-md"
          />
        </aside>
      </div>
    </section>
  ) : (
    <div className="min-h-[80vh]  xl:container xl:mx-auto px-2 lg:pt-4 xl:pt-6 2xl:pt-8 lg:px-2 2xl:px-8 shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)]">
      <p>{t("didnotbuyanypackage")}</p>
    </div>
  );
};

export default HealthCard;
