"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const Diagnosis = () => {
  const { t } = useTranslation();
  return (
    <div className="2xl:mt-[70px] mt-8  lg:mt-12 lg:pt-0 xl:container relative xl:mx-auto">
      <div className=" bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T104059-bg1.png')] lg:mx-4 2xl:mx-0 rounded-lg">
        <div className="grid lg:grid-cols-2 place-content-center place-items-center">
          <div className="w-full px-3 lg:px-4 2xl:px-16 py-9 lg:order-1 order-2">
            <h2 className="text-xl animationblock1 md:text-2xl lg:text-2xl 2xl:text-3xl  font-semibold text-[#16020B] 2xl:mb-4">
              {t("DIAGNOSIS AT YOUR DOORSTEP")}
            </h2>
            <div className="grid mt-3 lg:grid-cols-2">
              <div className="flex p-1 space-x-2 text-justify ">
                {" "}
                <Image
                  width={50}
                  height={50}
                  src="other/Vector.svg"
                  alt=""
                  className="w-6 h-2 mt-1.5"
                />
                <p className="text-sm font-medium">
                  <span className=" font-[550]">
                    {t("features.online_lab_test.title")}
                  </span>{" "}
                  {t("features.online_lab_test.description")}
                </p>
              </div>
              <div className="flex p-1 space-x-2 text-justify ">
                <Image
                  width={50}
                  height={50}
                  src="other/Vector.svg"
                  alt=""
                  className="w-4 h-2 mt-1.5"
                />
                <p className="text-sm font-medium">
                  <span className="text-sm font-[550]">
                    {t("features.home_report_delivery.title")}
                  </span>{" "}
                  {t("features.home_report_delivery.description")}
                </p>
              </div>
              <div className="flex p-1 space-x-2 text-justify ">
                <Image
                  width={50}
                  height={50}
                  src="other/Vector.svg"
                  alt=""
                  className="w-4 h-2 mt-1.5"
                />
                <p className="text-sm font-medium">
                  <span className="text-sm font-[550]">
                    {t("features.home_sample_collection.title")}
                  </span>{" "}
                  {t("features.home_sample_collection.description")}
                </p>
              </div>

              <div className="flex p-1 space-x-2 text-justify ">
                {" "}
                <Image
                  width={50}
                  height={50}
                  src="other/Vector.svg"
                  alt=""
                  className="w-4 h-2 mt-1.5"
                />
                <p className="text-sm font-medium">
                  <span className="text-sm font-[550]">
                    {t("features.lab_test_discount.title")}
                  </span>{" "}
                  {t("features.lab_test_discount.description")}
                </p>
              </div>
            </div>

            <div className="mt-[35px]">
              <Link
                href="/lab"
                className="hover:bg-[#E2136E] text-sm animationblock1 border font-semibold border-black hover:border-[#E2136E] hover:text-white py-[13px] px-[35px]  rounded-md"
              >
                {t("Book Test")}
              </Link>
            </div>
          </div>
          <div
            className={`w-full lg:order-2 order-1  object-contain bg-no-repeat p-4 h-[400px]  lg:h-[400px] 2xl:h-[480px] `}
          >
            <iframe
              src="https://www.youtube.com/embed/I6z-XaCYuDc"
              width="560"
              height="315"
              title="YouTube video player"
              className="object-fill w-full h-full  mx-auto"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
// {/* <video
//               autoPlay
//               loop
//               muted
//               playsInline
//               className="border-8 rounded-3xl border-white h-[350px] lg:h-[400px] 2xl:h-[480px] w-full lg:w-[80%] mx-auto object-fill  animationblock1"
//               controls
//             >
//               <source
//                 src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-31082025T152801-whatsapp-video-2025-08-26-at-3.38.34-pm.mp4"
//                 type="video/mp4"
//               />
//               Your browser does not support the video tag.
//             </video> */}
