"use client";
import { EndPoint, Methods } from "@/api/config";
import { getUserID, isAuthenticate } from "@/lib/authHandler";
import { apiCall } from "@/lib/axios-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

const HeroSection1 = () => {
  const { t } = useTranslation();
  const [btnloading, setBtnloading] = useState(false);
  const router = useRouter();
  const handleBuyPage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setBtnloading(true);
      e.preventDefault();
      const userId = await getUserID();
      const userAuthentication = await isAuthenticate();
      // if (userId && userAuthentication) {
      //   // const { data } = await apiCall(
      //   //   Methods.GET,
      //   //   EndPoint.PACKAGE_FIND_ALL +
      //   //   `?showHome=true`
      //   // );
      //   // let packageId, variationId;
      //   // data.map((item: any) => {
      //   //   if (item.isInstant === true) {
      //   //     packageId = item._id
      //   //     variationId = item.packageVariation[0]._id
      //   //   }
      //   // })
      //   // if (data.length != 0) {

      //   // } else {
      //   //   toast.error("Package Not Found", { hideProgressBar: true });
      //   // }
       
      // } else {

      // }
       router.push(
          `/healthPackage/checkout?packageId=67c81f85e6dc2087f4f5dc46&packageTitle=telemedicine&variationId=67c81f85e6dc2087f4f5dc47`
        );
    } catch (error) {
      console.log(error);
    } finally {
      setBtnloading(false);
    }
  };
  return (
    <div
      className={` text-white  rounded-md  min-h-[70vh] max-h-[75vh] md:min-h-[68vh] md:max-h-[69vh] 2xl:mx-auto 2xl:w-[94%]`}
    >
      <div className="relative">
        <div className="hidden md:block">
          <Image
            // src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-23122024T172655-1440x620-web-banner-1.svg"
            src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-14082025T174837-banner-1860x620-min.png"
            alt="HeroSection1 Web Banner"
            width={1500}
            height={600}
            quality={100}
            loading="eager"
            priority={true}
            fetchPriority="high"
            decoding="async"
            className="min-h-[65vh] w-full h-full -z-10 absolute top-0 object-cover rounded-md hidden md:block"
          // sizes="(max-width:700px) 65vh , 1024px"
          />
        </div>
        <div className="block md:hidden">
          <Image
            src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-06012025T171435-mask-group.svg"
            alt="HeroSection1 Responsive Web Banner"
            width={1000}
            height={270}
            loading="eager"
            priority={true}
            fetchPriority="high"
            decoding="async"
            className="min-h-[70vh] w-full h-full -z-10 absolute top-0 object-cover rounded-lg md:hidden block"
          />
        </div>
        <div className="min-h-[70vh] flex flex-col justify-around sm:justify-evenly xl:justify-around h-full p-5 2xl:p-16">
          <Image
            src="services/HeroImage2.svg"
            alt="Responsive Web Banner"
            width={400}
            height={270}
            objectFit="cover"
            objectPosition="center"
            layout="response"
            priority
            rel="preload"
            className="2xl:w-[320px] w-[200px] sm:w-[150px] md:w-[180px] lg:w-[240px] "
          />
          <div>
            <p className="font-medium text-xl sm:text-xl lg:text-2xl 2xl:text-[32px] italic ">
              <Trans
                i18nKey="herosectiontext"
                components={{
                  br: <br className="mb-3" />,
                  span: <span className="inline-block" />,
                  strong: (
                    <span className="text-2xl font-medium sm:text-xl md:text-2xl lg:text-3xl 2xl:text-[45px]" />
                  ),
                }}
              />
            </p>
            <button
              onClick={handleBuyPage}
              className=" bg-[#EB148C] text-white mt-2 font-normal rounded flex items-center"
            >
              <span className=" text-lg sm:text-base md:text-lg   px-2.5 py-0.5">
                {" "}
                {t("Buy Now")}
              </span>{" "}
              <span className="animate-pulse">
                <MdKeyboardDoubleArrowRight size={20} />
              </span>
            </button>
          </div>
          <div className="flex items-center mt-2 space-x-4 lg:mt-7 sm:space-x-7 ">
            <Link
              href={
                process.env.NEXT_APPLE_PLAY_STORE ??
                "https://apps.apple.com/us/app/clinicall-online-doctor-app/id6743645786"
              }
              className=" flex items-center justify-center w-[147px] h-[40px] 2xl:h-[50px] space-x-2   bg-white rounded-[4px] font-semibold text-black"
            >
              <Image
                src={"services/apple.svg"}
                alt="Apple Logo"
                width={17}
                height={21}
                className="-mt-1"
              />
              <span className="">{t("App store")}</span>
            </Link>
            <Link
              href={
                process.env.NEXT_GOOGLE_APP_PLAY_STORE ??
                "https://play.google.com/store/apps/details?id=com.clinicall.clinicallapp"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-[147px] h-[40px] 2xl:h-[50px] space-x-2   bg-white rounded-[4px] font-semibold text-black"
            >
              <Image
                src={"services/googleplay.svg"}
                alt="PlayStore Logo"
                width={17}
                height={21}
                className=""
              />
              <span className="">{t("Play Store")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection1;
