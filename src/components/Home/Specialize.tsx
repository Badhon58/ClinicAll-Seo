"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/loading";
import Image from "next/image";
import { useAppSelector } from "@/redux/Hooks";
import { desiredOrder } from "./AllInterface";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { useTranslation } from "react-i18next";

interface category {
  _id: string;
  name: string;
  image: string;
  bnName: string;
  slug: string
}

const Specialize = () => {
  const router = useRouter();
  const [docCategory, setDocCategory] = useState<category[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const init = async () => {
    setLoading(true);
    try {
      const { data } = await apiCall(
        Methods.GET,
        EndPoint.CATEGORY_OF_DOCTOR_FIND_ALL_INFO
      );
      const sortedData = data.sort((a: category, b: category) => {
        const indexA = desiredOrder.indexOf(a.name);
        const indexB = desiredOrder.indexOf(b.name);
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.name.localeCompare(b.name);
      });
      setDocCategory(sortedData);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const language = useAppSelector((state) => state.languageSlice.language);
  useEffect(() => {
    init();
  }, []);

  const handleClick = (slug: string) => {
    // console.log(slug);
    // return
    router.push(`/doctorlist?_catagory_name_=${slug}#doctor`);
  };

  return loading ? (
    <Loading />
  ) : (
    <section className=" lg:pt-0">
      <div className=" min-h-[60%] bg-no-repeat bg-cover  bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T104059-bg1.png')]">
        <div className="xl:container xl:mx-auto xl:py-[30px] py-[10px] ">
          <h2 className="text-xl text-center text-[#16020B] lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">
            {t("Find By Specialization")}
          </h2>
          <div className="grid justify-center items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 lg:gap-5 mx-[20px] xl:mx-32 2xl:mx-44 xl:mt-[30px] mt-[15px]">
            {docCategory?.slice(0, 15)?.map((data: any, index) => (
              <div
                onClick={() => handleClick(data?.slug)}
                key={index}
                className="flex animationblock1 h-full flex-col items-center justify-center bg-[#ffffff] rounded-xl shadow-xl  2xl:py-5 py-2 hover:scale-105 cursor-pointer"
                title={language == "bn" ? data?.bnName : data?.name}
              >
                <Image
                  width={65}
                  height={40}
                  src={data?.image ? data?.image : "/other/familyDoctor.svg"}
                  alt={data?.name}
                  className=""
                />
                <h3 className="text-center text-sm lg:text-base font-semibold text-[#16020B] mt-5 truncate text-wrap px-2">
                  {language == "bn" ? data?.bnName : data?.name}
                </h3>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center 2xl:mt-[50px] mt-5">
            <Link
              href={"/Specialize"}
              className="hover:bg-[#E2136E] hover:text-white border border-black hover:border-[#E2136E] font-medium  py-[13px] px-[28px]  rounded-md"
            >
              {t("Show More")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specialize;
