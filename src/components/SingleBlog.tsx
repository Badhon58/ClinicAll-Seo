"use client";
import React, { useEffect, useState } from "react";
import { BlogData } from "./interface";
import axios from "axios";
import Image from "next/image";

const SingleBlog = ({ slugstring }: { slugstring: string }) => {
  const [blog, setBlog] = useState<BlogData>();
  const [loading, setLoading] = useState(false);
  const init = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/blog/${slugstring}`);
      setBlog(data);
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
    <section className="xl:container xl:mx-auto">
      <aside className=" xl:mt-4">
        <Image
          src={
            blog?.image ||
            "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-18012025T155736-images.png"
          }
          alt={blog?.title || "Blog Image"}
          className="w-full h-[400px] md:h-[500px] lg:h-[400px] 2xl:h-[600px] xl:w-full object-contain  px-0 rounded-md"
          width={700}
          height={600}
        />
        <div className="mt-4 lg:mt-8 xl:mt-10">
          <p className=" text-[#E2136E] text-sm ">{blog?.date}</p>
          <h1 className=" pt-2 text-start  text-lg lg:text-xl font-semibold text-[#16020B] mb-4">
            {blog?.title}
          </h1>

          <div
            className=""
            dangerouslySetInnerHTML={{
              __html: blog?.description!,
            }}
          />
        </div>
      </aside>
    </section>
  );
};

export default SingleBlog;
