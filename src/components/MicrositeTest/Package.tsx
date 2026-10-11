"use client";
import React, { useEffect, useRef, useState } from "react";
import { PackageInterface } from "./Interface";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import NewSinglePackage from "./NewSinglePackage";
import "./style.css";
import { usePathname } from "next/navigation";
import PageLoading from "../Seo/PageLoading";
import Loading from "@/app/loading";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const Package = () => {
  const { t } = useTranslation();
  const [allPackage, setAllPackage] = useState<PackageInterface[]>();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const boxRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [enableAutoScroll, setEnableAutoScroll] = useState(true);
  // console.log(pathname);

  const handleChange = (name: string) => {
    setSelectedOption(name);

    if (!boxRef.current) return;
    let width = boxRef.current.clientWidth;

    if (name === "option1") {
      boxRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else if (name === "option2") {
      boxRef.current.scrollTo({ left: width, behavior: "smooth" });
    } else if (name === "option3") {
      boxRef.current.scrollTo({ left: width * 2, behavior: "smooth" });
    } else if (name === "option4") {
      boxRef.current.scrollTo({ left: width * 3, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (!boxRef.current) return;
    let width = boxRef.current.clientWidth;
    let scrollLeft = boxRef.current.scrollLeft;

    // Find nearest slide index
    let index = Math.ceil(scrollLeft / width);
    // console.log(index);

    if (index === 0) setSelectedOption("option1");
    else if (index === 1) setSelectedOption("option2");
    else if (index === 2) setSelectedOption("option3");
    else if (index === 3) setSelectedOption("option4");
  };

  const init = async () => {
    try {
      setLoading(true);
      if (pathname.endsWith("/package")) {
        setEnableAutoScroll(false);
      }
      const response = await apiCall(
        Methods.GET,
        EndPoint.PACKAGE_FIND_ALL +
          `?showHome=true&packageType=b2c&isInstant=false`
      );

      setAllPackage(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!enableAutoScroll || !allPackage || allPackage.length === 0) return;

    const options = allPackage.map((_, idx) => `option${idx + 1}`);
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % options.length; // loop back
      handleChange(options[index]);
    }, 3000); // every 3s

    return () => clearInterval(interval);
  }, [allPackage]); // re-run when data loads

  return loading ? (
    <PageLoading />
  ) : (
    <section className="px-2 mt-1 pb-4">
      <div className="flex justify-between items-center">
        <p className="pt-2 text-base font-medium">{t("healthpackagetit")}</p>
        {pathname.endsWith("/package") ? (
          null
        ) : (
          <Link href="/microsite-test/package" className="text-xs font-medium">
            {t("View All Package")}
          </Link>
        )}
      </div>
      <div
        ref={boxRef}
        onScroll={enableAutoScroll ? handleScroll : undefined}
        className={`${
          enableAutoScroll
            ? "flex slide_container  scrollbar-hide overflow-auto "
            : "grid place-items-center grid-cols-1 gap-4"
        }`}
      >
        {allPackage && allPackage.length > 0 ? (
          allPackage?.map((data, index) => {
            return (
              <div key={index} className="p-3">
                <NewSinglePackage data={data} />
              </div>
            );
          })
        ) : (
          <div className="flex items-center w-full h-[200px] justify-center">
            <Loading />
          </div>
        )}
      </div>
      {enableAutoScroll && (
        <div className="flex 2xl:hidden items-center justify-center space-x-3 mt-3">
          <input
            type="radio"
            className="accent-pink-500 2xl:hidden block cursor-pointer"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={() => handleChange("option1")}
          />
          <input
            type="radio"
            className="accent-pink-500 2xl:hidden block cursor-pointer"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={() => handleChange("option2")}
          />
          <input
            type="radio"
            className="accent-pink-500 md:hidden block cursor-pointer"
            value="option3"
            checked={selectedOption === "option3"}
            onChange={() => handleChange("option3")}
          />
          <input
            type="radio"
            className="accent-pink-500 sm:hidden block cursor-pointer "
            value="option4"
            checked={selectedOption === "option4"}
            onChange={() => handleChange("option4")}
          />
        </div>
      )}
    </section>
  );
};

export default Package;
