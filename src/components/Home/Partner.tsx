"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { Trans, useTranslation } from "react-i18next";

interface testCenter {
  organization: string;
  address: string;
  discount: number;
  image: string;
}

var settings = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: true,
  speed: 20000,
  autoplaySpeed: 1,
  cssEase: "linear",
  pauseOnHover: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1180,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 760,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};
const Partner = () => {
  const [LabPartner, setLabPartner] = useState<testCenter[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const init = async () => {
    try {
      setLoading(true);
      const { data } = await apiCall(
        Methods.GET,
        EndPoint.LAB_TEST_CENTER_FIND_ALL + "?limit=20"
      );
      setLabPartner(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return loading ? (
    "loading.."
  ) : (
    <section className=" xl:container xl:mx-auto my-3 lg:my-5">
      <div className="text-center ">
        <h2 className="text-xl text-center text-[#16020B] lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">
          {t("Hospital Partners")}
        </h2>
      </div>
      <Slider {...settings}>
        {LabPartner?.map((item, index) => (
          <div className="p-4" key={index}>
            <div
              key={index}
              className="flex items-center space-x-2 h-[170px] justify-between  p-4  rounded-lg border"
            >
              <div className="flex flex-col justify-around w-full h-full ">
                <h3 className="text-lg font-bold text-pink-600 line-clamp-2">
                  {item.organization}
                </h3>
                <div>
                  <p className="text-[#16020B] line-clamp-2">{item.address}</p>
                  <p className="mt-1 text-[#16020B]">
                    <Trans
                      i18nKey="discount_text"
                      values={{ count: item.discount }}
                      components={{ bold: <span className="font-medium" /> }}
                    />
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link
                    href={"/discount"}
                    className="py-1 px-4 hover:bg-[#E2136E] border  hover:border-[#E2136E] font-normal rounded-md text-[14px] hover:text-white"
                  >
                    {t("View More")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Partner;
