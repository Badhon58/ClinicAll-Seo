"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/Hooks";
import { ParentCategory } from "../MediMart/Interface";
import SubMenu from "../MediMart/SubMenu";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { useTranslation } from "react-i18next";
const ResLeftSidebar = ({
  setIsMenuOpen,
  isMenuOpen,
}: {
  setIsMenuOpen: any;
  isMenuOpen: boolean;
}) => {
  const [parentsCategory, setParentsCategory] = useState<ParentCategory[]>();
  const [loading, setLoading] = useState(false);
  const language = useAppSelector((state) => state.languageSlice.language);
  const [isHydrated, setIsHydrated] = useState(false);
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
      const { data } = await apiCall(Methods.GET, EndPoint.PARENTSCATEGORY);
      // console.log(data);
      if (!data) {
        return null
      }
      const sortedData = data.sort((a: any, b: any) => {
        const indexA = priorityOrder.indexOf(a.parent_category_name);
        const indexB = priorityOrder.indexOf(b.parent_category_name);

        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }

        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;

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
    setIsHydrated(true);
  }, []);
  return loading ? (
    <div className="min-h-[70vh]">loading...</div>
  ) : (
    <div className="lg:flex-1  flex-col px-4  min-h-[50vh] max-h-[60vh] overflow-y-auto  bg-opacity-25 bg-[#FFF4F4]">
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

export default ResLeftSidebar;
