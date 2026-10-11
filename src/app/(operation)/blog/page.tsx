"use client";
import { EndPoint, Methods } from "@/api/config";
import { apiCall } from "@/lib/axios-client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import moment from "moment";
import "./style.css";
import Loading from "./loading";
import { BlogData } from "./interface";

const page = () => {
  const [blogData, setBlogData] = useState<BlogData[]>([]);
  const [mouted, setmouted] = useState(false);
  const [loading, setloading] = useState(false);
  const { t } = useTranslation();
  const init = async () => {
    try {
      setloading(true);
      const { data } = await apiCall(Methods.GET, EndPoint.BLOG_FIND_ALL);
      // console.log(data);

      setBlogData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    init();
    setmouted(true);
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <section className="xl:container xl:mx-auto mt-2 lg:mt-4 2xl:mt-8 px-4 lg:px-0">
      <h1 className="text-xl text-[#16020B] lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-center">
        {mouted && t("DigitalBangladeshDigitalHealth")}
      </h1>
      <div className="mx-0 lg:mx-4 2xl:mx-0 mt-3 lg:mt-4  lg:grid lg:grid-cols-11 lg:gap-4 gap-2">
        {blogData?.map((item, index) => {
          return (
            <div
              key={index}
              className={`${
                item?.type === "A" ? "lg:col-span-7 " : "lg:col-span-4 "
              } blogImage rounded-3xl`}
            >
              <div
                className={`gap-2 ${
                  item?.type === "A"
                    ? "flex lg:flex-row-reverse flex-col items-center justify-center h-full"
                    : "flex  flex-col"
                }`}
              >
                {item.image?.endsWith("9Arfzh4yt5qiS4YR") ? (
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/WOImVBGQ7pg?si=9Arfzh4yt5qiS4YR"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    className={`${
                      item?.type === "A"
                        ? "lg:my-5 lg:mr-5"
                        : " flex items-center justify-center mx-auto mt-2 lg:w-[95%]"
                    } border-8 border-white rounded-3xl animationblock2 object-fill min-h-[300px]`}
                    allowFullScreen
                  ></iframe>
                ) : (
                  <Image
                    src={item?.image || ""}
                    alt={item?.title || "This is an Image"}
                    width={400}
                    height={200}
                    className={`${
                      item?.type === "A"
                        ? "lg:my-5 lg:mr-5"
                        : " flex items-center justify-center mx-auto mt-2 lg:w-[95%]"
                    } border-8 border-white rounded-3xl animationblock2 object-fill`}
                  />
                )}

                <div className="flex flex-col animationblock2 p-2 2xl:p-6 justify-center">
                  <span className="text-sm ">
                    {moment(item?.date).format("LL")}
                  </span>

                  <p className=" line-clamp-2 text-base font-medium text-[#16020B] pt-3">
                    {item?.title}
                  </p>
                  <div
                    className={` ${
                      item?.type === "A"
                        ? "line-clamp-6 break-words"
                        : "line-clamp-2"
                    } mt-2`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.summery!,
                      }}
                      className="text-sm   font-medium tracking-[0.28] text-justify mt-3"
                    ></div>
                  </div>
                  <Link href={`/blog/${item?.slug}`} className="btn">
                    {t("Read More")}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default page;
