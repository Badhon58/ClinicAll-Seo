"use client";
import React, { useEffect, useState } from "react";
import { catagoryinterface } from "../Interface";
import GpDoctor from "./GpDoctor";
import Specialistdoctor from "./Specialistdoctor";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import PageLoading from "@/components/Seo/PageLoading";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const Physicaldoctor = () => {
  const [catagory, setCatagory] = useState<catagoryinterface[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [totalCost, setTotalCost] = useState<number>();
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // ✅ Fetch categories
  const init = async () => {
    try {
      setMounted(true);
      setLoading(true);
      const { data } = await apiCall(
        Methods.GET,
        EndPoint.PHYSICAL_DOCTOR_FIND_ALL
      );
      // console.log(data);

      if (data.length > 0) {
        setSelectedCategory(data[0]._id);
        setTotalCost(data[0].price);
      }
      setCatagory(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle click / radio change
  const handleSelectCatagory = (item: catagoryinterface) => {
    setSelectedCategory(item._id);
    setTotalCost(item.price);
  };

  const handleTabChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
    const selectedItem = catagory.find((item) => item._id === e.target.value);
    if (selectedItem) {
      setTotalCost(selectedItem.price); // ✅ store total cost
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (!mounted) {
    return null;
  }
  return loading ? (
    <PageLoading />
  ) : (
    <div className="flex flex-col gap-6 md:flex-row 2xl:gap-8">
      <div className="flex flex-col space-y-3 lg:flex-1 2xl:space-y-5">
        <div className="grid grid-cols-2 gap-3">
          {catagory.map((item) => (
            <div
              key={item._id}
              onClick={() => handleSelectCatagory(item)}
              className="p-3 cursor-pointer flex justify-between md:p-4 2xl:p-7 rounded-md border shadow-[0px_0px_12px_2px_rgba(0,_0,_0,_0.1)]"
            >
              <div className="flex flex-col justify-center space-y-1">
                <p className="text-lg font-[550]">
                  {i18n.language == "bn" ? item.bnService : item.service}
                </p>
                <p className="text-sm font-medium">
                  {t("moneyCount", { count: item.price })}
                </p>
              </div>
              <div className="flex items-center justify-center cursor-pointer">
                <input
                  type="radio"
                  name="doctorCategory"
                  className="cursor-pointer accent-pink-500"
                  checked={selectedCategory === item._id}
                  value={item._id}
                  onChange={handleTabChanged}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full">
          {catagory.map((item) => {
            const serviceName = item.service.toLowerCase().trim();
            return (
              <div
                key={item._id}
                style={{
                  display: selectedCategory === item._id ? "block" : "none",
                }}
              >
                {serviceName.includes("family") && (
                  <GpDoctor
                    physicalDoctorId={item._id}
                    totalCost={totalCost || 0}
                  />
                )}
                {serviceName.includes("specialist") && (
                  <Specialistdoctor
                    physicalDoctorId={item._id}
                    catagory={item.categories}
                    totalCost={totalCost || 0}
                  />
                )}
              </div>
            );
          })}
        </div>
        <span className=" text-xs">
          *Powered By: Olwel BD Ltd
        </span>
      </div>

      <div className="lg:flex-1  ">
        <div className="shadow-[-6px_6px_37.5px_7px_rgba(0,_0,_0,_0.1)] sticky top-[12%] p-3 rounded-md">
          <Image
            src={
              "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-04092025T150326-5.jpg"
            }
            alt="This is an Image"
            width={1500}
            height={1500}
            className="h-full w-full rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Physicaldoctor;
