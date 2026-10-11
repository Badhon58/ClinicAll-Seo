"use client";
import { EndPoint, Methods } from "@/api/config";
import Loading from "@/app/loading";
import { apiCall } from "@/lib/axios-client";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../style.css";
import { BlogData } from "../interface";

const SingleBlog = ({ title }: { title: string }) => {
  const [SingleBlog, setSingleBlog] = useState<BlogData>();
  const [allBlog, setAllBlog] = useState<BlogData[]>();
  const [loading, setLoading] = useState(true);
  const init = async () => {
    try {
      setLoading(true);
      const responseall = await apiCall(
        Methods.GET,
        `${EndPoint.SINGLE_BLOG_HOME}/${title}`
      );
      setSingleBlog(responseall.data);
      console.log(responseall.data);
      const { data } = await apiCall(Methods.GET, EndPoint.BLOG_FIND_ALL);
      setAllBlog(data);
      
      
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
    <Loading />
  ) : (
    <div className="min-h-[70vh] xl:container xl:mx-auto px-3  mt-2 lg:px-20 lg:mt-3 xl:mt-4 2xl:mt-5">
      <section className="grid gap-3 mx-auto  lg:grid-cols-10 lg:gap-5 xl:gap-7 2xl:gap-9 ">
        <aside className=" lg:col-span-7 lg:mt-5 xl:mt-4">
          {SingleBlog?.image?.endsWith("9Arfzh4yt5qiS4YR") ? (
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/WOImVBGQ7pg?si=9Arfzh4yt5qiS4YR"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="w-full h-[400px] md:h-[500px] lg:h-[400px] 2xl:h-[600px] xl:w-full object-contain  px-0 rounded-md"
              allowFullScreen
            ></iframe>
          ) : (
            <Image
              src={
                SingleBlog?.image ||
                "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-18012025T155736-images.png"
              }
              alt={SingleBlog?.title || "Blog Image"}
              className="w-full h-[400px] md:h-[500px] lg:h-[400px] 2xl:h-[600px] xl:w-full object-contain  px-0 rounded-md"
              width={700}
              height={600}
            />
          )}

          <div className="mt-4 lg:mt-8 xl:mt-10">
            <p className=" text-[#E2136E] text-sm ">{SingleBlog?.date}</p>
            <h1 className=" pt-2 text-start  text-lg lg:text-xl font-semibold text-[#16020B] mb-4">
              {SingleBlog?.title}
            </h1>
            {/* <p className="mt-4 text-xs lg:text-sm xl:text-base 2xl:text-lg lg:mt-6 ">
              {SingleBlog?.description}
            </p> */}
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: SingleBlog?.description!,
              }}
            />

            {SingleBlog?.image && (
              <div className="border p-3 mt-5 flex space-x-3  items-center w-full rounded-lg">
                <div className="size-20 flex-1 md:flex-none">
                  {SingleBlog?.author_image && (
                    <Image
                      src={SingleBlog.author_image||"other/userprofile.svg"}
                      alt={SingleBlog?.author_name || "Author image"}
                      width={700}
                      height={700}
                      className="size-20 rounded-full object-cover border"
                    />
                  )}
                </div>
                <div className="flex-[3] md:flex-none">
                  {SingleBlog?.author_name && (
                    <p className="text-lg font-medium">
                      Author Name : {SingleBlog.author_name}
                    </p>
                  )}
                  {SingleBlog?.author_description && (
                    <p className="">{SingleBlog.author_description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>
        <aside className=" lg:col-span-3">
          <input
            type="text"
            className="outline-none border-b-2 border-black border-opacity-40 w-full text-xl font-medium text-black"
            placeholder="Search Here..."
          />
          <div className="mt-3 2xl:mt-5">
            <img
              src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-07112024T110428-business-card--later-head-2-02-1.png"
              alt="This is blog sidebar Image"
              className="w-full"
            />
            <div className="mt-3">
              <p className="font-semibold text-xl text-[#131313]">
                Recent Posts
              </p>
              <div className="grid gap-2 mt-3 ">
                {allBlog?.slice(0, 4).map((item) => (
                  <div key={item._id} className="flex space-x-2">
                    <img
                      src={item?.image}
                      alt="Blog recent Image"
                      className="w-[80px]  h-[70px] object-contain  rounded-md"
                    />
                    <div className="flex flex-col justify-center">
                      <p className=" text-b text-[15px] ">
                        {moment(item?.date).format("LL")}
                      </p>
                      <Link
                        href={`/blog/${item.slug}`}
                        className="font-normal text-sm line-clamp-2 hover:underline"
                      >
                        {item.title}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <p className="font-semibold text-xl text-[#131313]">
                Popular Tags
              </p>
              <div className="grid grid-cols-3 gap-3 mt-3">
                <p className="text-center text-white bg-[#E2136E] rounded-full px-2 py-1 text-xs 2xl:text-sm cursor-pointer">
                  Health
                </p>
                <p className="text-center text-white bg-[#E2136E] rounded-full px-2 py-1 text-xs 2xl:text-sm cursor-pointer">
                  Tech
                </p>
                <p className="text-center text-white bg-[#E2136E] rounded-full px-2 py-1 text-xs 2xl:text-sm cursor-pointer">
                  Marketing
                </p>
                <p className="text-center text-white bg-[#E2136E] rounded-full px-2 py-1 text-xs 2xl:text-sm cursor-pointer">
                  Innovative
                </p>
                <p className="text-center text-white bg-[#E2136E] rounded-full px-2 py-1 text-xs 2xl:text-sm cursor-pointer">
                  Clinical
                </p>
                <p className="text-center text-white bg-[#E2136E] rounded-full px-2 py-1 text-xs 2xl:text-sm cursor-pointer">
                  Tech
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default SingleBlog;
