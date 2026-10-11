"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { BannerItem, PlatformData } from "./AllInterface";
import HeroSection1 from "./HeroSection1";
import ImageComponent from "./ImageComponent";
import PageLoading from "../Seo/PageLoading";
type ComponentSliderProps = {
  component: React.ComponentType<any>[];
};
const ComponentSlider = ({ allData }: { allData: PlatformData | null }) => {
  const [componentIndex, setComponentIndex] = useState(0);
  if (!allData) return <PageLoading />;

  // Sort banners by order
  const sortedBanners: BannerItem[] = allData.banner
    .slice()
    .sort((a, b) => a.order - b.order)
    .filter((item) => item.isActive)

  const prevFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setComponentIndex((index) =>
      index === 0 ? sortedBanners.length - 1 : index - 1
    );
  };

  const nextFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setComponentIndex((index) =>
      index === sortedBanners.length - 1 ? 0 : index + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setComponentIndex((index) =>
        index === sortedBanners.length - 1 ? 0 : index + 1
      );
    }, 4000);
    return () => clearInterval(intervalId);
  }, [sortedBanners.length]);
  return (
    <div className="relative ">
      {" "}
      <div className="flex w-full h-full overflow-hidden">
        {sortedBanners && sortedBanners.map((Comp, index) => {
          return (
            <div
              key={index}
              className="block object-contain w-full h-full flex-shrink-0 flex-grow-0 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(${-componentIndex * 100}%)` }}
            >
              {Comp.data ? (
                <HeroSection1 />
              ) : (
                <ImageComponent image={Comp.image} resimage={Comp.resimage} />
              )}
            </div>
          );
        })}
      </div>
      <button
        className="absolute p-1.5 bg-white rounded-full lg:top-[46%] top-[48%]"
        onClick={prevFunction}
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextFunction}
        className="absolute right-0 p-1.5 bg-white rounded-full lg:top-[46%] top-[48%]"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ComponentSlider;
