"use client";
import React, { useEffect, useState } from "react";
import { Claimhistory } from "./Interface";
import { getUserID } from "@/lib/authHandler";
import ClaimHistoryaccording from "./ClaimHistoryaccording";
import { useAppSelector } from "@/redux/Hooks";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import PageLoading from "../Seo/PageLoading";

const ClaimHistory = () => {
  const [claimHistory, setClaimHistory] = useState<Claimhistory[]>();
  const [loading, setLoading] = useState(true);
  const language = useAppSelector((state) => state.languageSlice.language);
  const [isHydrated, setIsHydrated] = useState(false);
  const init = async () => {
    try {
      const userId: any = await getUserID();
      setLoading(true);
      setIsHydrated(true);
      await apiCall(Methods.GET, `${EndPoint.SINGLE_CLAIM_GET_BY_ID}/${userId}`)
        .then((response) => {
          setClaimHistory(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return loading ? (
    <PageLoading />
  ) : (
    <section className="min-h-[80vh] xl:container xl:mx-auto px-2 lg:pt-3 xl:pt-4 lg:px-2 xl:px-4 2xl:px-8 shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)]">
      <p className="text-lg lg:text-xl  font-semibold text-[#3A3A3C]">
        {isHydrated
          ? language == "bn"
            ? "ক্লেইম সমূহের তথ্য"
            : "Claim History"
          : null}{" "}
      </p>
      <aside className="hidden md:block">
        <div className="grid grid-cols-4 lg:grid-cols-12 mt-5 bg-[#FFF4F4] px-1 ">
          <p className="lg:col-span-4 text-xs font-semibold  py-3 px-3">Name</p>
          <p className="lg:col-span-2 text-xs font-semibold py-3 px-3  flex items-center justify-center ">
            Claim Type
          </p>
          <p className="lg:col-span-2 text-xs font-semibold flex items-center justify-center py-3 px-3">
            Claim Amount
          </p>
          <p className="lg:col-span-2 text-xs font-semibold flex items-center justify-center py-3 px-3 ">
            STATUS
          </p>
          <p className="hidden md:block  lg:col-span-2 "></p>
        </div>
        {claimHistory?.map((item, index) => {
          return (
            <div key={index} className=" py-2 px-1 ">
              <ClaimHistoryaccording item={item} index={index} />
            </div>
          );
        })}
      </aside>

      <aside className="block md:hidden ">
        {claimHistory?.map((item, index) => (
          <div
            className="grid grid-cols-3 mb-2 pb-2 border-b border-black"
            key={index}
          >
            <div className="grid grid-rows-4 bg-[#FFF4F4] col-span-1  ">
              <p className="py-1.5 flex items-center justify-center border-y text-sm">
                Name
              </p>
              <p className="py-1.5 flex items-center justify-center   text-sm">
                {" "}
                Claim Type
              </p>
              <p className="py-1.5 flex items-center justify-center border-y  text-sm">
                {" "}
                Claim Amount
              </p>
              <p className="py-1.5 flex items-center justify-center border-b  text-sm">
                {" "}
                STATUS
              </p>
            </div>
            <div className="grid grid-rows-4 col-span-2">
              <div className="py-1.5  border-y flex flex-col items-center space-x-2">
                <p className="font-semibold text-[#6B7588] text-xs">
                  {item?.user?.firstName} {item?.user?.lastName}
                </p>
                <p className="text-xs font-medium text-[#8F90A6]">
                  {item?.user?.email}
                </p>
              </div>
              <p className="py-1.5 flex items-center justify-center ">
                {" "}
                {item?.bookedPackage?.packageId?.type}
              </p>
              <p className="py-1.5 flex items-center justify-center border-y">
                {" "}
                {item?.claimAmount}
              </p>
              <p className="flex items-center justify-center border-b bg-[#F4FFF3] text-[#5F8D4E] text-[13px] font-medium">
                {" "}
                {item.status}
              </p>
            </div>
          </div>
        ))}
      </aside>
    </section>
  );
};

export default ClaimHistory;
