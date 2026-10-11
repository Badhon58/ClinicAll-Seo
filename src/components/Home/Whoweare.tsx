"use client";
import Link from "next/link";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import "./Style.css";
import Image from "next/image";
const data = [
  { key: "telemedicine_services" },
  { key: "hospital_cashback" },
  { key: "medicine_delivery" },
  { key: "lab_test" },
];
import progotiImage from "@/assets/progoti.svg";
import bangladesh from "@/assets/bangladesh.svg";
import undp from "@/assets/undp.svg";
import WhoweareSlider from "./WhoweareSlider";
const Whoweare = () => {
  const { t } = useTranslation();

  return (
    <section className=" mt-5 lg:pt-0 bg-[#FFF4F4] relative overflow-hidden">
      <span className="whoweare1 " /> <span className="whoweare2" />{" "}
      <span className="whoweare3" />
      <div className="flex flex-col justify-around md:flex-row xl:container xl:mx-auto lg:py-[40px] py-4">
        <div className="flex items-center justify-center md:w-1/2">
          <Image
            src={
              "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-23112024T180307-image-hero-fai-1-1.gif"
            }
            alt="This is WWA? first Image"
            width={1000}
            height={1000}
            unoptimized
            className="rounded-2xl animationblock1 2xl:border-8 lg:border-4 border-white lg:w-[80%] lg:h-[80%] xl:w-[450px] xl:h-[330px] 2xl:w-[574px] 2xl:h-[429px] w-[90%] h-[90%]"
          />
        </div>
        <div className="flex flex-col justify-center px-3 mt-3 md:w-1/2 md:px-0 animationblock1 lg:mt-0">
          <h3 className="text-xl text-[#16020B] lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">
            {t("Who We Are?")}
          </h3>

          <p className="animationblock1 font-normal text-[#16020B] 2xl:mt-[16px] lg:mt-2 mt-1 text-justify lg:text-sm   lg:w-[85%] ">
            {t("whowearetext")}
          </p>

          <div className=" lg:mt-4">
            {data?.map((item, index) => (
              <div
                className=" py-1 flex justify-start items-start lg:gap-[10px] gap-3 animationblock1"
                key={index}
              >
                <Image
                  src={"other/Frame.svg"}
                  width={20}
                  height={20}
                  alt="This is WWA"
                  className="w-[20px] h-[20px] lg:w-[15px] lg:h-[15px] 2xl:w-[20px] 2xl:h-[20px]"
                />
                <div className="text-[#16020B] font-medium  lg:text-sm">
                  <Trans
                    i18nKey={item.key}
                    components={{ bold: <span className="font-semibold" /> }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[25px]">
            <Link
              href="/About"
              className="hover:bg-[#E2136E] hover:text-white border border-black hover:border-[#E2136E] font-medium  py-[13px] px-[28px]  rounded-[5px]"
            >
              {t("Read More")}
            </Link>
          </div>
        </div>
      </div>
      <div className=" xl:container xl:mx-auto  py-4 lg:px-5 px-2.5 ">
        <div className="flex items-end justify-end ">
          <div className="flex items-center space-x-10">
            <Image
              src={bangladesh}
              className="2xl:w-[113px] 2xl:h-[113px] w-[85px] h-[85px]"
              alt="Bangladesh "
              width={113}
              height={113}
            />
            <Image
              src={undp}
              className="2xl:w-[50px] 2xl:h-[101px] w-[40px] h-[90px]"
              alt="Bangladesh "
              width={50}
              height={101}
            />
          </div>
        </div>
        {/* <div className="grid items-center gap-2 mt-3 lg:grid-cols-2 justify-items-center "> */}
        <div className="flex flex-col-reverse gap-6 mt-3 lg:items-center lg:justify-center lg:flex-row ">
          <div className="flex-1 ">
            <h2 className="text-2xl font-semibold 2xl:text-4xl">
              {t("undptitle")}
            </h2>
            <p className="mt-3 text-sm text-justify">
              <Trans i18nKey={"undpdescription"} components={{ br: <br /> }} />
            </p>
          </div>
          <div className="lg:w-[50%] mb-5  ">
            <WhoweareSlider />
          </div>
        </div>
        <div className="flex flex-col justify-end lg:flex-row lg:space-x-6">
          <div className="flex items-center space-x-2">
            <p className="text-sm">Implementation Partner : </p>
            <Image
              src={progotiImage}
              alt="Pragati Life Insurance"
              width={127}
              height={27}
              className="w-[107px] h-[27px] "
            />
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm">Telemedicine & Technical Partner : </p>
            <Image
              src={"/other/logo.svg"}
              alt="Pragati Life Insurance"
              width={127}
              height={27}
              className="w-[107px] h-[27px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whoweare;
