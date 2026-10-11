"use client";
import { useEffect, useState } from "react";
import Image from "next/image.js";
import Link from "next/link";
import moment from "moment";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { useTranslation } from "react-i18next";
import Loading from "@/app/loading";
// import Video from "./LiteYoutubeEmbed";
interface BlogData {
  _id?: string;
  date: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  serial?: number;
  type: string;
  metaDescription?: string;
  summery?: string;
  author_name?: string;
  author_description?: string;
  author_image?: string;
}
const Blog = () => {
  const [blogData, setBlogData] = useState<BlogData[]>([]);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const init = async () => {
    try {
      setLoading(true);
      const { data } = await apiCall(Methods.GET, EndPoint.BLOG_FIND_ALL);
      setBlogData(data);
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
    <div className="xl:container xl:mx-auto lg:mt-12 lg:pt-0 ">
      <h2 className="text-xl text-center text-[#16020B] lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">
        {t("DigitalBangladeshDigitalHealth")}
      </h2>

      <div className="mx-0 lg:mx-4 2xl:mx-0 mt-3 lg:mt-4 grid lg:grid-cols-11 lg:gap-4 gap-5">
        {blogData?.slice(0, 4)?.map((item, index) => {
          return (
            <div
              key={index}
              className={` ${
                item?.type === "A" ? "lg:col-span-7" : "lg:col-span-4 "
              } blogImage rounded-2xl md:w-full`}
            >
              <div
                className={` ${
                  item?.type === "A"
                    ? "flex lg:flex-row-reverse flex-col items-center justify-center h-full "
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
                        : "flex items-center justify-center mx-auto mt-2 lg:w-[95%] w-[300px] "
                    } border-8 border-white rounded-2xl animationblock2 object-fill `}
                    allowFullScreen
                  ></iframe>
                ) : (
                  <>
                    {" "}
                    <Image
                      src={item?.image || ""}
                      alt={item?.title || "This is an Image"}
                      width={400}
                      height={200}
                      className={`${
                        item?.type === "A"
                          ? "lg:my-5 lg:mr-5"
                          : "flex items-center justify-center mx-auto mt-2 lg:w-[95%] "
                      } border-8 border-white rounded-2xl animationblock2 object-fill`}
                    />
                  </>
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
                        : "line-clamp-3"
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
      <div className="flex items-center justify-center mt-4 lg:mt-6 xl:mt-9">
        <Link
          href={"/blog"}
          className="py-[13px] px-[28px] hover:bg-[#E2136E] border border-black hover:border-[#E2136E] font-medium rounded-md text-[16px] hover:text-white"
        >
          {t("View All Blogs")}
        </Link>
      </div>
    </div>
  );
};

export default Blog;
