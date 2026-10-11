"use client";
import Headertag from "@/components/common/Headertag";
import Link from "next/link";
import { services } from "./AllInterface";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Services = ({ title }: { title?: string }) => {
  const { t } = useTranslation();
  return (
    <div className="px-2 mt-3 xl:px-0 lg:mt-6 xl:mt-8 2xl:mt-10 xl:container xl:mx-auto">
      <Headertag position=" text-center">
        {title ? title : t("You May Be Looking For")}
      </Headertag>
      <div
        className="2xl:w-[94%] w-[97%] gap-5 lg:gap-7  mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-3 lg:p-0 lg:px-5 lg:py-5 bg-white min-h-20 rounded-xl mt-8"
        style={{ boxShadow: "0px 4px 1.3px 7px rgba(0, 0, 0, 0.06)" }}
      >
        {services.map((data, index) => (
          <Link
            href={`/${data.slug}`}
            key={index}
            title={`View details about ${data.entitle}`}
          >
            <div className="bg-[#FFF4F4] h-full flex text-center hover:scale-105 group shadow hover:shadow-xl duration-150 lg:px-5 xl:px-1 py-2 2xl:py-[11px] rounded-[10px] flex-col justify-center items-center ">
              <div className="w-14 h-14  flex items-center justify-center rounded-full bg-[#ffdfe5]">
                <Image
                  alt={data.entitle}
                  src={data.icon}
                  width={26}
                  height={26}
                  className=" w-full h-full p-3"
                />
              </div>
              <h3
                className="text-sm font-medium lg:text-base xl:text-lg 2xl:text-xl mt-2"
                id="doctor"
              >
                {t(data.entitle)}
              </h3>
              <p className="text-[10px] lg:text-xs 2xl:text-sm w-[80%] text-[#8F90A6] mx-auto h-12 2xl:h-14 line-clamp-3">
                {" "}
                {t(data.ensubtitle)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
