"use client";
import React from "react";
import Image from "next/image";
import { LabBlogdata } from "./Interface";
import Headertag from "@/components/common/Headertag";
import { useTranslation } from "react-i18next";

const LabBlog = () => {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto">
      <div className="flex flex-col items-center justify-center mt-10 space-y-5 2xl:space-y-7 lg:space-y-8 xl:space-y-10">
        <h2 className="text-xl text-center text-[#16020B] lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">
          {t("whyChooseCliniCalllab")}
        </h2>

        <div className="grid gap-6 lg:grid-cols-2 lg:mx-5 2xl:mx-0 2xl:w-full">
          {LabBlogdata?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col space-y-5 bg-[#FFF4F4] p-10 rounded-[15px]"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={"other/labBlog.svg"}
                  alt="Lab blog icon"
                  width={20}
                  height={25}
                />
                <h3 className="text-[24px] font-[550] font-clash text-[#3A3A3C]">
                  {t(`${item.id}`)}
                </h3>
              </div>
              <p>{t(`${item.id}Description`)}</p>
              <Image
                src={item.image}
                alt="This is a Blog image"
                width={640}
                height={300}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabBlog;
