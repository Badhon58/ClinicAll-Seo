"use client";
import React, { useEffect, useState } from "react";
import { ParentCategory } from "./Interface";
import MediHeadTag from "@/components/MediMart/MediHeadTag";
import ParentsCatagoryProduct from "./ParentsCatagoryProduct";
import { useAppSelector } from "@/redux/Hooks";
import Link from "next/link";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { useTranslation } from "react-i18next";
import { Placeholder } from "rsuite";

const ParentsCatagory = () => {
  const [allParentsCatagory, setAllParentsCatagory] =
    useState<ParentCategory[]>();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const init = async () => {
    try {
      setLoading(true);

      const response = await apiCall(Methods.GET, EndPoint.PARENTSCATEGORY);

      // const sortedData = response.data.sort((a: any, b: any) => {
      //   const indexA = priorityOrder.indexOf(a.parent_category_name);
      //   const indexB = priorityOrder.indexOf(b.parent_category_name);
      //   if (indexA !== -1 && indexB !== -1) {
      //     return indexA - indexB;
      //   }
      //   if (indexA !== -1) return -1;
      //   if (indexB !== -1) return 1;
      //   return a.parent_category_name.localeCompare(b.parent_category_name);
      // });
      const shuffled = [...response.data].sort(() => Math.random() - 0.5);

      const random10 = shuffled.slice(0, 10);

      setAllParentsCatagory(random10);
      // setAllParentsCatagory(response.data);
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
    <div className="min-h-[60vh] 2xl:mt-9 xl:mt-4 lg:mt-4 mt-1.5">

      <Placeholder.Paragraph rows={1} className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-[#3A3A3C]" />
      <div className="grid grid-cols-2 gap-2 mt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 lg:gap-3 xl:gap-5 2xl:gap-6 ">
        {Array.from({ length: 6 }).map((_: any, index: number) => {
          return (
            <div className="w-full" key={index}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="px-6 py-4">
                  <div className="h-6 bg-gray-300 mb-2"></div>
                  <div className="h-4 bg-gray-300 w-2/3"></div>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 w-1/2"></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  ) : (
    <div className=" 2xl:mt-9 xl:mt-4 lg:mt-4 mt-1.5 px-1 lg:px-3 2xl:px-0 min-h-[30vh] xl:container xl:mx-auto">
      {allParentsCatagory?.slice(0, 10).map((item, index) => (
        <div className="mt-2" key={index}>
          <div className="flex items-center justify-between min-h-[7vh] ">
            <MediHeadTag>{item.parent_category_name}</MediHeadTag>
          </div>
          <ParentsCatagoryProduct name={item.parent_category_name} />
          <div className="flex justify-end mt-2">
            <Link
              href={`/mediMart/${item.parent_category_name}`}
              className="relative px-1 lg:px-5 py-2 overflow-hidden font-medium bg-white border border-[#EB148C] rounded-md shadow-inner group"
            >
              <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-[#EB148C] group-hover:w-full ease"></span>
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-[#EB148C] group-hover:w-full ease"></span>
              <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#EB148C] group-hover:h-full ease"></span>
              <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#EB148C] group-hover:h-full ease"></span>
              <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#EB148C] opacity-0 group-hover:opacity-100"></span>
              <span className="relative flex transition-colors duration-300 delay-200 group-hover:text-white ease">
                {t("shopmore")}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                  style={{ marginLeft: "8px" }}
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      ))}
      <span className=" text-xs">*Powered By: Epharma Bangladesh Ltd</span>
    </div>
  );
};

export default ParentsCatagory;
