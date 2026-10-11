"use client";
import React, { useEffect, useState } from "react";
import { ParentCategory } from "./Interface";
import SubMenu from "./SubMenu";
import { useAppSelector } from "@/redux/Hooks";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { useTranslation } from "react-i18next";
// import Category from "./Category";

const LeftSidebar = () => {
  const [parentsCategory, setParentsCategory] = useState<ParentCategory[]>();
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const init = async () => {
    try {
      setLoading(true);
      const priorityOrder = [
        "Medicines",
        "Vitamins & Supplements",
        "Personal Care",
        "Diabetic Care",
      ];
      const response = await apiCall(Methods.GET, EndPoint.PARENTSCATEGORY);
      const sortedData = response?.data?.sort((a: any, b: any) => {
        const indexA = priorityOrder?.indexOf(a.parent_category_name);
        const indexB = priorityOrder?.indexOf(b.parent_category_name);

        // If both are in the priority order, sort by the custom order
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }

        // If only one is in the priority order, it goes first
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;

        // If neither is in the priority order, sort alphabetically by name
        return a.parent_category_name.localeCompare(b.parent_category_name);
      });
      setParentsCategory(sortedData);
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
    <div className="min-h-[10vh] lg:flex-1">loading...</div>
  ) : (
    <div className="lg:flex-1 relative hidden lg:flex flex-col  2xl:min-h-[540px]  min-h-[300px] lg:min-h-[350px] lg:max-h-[360px] max-h-[300px] 2xl:max-h-[400px]  bg-opacity-25 bg-[#FFF4F4]">
      <div className="bg-[#3A3A3C] py-3 px-5 pr-[30px] 2xl:pr-8 flex items-center rounded-t-md justify-between">
        <p className="text-white">{t("categories")}</p>
        <p className="text-white"> {t("viewAll")}</p>
      </div>
      <section className="overflow-y-auto medimartscroll">
        {parentsCategory?.map((item: ParentCategory, index) => (
          <div key={index}>
            <SubMenu
              item={item}
              setIsMenuOpen={setIsMenuOpen}
              isMenuOpen={isMenuOpen}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default LeftSidebar;
