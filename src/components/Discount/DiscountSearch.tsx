"use client";
import { EndPoint, Methods } from "@/api/config";
import { apiCall } from "@/lib/axios-client";
import Headertag from "@/components/common/Headertag";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoReload } from "react-icons/io5";
import Link from "next/link";
interface testCenter {
  organization: string;
  address: string;
  discount: number;
}
const DiscountSearch = () => {
  const [LabPartner, setLabPartner] = useState<testCenter[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const search = useSearchParams();
  const router = useRouter();
  const key = search.get("key");
  const { t } = useTranslation();
  const init = async () => {
    try {
      if (!key || key === "") {
        const response = await apiCall(
          Methods.GET,
          `${EndPoint.LAB_TEST_CENTER_FIND_ALL}`
        );
        const allPartners = response.data;
        setLabPartner(allPartners);
      } else {
        const { data } = await apiCall(
          Methods.GET,
          `${EndPoint.LAB_TEST_CENTER_FIND_ALL}?organization=${key}`
        );
        setLabPartner(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchTerm(value);
    router.replace(`?key=${encodeURIComponent(value)}`);
  };

  const handleRefresh = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      router.replace("/discount");
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.LAB_TEST_CENTER_FIND_ALL}`
      );
      const allPartners = response.data;
      setLabPartner(allPartners);
      setSearchTerm("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, [key]);

  return (
    <section className="py-2 xl:container xl:mx-auto min-h-[90vh] mt-2">
      <Headertag position="text-center">
        {t("discountPartnerDetails")}
      </Headertag>
      <div className="p-5 mt-4 border rounded-md">
        <div className="my-2 flex items-center space-x-4">
          <input
            type="text"
            className="md:w-1/3 p-2 pl-4 text-base font-normal text-black bg-gray-100 rounded-lg outline-none focus:outline-1 "
            placeholder="Search by name, Location and Discount"
            onChange={handleChange}
            value={searchTerm}
          />
          <button
            onClick={handleRefresh}
            className="bg-[#EB148C] p-2 rounded-md text-white"
          >
            <IoReload size={22} />
          </button>
        </div>

        <div className="grid p-3 mt-4 border-y lg:grid-cols-12">
          <p className="flex col-span-6 space-x-10 font-medium">
            {" "}
            <span>#</span> <span> Partner Name</span>
          </p>
          <p className="col-span-4 font-medium">Address</p>
          <p className="col-span-2 font-medium">Discount</p>
        </div>
        {LabPartner.map((item, index) => (
          <div
            className="grid p-3 text-gray-400 border-b lg:grid-cols-12"
            key={index}
          >
            <p className="flex col-span-6 space-x-10 font-[450]">
              {" "}
              <span className="w-4">{index + 1}</span>{" "}
              <span>{item.organization}</span>
            </p>
            <p className="col-span-4 font-[450]">{item.address}</p>
            <p className="col-span-2 font-[450]">
              Upto {item.discount > 1 ? item.discount : 0}%
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiscountSearch;
