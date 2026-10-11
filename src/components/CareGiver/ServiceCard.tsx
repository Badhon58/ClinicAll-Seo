"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

const ServiceCard = ({
  name,
  bnName,
  desc,
  image,
  slug,
}: {
  name: string;
  bnName: string;
  desc: string;
  image: string;
  slug: string;
}) => {
  const router = useRouter();
  const handleRouter = () => {
    router.push(`allservices/${slug}`);
  };
  const { t, i18n } = useTranslation()

  return (
    <div
      onClick={handleRouter}
      className="bg-white rounded-lg shadow-[-6px_6px_37.4px_0px_#10285130] overflow-hidden hover:scale-105 cursor-pointer transition hover:duration-500 "
    >
      <div className="p-2.5 flex items-center justify-center flex-col">
        <img
          src={image}
          // src={
          //   "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-12082025T132103-first.png"
          // }
          alt={name}
          className="w-52 h-36   rounded-lg"
        />
        <div className="pt-3 text-center">
          {/* <h3 className="text-base font-semibold capitalize">{name}</h3> */}
          <h3 className="text-base font-semibold capitalize">
            {i18n.language === 'bn' ? bnName : name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
