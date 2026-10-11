"use client";
import React, { useEffect, useState } from "react";
import "./Style.css";
import Image from "next/image";
import { useAppSelector } from "@/redux/Hooks";

const RightSidebar = () => {
  const language = useAppSelector((state) => state.languageSlice.language);
  const [isHydrated, setIsHydrated] = useState(false);
  const images = {
    en: "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-30122024T114746-medimartbannerimageenglish.png",
    bn: "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-30122024T114545-medimartbannerimagebangla.png",
  };
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <div className="flex-[3] rounded-xl 2xl:min-h-[540px]  min-h-[300px] lg:min-h-[350px] lg:max-h-[360px] max-h-[300px] 2xl:max-h-[400px]  border  bg-[#FFF4F4] bg-opacity-[0.02]">
      <img
        // src={language === "bn" ? images.bn : images.en}
        src={isHydrated ? (language === "bn" ? images.bn : images.en) : "/"}
        alt="Product Image"
        className="w-full h-full rounded-xl"
      />
    </div>
  );
};

export default RightSidebar;
