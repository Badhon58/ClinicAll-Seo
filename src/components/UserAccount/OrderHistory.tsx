"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MedicineOrder from "./MedicineOrder";
import LabOrderItem from "./LabOrderItem";
import HealthCheckUpOrder from "./HealthCheckUpOrder";
import DoctorHome from "./DoctorHome";
const OrderHistory = () => {
  const [productType, setProductType] = useState<string>("product");
  const { t } = useTranslation();

  return (
    <section className="min-h-full xl:container xl:mx-auto px-2 lg:pt-3  lg:px-2 xl:px-4 2xl:px-8 shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)]">
      <p className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-[#16020B]">
        {t("MyOrder")}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 px-4 py-2 text-sm bg-white lg:rounded-full  rounded-md shadow-[0px_0px_13px_6px_rgba(0,_0,_0,_0.1)] 2xl:text-base  mt-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            setProductType("product");
          }}
          className={`2xl:px-14 px-7 py-2 w-full  ${
            productType == "product" && "bg-[#EB148C] rounded-full text-white"
          } `}
        >
          {t("Product")}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setProductType("lab");
          }}
          className={`2xl:px-14 px-7 py-2 w-full ${
            productType == "lab" && "bg-[#EB148C] rounded-full text-white"
          } `}
        >
          {t("Lab Test")}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setProductType("labpackage");
          }}
          className={`2xl:px-14 px-7 py-2 w-full ${
            productType == "labpackage" &&
            "bg-[#EB148C] rounded-full text-white"
          } `}
        >
          {t("labpackage")}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setProductType("bookdoctor");
          }}
          className={` px-7 py-2 w-full  truncate ${
            productType == "bookdoctor" &&
            "bg-[#EB148C] rounded-full text-white"
          } `}
        >
          {t("physicaldoctor")}
        </button>
      </div>
      <aside>
        {productType == "product" && <MedicineOrder />}
        {productType == "lab" && <LabOrderItem />}
        {productType == "labpackage" && <HealthCheckUpOrder />}
        {productType == "bookdoctor" && <DoctorHome />}
      </aside>
    </section>
  );
};

export default OrderHistory;
