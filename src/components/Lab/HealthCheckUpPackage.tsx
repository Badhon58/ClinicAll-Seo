"use client";
import React, { useEffect, useRef, useState } from "react";
import Headertag from "../common/Headertag";
import { useTranslation } from "react-i18next";
import { LabPackage } from "./Interface";
import "./style.css";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import HealthCheckUpSinglePackage from "./HealthCheckUpSinglePackage";
import Loading from "@/app/loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const HealthCheckUpPackage = () => {
  const [alllabPackage, setAllLabPackage] = useState<LabPackage[]>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const boxRef = useRef<HTMLDivElement | null>(null);
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
      const { data } = await apiCall(Methods.GET, EndPoint.LAB_PACKAGE);
      // console.log(data);

      setAllLabPackage(data);
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
    if (!alllabPackage || alllabPackage.length === 0) return;

    const options = alllabPackage.map((_, idx) => `option${idx + 1}`);
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % options.length;
      handleChange(options[index]);
      // console.log(index);
    }, 3000); // every 3s

    return () => clearInterval(interval);
  }, [alllabPackage]);

  useEffect(() => {
    const hash = window.location.hash; // Get #HealthCheckup
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, searchParams.toString()]);

  return loading ? (
    <Loading />
  ) : (
    <section className="mt-8 xl:container xl:mx-auto" id="HealthCheckup">
      <Headertag position="text-center">
        {t("healthcheckUplabpackage")}
      </Headertag>

      <div
        className="flex slide_container   scrollbar-hide overflow-auto mt-2 "
        ref={boxRef}
        onScroll={handleScroll}
      >
        {alllabPackage &&
          alllabPackage.map((item: LabPackage, index) => (
            <div key={index} className="p-3">
              <HealthCheckUpSinglePackage data={item} />
            </div>
          ))}
      </div>
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
    </section>
  );
};

export default HealthCheckUpPackage;
