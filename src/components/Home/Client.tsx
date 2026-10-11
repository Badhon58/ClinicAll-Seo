"use client";
// import React from "react";
import { ClientBlogData } from "./AllInterface";
import { useTranslation } from "react-i18next";
const Client = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-8 xl:container xl:mx-auto lg:mt-12 lg:pt-0 overflow-hidden">
      <h3 className="text-xl text-center text-[#16020B] lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">
        {t("The Stories We Love To Hear")}
      </h3>
      <div className="mt-4 lg:mt-8 xl:mt-10 rounded-2xl ">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 lg:mx-4  2xl:mx-0 rounded-lg bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T104059-bg1.png')]">
          <div className="flex flex-col items-center justify-center order-2 lg:order-1">
            {ClientBlogData?.slice(0, 3)?.map((item, index) => (
              <div
                className="flex flex-col items-center justify-center p-3 2xl:p-5 space-x-4 lg:flex-row  animationblock1"
                key={index}
              >
                <video
                  src={item.video}
                  width="100%"
                  className="lg:w-2/6 w-5/6  2xl:h-[150px]  h-[180px] lg:h-[130px]  object-contain"
                  controls
                >
                  <source src={item.video} type="video/mp4" />
                </video>
                <div className="lg:w-4/6">
                  <p className="mt-3 text-base font-medium text-[#16020B]   ">
                    {t(`client_blog.${index}.title`)}
                  </p>
                  <p className="text-sm  text-[#6B7588] font-medium 2xl:mt-3 mt-1  tracking-[0.28] line-clamp-3">
                    {t(`client_blog.${index}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center lg:order-2 order-1 bg-cover rounded-lg xl:w-full rounded-l-xl 2xl:min-h-[57vh] min-h-[50vh]  lg:min-h-[70vh] xl:min-h-[65vh] ">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/VgEN7qh0tXM?si=LQUwsUiQpDf29Pn0"
              title="YouTube video player"
              frameBorder="0"
              className="object-fill w-full h-full md:p-5 p-1 rounded-md"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
// <div className="flex items-center justify-center bg-cover rounded-lg xl:w-full rounded-l-xl 2xl:min-h-[64vh] min-h-[70vh] ">
//   <video
//     autoPlay
//     loop
//     muted
//     playsInline
//     className="object-fill w-full rounded-r-xl 2xl:h-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]"
//     controls
//   >
//     <source
//       src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T114540-client.mp4"
//       // src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-15052025T162657-whatsapp-video-2025-05-06-at-7.27.58-pm.mp4"
//       type="video/mp4"
//     />
//     Your browser does not support the video tag.
//   </video>
