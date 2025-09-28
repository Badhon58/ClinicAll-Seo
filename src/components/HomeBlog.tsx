"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BlogData } from "./interface";
import Image from "next/image";
import Link from "next/link";

const HomeBlog = () => {
  const [allBlogs, setAllBlogs] = useState<BlogData[]>();
  const [loading, setLoading] = useState(false);
  const init = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/blog");
      setAllBlogs(data.result);
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
    "Loading..."
  ) : (
    <section className="container mx-auto mt-2 lg:mt-4 2xl:mt-8 px-4 lg:px-0">
      <h1 className="text-xl text-[#16020B] lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-center">
        Digital Bangladesh Digital Health
      </h1>
      <div className="mx-0 lg:mx-4 2xl:mx-0 mt-3 lg:mt-4  lg:grid lg:grid-cols-11 lg:gap-4 gap-2">
        {allBlogs &&
          allBlogs?.map((item, index) => {
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
                  <Image
                    src={item?.image || "/default-image.png"}
                    alt={item?.title || "This is an Image"}
                    width={400}
                    height={200}
                    className={`${
                      item?.type === "A"
                        ? "lg:my-5 lg:mr-5"
                        : " flex items-center justify-center mx-auto mt-2 lg:w-[95%]"
                    } border-8 border-white rounded-3xl animationblock2 object-fill`}
                  />
                  <div className="flex flex-col animationblock2 p-2 2xl:p-6 justify-center">
                    <span className="text-sm ">{item?.date}</span>

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
                          __html: item?.metaDescription!,
                        }}
                        className="text-sm   font-medium tracking-[0.28] text-justify mt-3"
                      ></div>
                    </div>
                    <Link href={`/allblog/${item?.slug}`} className="btn">
                      Read More
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

export default HomeBlog;
