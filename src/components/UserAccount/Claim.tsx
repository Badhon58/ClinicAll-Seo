"use client";
import { getUserID } from "@/lib/authHandler";
import React, { useEffect, useState } from "react";
import { Package } from "./Interface";
import Link from "next/link";
import moment from "moment";
import ClaimForm from "./ClaimForm";
import { useAppSelector } from "@/redux/Hooks";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import PageLoading from "../Seo/PageLoading";
import { useTranslation } from "react-i18next";
const isPastDate = (date: any) => {
  return moment(date).isBefore(moment());
};
const Claim = () => {
  const [loading, setLoading] = useState(true);
  const [packageInfo, setPackageInfo] = useState<Package>();
  const [isDatePast, setIsDatePast] = useState(true);
  const [activeClaim, setActiveClaim] = useState(true);
  const [userId, setuserId] = useState<string>("");
  const language = useAppSelector((state) => state.languageSlice.language);
  const [isHydrated, setIsHydrated] = useState(false);
  const { t } = useTranslation();

  const init = async () => {
    try {
      setLoading(true);
      setIsHydrated(true);
      const userId: any = await getUserID();
      const { data } = await apiCall(
        Methods.GET,
        `${EndPoint.GET_BOOK_PACKAGE}/${userId}`
      );
      setuserId(userId);
      setPackageInfo(data);
      const isDatePast = isPastDate(data?.packageExpiredDate);
      setIsDatePast(isDatePast);
      // console.log(data);

      if (data.packageId.type === "telemedicine") {
        setActiveClaim(false);
      }
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
    <PageLoading />
  ) : (
    <div className="min-h-[80vh] xl:container xl:mx-auto px-2 lg:pt-3 xl:pt-6 2xl:pt-8 lg:px-2 xl:px-4 2xl:px-8 shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)]">
      <p className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-[#3A3A3C]">
        {t("claimJourney")}
      </p>
      <p className="text-sm mt-1 font-semibold text-[#C7C9D9]">
        {t("claimSummary")}
      </p>
      <section className="mt-3">
        {packageInfo === undefined ? (
          <div className="">
            {isHydrated ? (
              language == "bn" ? (
                <>
                  <p>
                    আপনি এখনো কোনো প্যাকেজ ক্রয় করেননি। ক্লেইম প্রক্রিয়া
                    চালিয়ে যেতে আপনাকে অবশ্যই একটি প্যাকেজ ক্রয় করতে হবে।{" "}
                  </p>
                  <Link href={"/healthPackage"} className="text-[#E2136E]">
                    প্যাকেজ ক্রয় করুন।
                  </Link>
                </>
              ) : (
                <>
                  <p>
                    {" "}
                    You have not purchased any package yet. To proceed with the
                    claim process, you must purchase a package.
                  </p>
                  <Link href={"/healthPackage"} className="text-[#E2136E]">
                    Buy Package
                  </Link>
                </>
              )
            ) : null}
          </div>
        ) : isDatePast ? (
          <div className="">
            {isHydrated
              ? language == "bn"
                ? "আপনার প্যাকেজ ইতোমধ্যে মেয়াদ উত্তীর্ণ হয়েছে।"
                : "Your package has already expired"
              : null}{" "}
          </div>
        ) : activeClaim ? (
          <ClaimForm
            package_Id={packageInfo?._id}
            packageTitle={packageInfo?.packageTitle}
            userId={userId}
            language={language}
            isHydrated={isHydrated}
            phone={packageInfo.userId.phone}
          />
        ) : (
          <div className="text-[#E2136E] capitalize">
            {isHydrated
              ? language == "bn"
                ? `${packageInfo?.packageId.type} এ ক্লেম অন্তর্ভুক্ত নয় `
                : `You are not eligible to claim for ${packageInfo?.packageId?.type}`
              : null}
          </div>
        )}
      </section>
    </div>
  );
};

export default Claim;
