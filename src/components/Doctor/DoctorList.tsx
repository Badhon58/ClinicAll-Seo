"use client";
import React, { Suspense, useEffect, useState } from "react";
import { DoctorProfile } from "./Interface";
import DesktopAccording from "./DesktopAccording";
import { useSearchParams } from "next/navigation";
import MobileAccording from "./MobileAccording";
import Headertag from "@/components/common/Headertag";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import PageLoading from "../Seo/PageLoading";
import { Pagination } from "rsuite";
import { useTranslation } from "react-i18next";
import Services from "../Home/Services";
import Loading from "@/app/loading";

const DoctorList = () => {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("_doc_id_");
  const categoryName = searchParams.get("_catagory_name_");
  const [allDoctors, setAllDoctors] = useState<DoctorProfile[]>([]);
  const [allDoctorCount, setAllDoctorCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNum, setPageNum] = useState<number>(1);
  const { t } = useTranslation();

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      let response;
      if (!doctorId && !categoryName) {
        response = await apiCall(
          Methods.GET,
          `${EndPoint.DOCTOR_FIND_ALL_INFO}/${pageNum}?role=general_doctor&isApproved=true`
        );
        setAllDoctors(response?.data?.doctorInfo);
        setAllDoctorCount(response?.data?.count);
      } else if (doctorId && !categoryName) {
        response = await apiCall(
          Methods.GET,
          `${EndPoint.DOCTOR_FIND_BY_ID}/${doctorId}`
        );
        setAllDoctors([response?.data]);
      } else if (!doctorId && categoryName) {
        response = await apiCall(
          Methods.GET,
          `${EndPoint.DOCTOR_FIND_ALL_INFO}/1?slug=${categoryName}`,
        );
        setAllDoctors(response?.data?.doctorInfo);
        setAllDoctorCount(response?.data?.count);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle pagination

  const handlePageChange: any = async (page: number) => {
    setPageNum(page); // ✅ Update state first
    try {
      setLoading(true);
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.DOCTOR_FIND_ALL_INFO}/${page}`
      );
      setAllDoctors(response.data.doctorInfo);
    } catch (error) {
      console.error("Error changing page:", error);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to top on page load
  const scrollToTop = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    window.scrollTo({ top: scrollHeight * 0.12, behavior: "smooth" });
  };

  useEffect(() => {
    fetchDoctors();
    scrollToTop();
  }, [doctorId, categoryName, pageNum]);

  // Pagination controls

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Services title={t("OurOnlineHealthServices")} />
      </Suspense>
      <section className="min-h-screen p-3 mt-3 mb-10 xl:container xl:mx-auto lg:p-0">
        <div className="pt-4 lg:px-4 xl:px-5 2xl:px-10">
          <Headertag position="text-start">
            {categoryName === "clinical-psychologist"
              ? t("mentalHealthCounsellor")
              : t("followingDoctors")}{" "}
          </Headertag>
        </div>
        <div className="flex justify-between gap-5 mx-auto mt-3 lg:px-4 xl:px-5 2xl:px-10">
          <aside className="lg:flex flex-col gap-5 min-h-[50vh] w-full lg:w-10/12">
            {loading ? (
              <PageLoading />
            ) : allDoctors && allDoctors.length === 0 ? (
              <div className="min-h-[40vh] text-2xl shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)] flex items-center justify-center">
                {t("noDoctorFound")}
              </div>
            ) : (
              allDoctors && allDoctors.map((data: DoctorProfile, index) => {
                if (data.role === "inhouse_doctor") {
                  return null;
                }
                return (
                  <div key={index} className="w-full">
                    <div className="hidden w-full lg:flex">
                      <DesktopAccording data={data} />
                    </div>
                    <div className="flex w-full lg:hidden">
                      <MobileAccording data={data} />
                    </div>
                  </div>
                );
              })
            )}
            {allDoctors && allDoctorCount > 3 && (
              <div className="flex items-center justify-center w-full rounded-lg py-3 mx-auto shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)]">
                <Pagination
                  prev
                  next
                  size="lg"
                  total={allDoctorCount}
                  limit={10}
                  activePage={pageNum}
                  onSelect={handlePageChange}
                />
              </div>
            )}
          </aside>
          <aside className="hidden lg:flex lg:w-[33%] 2xl:w-[37.83%] 2xl:h-[280px] lg:h-[230px] rounded-lg">
            <img
              src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-07112024T110428-business-card--later-head-2-02-1.png"
              alt="Brand image"
              className="w-full h-full"
            />
          </aside>
        </div>
      </section>
    </>
  );
};

export default DoctorList;
