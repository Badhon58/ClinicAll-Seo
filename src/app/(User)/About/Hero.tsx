"use client";
import Headertag from "@/components/common/Headertag";
import { useAppSelector } from "@/redux/Hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const language = useAppSelector((state) => state.languageSlice.language);
  const [isHydrated, setIsHydrated] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <section className="2xl:my-[52px] my-[22px] xl:container xl:mx-auto  xl:w-11/12 2xl:w-full ">
      <Headertag position="text-center">
        {isHydrated && t("Who We Are")}
      </Headertag>
      <div className=" flex justify-center mt-2 text-center ">
        <p className="px-4 lg:px-0 lg:w-[640px]  text-center text-sm text-[#16020B]  ">
          {isHydrated && t("whowearetext")}
        </p>
      </div>
      {/* What We Do? */}
      <div className="mt-3">
        <p className="lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-[#16020B]">
          {isHydrated && t("What We Do")}
        </p>
        <div className="2xl:mt-[14px] mt-2 flex flex-col-reverse lg:flex-row justify-around items-center gap-7 2xl:gap-[93px]">
          <div className="xl:w-3/6 w-full flex flex-col space-y-4 text-[14px] tracking-[0.28px] text-[#16020B]  text-justify">
            {/* Need to Check  */}
            <article>
              {isHydrated ? (
                language === "bn" ? (
                  <article>
                    ক্লিনিকল লিমিটেডের লক্ষ্য হচ্ছে স্মার্ট বাংলাদেশের স্বপ্নকে
                    বাস্তবে রূপান্তরিত করা, যেখানে প্রতিটি নাগরিক সাশ্রয়ী
                    মূল্যে উন্নত স্বাস্থ্যসেবা উপভোগ করতে পারবেন।
                  </article>
                ) : (
                  <article>
                    {" "}
                    The mission of CliniCall Limited is to offer a full-service
                    digital health platform that unites medical professionals
                    and patients and merges several health care services. By
                    providing easy access to health care-related services, the
                    company seeks to empower everyone, increase patient-provider
                    communication, and elevate the overall health care
                    experience.
                    <p>
                      CliniCall provides the following services in particular :
                    </p>
                  </article>
                )
              ) : null}
            </article>

            <div>
              <strong>{isHydrated && t("telemedicineTitle")}</strong>
              <br />
              {isHydrated && t("telemedicineDescription")}
            </div>
            <div>
              <strong>{isHydrated && t("financialTitle")}</strong>
              <p>{isHydrated && t("financialDescription")}</p>
            </div>

            <div>
              <strong>{isHydrated && t("medicineTitle")}</strong>
              <p>{isHydrated && t("medicineDescription")}</p>
            </div>
            <div>
              <strong>{isHydrated && t("diagnostic_services")}</strong>
              <p>{isHydrated && t("diagnostic_description")}</p>
            </div>
            <div>
              <strong>{isHydrated && t("long_term_plan")}</strong>
              <p>{isHydrated && t("long_term_description")}</p>
            </div>
            <div>
              <p>{isHydrated && t("wwdobjective")}</p>
            </div>
          </div>
          <div className="relative flex justify-center w-full xl:w-3/6">
            <Image
              src={
                "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T143930-image6_2.png"
              }
              width={570}
              height={426}
              alt="This is About image"
              className=""
            />
          </div>
        </div>
      </div>
      {/* Our Objective */}
      <div className="mt-[15px] lg:mt-[120px] mx-5">
        <div className="lg:mt-[14px] flex flex-col-reverse lg:flex-row justify-around items-center lg:gap-[93px]">
          <div className="relative flex justify-center w-full xl:w-3/6">
            <Image
              src={
                "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T144117-aboutimage3.png"
              }
              width={570}
              height={426}
              alt="This is About image"
              className=""
            />
          </div>
          <div className="xl:w-3/6 w-full flex lg:mt-[15px] flex-col lg:space-y-4 text-[14px] text-justify">
            <Headertag position="text-start">
              {isHydrated && t("objective_title")}
            </Headertag>

            <p className="lg:mt-[20px] lg:ml-[28px] m-2 p-2 lg:w-[467px] text-sm text-justify text-[#16020B] rounded-lg shadow-lg lg:px-[22px] lg:py-[30px] border-2 border-[#E2136E]">
              {isHydrated && t("objective_description")}
            </p>
          </div>
        </div>
      </div>
      {/* our Mission  */}
      <div className="mt-[15px] lg:mt-[120px] mx-5">
        <div className="flex lg:hidden ">
          <Headertag position="text-start">
            {isHydrated && t("mission_title")}
          </Headertag>
        </div>
        <div className="lg:mt-[14px] flex flex-col-reverse lg:flex-row justify-around items-center lg:gap-[93px]">
          <div className="xl:w-3/6 w-full flex lg:mt-[15px] flex-col lg:space-y-4 text-[14px] text-justify">
            <div className="hidden lg:flex">
              <Headertag position="text-start">
                {isHydrated && t("mission_title")}
              </Headertag>
            </div>
            <p className="lg:mt-[20px] lg:ml-[28px] m-2 p-2 lg:w-[467px] text-sm text-justify text-[#16020B] rounded-xl shadow-lg lg:px-[22px] lg:py-[36px] border-2 border-[#E2136E]">
              {isHydrated && t("mission_text")}
            </p>
          </div>
          <div className="relative flex justify-center w-full xl:w-3/6">
            <Image
              src={
                "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T144142-aboutimage4.png"
              }
              width={570}
              height={426}
              alt="This is About image"
              className=""
            />
          </div>
        </div>
      </div>
      {/* our Vision  */}
      <div className="mt-[15px] lg:mt-[120px] mx-5">
        <div className="flex lg:hidden ">
          <Headertag position="text-start">
            {isHydrated && t("vision_title")}
          </Headertag>
        </div>

        <div className="lg:mt-[14px] flex flex-col-reverse lg:flex-row justify-around items-center lg:gap-[93px]">
          <div className="relative flex justify-center w-full xl:w-3/6">
            <Image
              src={
                "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T144210-aboutimage6.jpg"
              }
              width={570}
              height={426}
              alt="This is About image"
              className=" rounded-2xl"
            />
          </div>
          <div className="xl:w-3/6 w-full flex lg:mt-[15px] flex-col lg:space-y-4 text-[14px] text-justify">
            <div className="hidden lg:flex">
              <Headertag position="text-start">
                {isHydrated && t("vision_title")}
              </Headertag>
            </div>
            <p className="lg:mt-[20px] lg:ml-[28px] m-2 p-2 lg:w-[467px] lg:h-[203px] text-sm text-justify text-[#16020B] rounded-xl shadow-lg lg:px-[22px] lg:py-[30px] border-2 border-[#E2136E]">
              {isHydrated && t("vision_text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
