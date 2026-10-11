"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useAppSelector } from "@/redux/Hooks";
import { useTranslation } from "react-i18next";
import DoctorAccording from "./DoctorAccording";
import { DoctorBnQuestionData, DoctorEnQuestionData } from "./Interface";
const altext = {
  entitle: "Frequently Asked Questions",
  bntitle: "আপনার সকল প্রশ্নের উত্তর এখানে",
  ennumber: "65,000 +",
  bnnumber: "৬৫,০০০ +",
  ensort: "Happy Patients",
  bnsort: "হ্যাপি পেশেন্টস",
};
const DoctorFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { t } = useTranslation();
  const toggleAccording = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const language = useAppSelector((state) => state.languageSlice.language);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <section className="px-6 2xl:mt-[70px] mt-8  lg:mt-12 lg:pt-0 ">
      <h2 className="text-xl text-center text-[#16020B] lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">
        {t("qnatitle")}
      </h2>

      <div className="rounded-lg xl:container xl:mx-auto ">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:mt-6 2xl:px-[61px] rounded-lg">
          {" "}
          <div className="relative flex items-center justify-center w-full xl:w-full ">
            <Image
              width={1000}
              height={600}
              src={
                "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T105445-question.png"
              }
              alt="This is An image"
              className="rounded-lg 2xl:w-[570px] 2xl:h-[400px] xl:w-[500px] xl:h-[370px] border-4 border-white shadow-md"
            />
            <div className="absolute items-center justify-center hidden p-6 space-x-4 bg-white shadow-xl lg:flex bottom-16 -left-6 rounded-xl">
              <Image
                width={60}
                height={60}
                src="other/HappyPatients.svg"
                alt=""
              />
              <div>
                <p className="font-bold text-[24px] text-[#16020B]">
                  {isHydrated
                    ? language == "bn"
                      ? altext.bnnumber
                      : altext.ennumber
                    : null}
                </p>
                <p>
                  {" "}
                  {isHydrated
                    ? language == "bn"
                      ? altext.bnsort
                      : altext.ensort
                    : null}{" "}
                </p>
              </div>
            </div>
            <div className="absolute items-center justify-center p-2 space-x-4 bg-white shadow-xl lg:hidden bottom-16 -left-6 rounded-xl">
              <div>
                <p className="font-bold text-[20px] text-[#16020B]">
                  {" "}
                  {isHydrated
                    ? language == "bn"
                      ? altext.bnnumber
                      : altext.ennumber
                    : null}
                </p>
                <p>
                  {" "}
                  {isHydrated
                    ? language == "bn"
                      ? altext.bnsort
                      : altext.ensort
                    : null}{" "}
                </p>
              </div>
            </div>
            <div className="bg-white flex absolute shadow-xl items-center justify-center px-3 py-4 rounded-full top-[22%] 2xl:right-14 -right-5 lg:right-0">
              <Image width={50} height={50} src="other/call.svg" alt="" />
            </div>
          </div>
          <div className="lg:w-[90%]  md:w-4/5 w-full lg:ml-10 mx-10  ">
            <div className="flex flex-col items-center justify-center pt-4 border-none lg:space-y-4 ">
              <p className="text-base text-justify ">{t("qnasubtitle")}</p>
              <div
                className={`lg:overflow-x-hidden overflow-y-auto  h-[400px]   ${
                  activeIndex === 6 ? "overflow-y-auto" : "overflow-y-auto "
                }  `}
              >
                {isHydrated
                  ? language === "bn"
                    ? DoctorBnQuestionData.map((item, index) => (
                        <div key={index}>
                          <DoctorAccording
                            title={item.label}
                            children={item.children}
                            isActive={activeIndex === index}
                            onToggle={() => toggleAccording(index)}
                          />
                        </div>
                      ))
                    : DoctorEnQuestionData.map((item, index) => (
                        <div key={index}>
                          <DoctorAccording
                            title={item.label}
                            children={item.children}
                            isActive={activeIndex === index}
                            onToggle={() => toggleAccording(index)}
                          />
                        </div>
                      ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DoctorFAQ;
