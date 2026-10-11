"use client";
import { useAppSelector } from "@/redux/Hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Banner = () => {
  const language = useAppSelector((state) => state.languageSlice.language);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <div className="flex justify-center 2xl:mt-10 lg:mt-5">
      {isHydrated ? (
        language == "bn" ? (
          <Image
            src={
              // "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-01122024T125653-post_12_web_banner-bangla.jpg"
              "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-10092025T143150-lab-banner.png"
            }
            alt="Lab Banner image"
            width={1200}
            height={410}
            // layout="responsive"
            className="2xl:w-[1200px] 2xl:h-[500px] lg:w-[950px] lg:h-[350px]"
          />
        ) : (
          <Image
            src={
              "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-01122024T125719-post_12_web_banner-v2.jpg"
            }
            alt="Lab Banner image"
            width={1200}
            height={410}
            // layout="responsive"
            className="2xl:w-[1200px] 2xl:h-[500px] lg:w-[950px] lg:h-[350px]"
          />
        )
      ) : null}
      <span id="lab"></span>
    </div>
  );
};

export default Banner;
