"use client";
import React, { useEffect, useState } from "react";
import { DoctorVisite } from "./Interface";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { getUserID } from "@/lib/authHandler";
import PageLoading from "../Seo/PageLoading";
import OrderHistoryCard from "./OrderHistoryCard";

const DoctorHome = () => {
  const [HomeDoctor, setHomeDoctor] = useState<DoctorVisite[]>();
  const [loading, setLoading] = useState(false);
  const init = async () => {
    try {
      setLoading(true);
      const userId: any = await getUserID();
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.PHYSICAL_DOCTOR_GET_BY_ID}/${userId}`
      );
    //   console.log(response);
      setHomeDoctor(response.data)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, []);
  if (HomeDoctor && HomeDoctor?.length <= 0) {
    return <p className="text-xl font-medium p-3">Order Not Found </p>;
  }
  return loading ? (
    <PageLoading />
  ) : (
    <>
      {HomeDoctor?.map((item: DoctorVisite, index) => (
        <div
          key={index}
          className="shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)] rounded-md my-3"
        >
          <OrderHistoryCard item={item} />
        </div>
      ))}
    </>
  );
};

export default DoctorHome;
