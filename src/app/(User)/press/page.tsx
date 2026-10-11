"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { data } from "./interface";


const PressRelease = () => {
  const { t } = useTranslation();


  return (
    <section className="xl:container xl:mx-auto 2xl:mt-10 lg:mt-5 min-h-[60vh]">
      <h1 className="text-xl text-[#16020B] lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-center">
        {t("Press Release")}
      </h1>
      <div className="grid  place-content-center lg:grid-cols-4 md:grid-cols-2 gap-3">
        {data.map((item, index) => {
          return (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 group items-center flex flex-col justify-center"
              key={item.id}
            >
              <div className="relative cursor-pointer rounded-md border size-72">
                <Image
                  src={item.image}
                  width={335}
                  height={278}
                  alt={item.title}
                  className="rounded-md group-hover:opacity-75 transition-opacity object-contain w-full h-full "
                />
                {/* <div className="absolute flex items-center justify-center inset-0 bg-black/70 opacity-0 group-hover:opacity-100 rounded-md transition-opacity duration-300">
                  <span className="text-white text-lg font-medium px-4 text-center">
                    {item.tag}
                  </span>
                </div> */}
              </div>
              <p className="text-xs font-normal pt-1">{item.publication}</p>
              <p className="text-sm font-medium mt-2 hover:underline">
                {item.title}
              </p>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default PressRelease;
