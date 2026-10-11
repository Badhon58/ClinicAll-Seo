"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ServiceCard = ({
  name,
  desc,
  image,
  slug,
}: {
  name: string;
  desc: string;
  image: string;
  slug: string;
}) => {
  const router = useRouter();
  const handleRouter = () => {
    router.push(`/${slug}`);
  };

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
          <h3 className="text-base font-semibold capitalize">{name}</h3>
          {/* <p className="text-gray-600 text-sm">{desc}</p> */}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
