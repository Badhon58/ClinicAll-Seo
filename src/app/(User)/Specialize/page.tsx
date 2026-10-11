"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/loading";
import Image from "next/image";
import { useAppSelector } from "@/redux/Hooks";
import Headertag from "@/components/common/Headertag";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";

interface category {
  _id: string;
  name: string;
  image: string;
  bnName: string;
  slug: string
}
const page = () => {
  const router = useRouter();
  const [docCategory, setDocCategory] = useState<category[]>([]);
  const [loading, setLoading] = useState(false);
  const init = async () => {
    setLoading(true);
    try {
      const { data } = await apiCall(
        Methods.GET,
        EndPoint.CATEGORY_OF_DOCTOR_FIND_ALL_INFO
      );
      setDocCategory(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const language = useAppSelector((state) => state.languageSlice.language);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
    init();
  }, []);

  const handleClick = (slug: number) => {
    router.push(`/doctorlist?_catagory_name_=${slug}#doctor`);
  };

  return loading ? (
    <Loading />
  ) : (
    <section className=" lg:pt-0 ">
      <div className=" min-h-[60%] bg-no-repeat bg-cover  bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T104059-bg1.png')]">
        <div className="xl:container xl:mx-auto xl:py-[30px] py-[10px] ">
          <Headertag position="text-center">
            {isHydrated
              ? language === "bn"
                ? "প্রয়োজন অনুযায়ী বিশেষজ্ঞ ডাক্তার খুঁজুন"
                : "Find By Specialization"
              : null}
          </Headertag>
          <div className="grid justify-center items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 lg:gap-5 mx-[20px] xl:mx-32 2xl:mx-44 xl:mt-[30px] mt-[15px]">
            {docCategory?.map((data: any, index) => (
              <div
                onClick={() => handleClick(data?.slug)}
                key={index}
                className="flex flex-col h-full items-center mb-4 justify-center bg-[#ffffff] rounded-xl shadow-xl  py-5 hover:scale-105 cursor-pointer"
              >
                <Image
                  width={65}
                  height={40}
                  src={data?.image ? data?.image : "/other/familyDoctor.svg"}
                  alt={data?.name}
                />
                <h3
                  className="text-center text-base font-semibold text-[#16020B] mt-5 truncate text-wrap px-2"
                  title={language == "bn" ? data?.bnName : data?.name}
                >
                  {language == "bn" ? data?.bnName : data?.name}
                  {/* {data?.name} */}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
