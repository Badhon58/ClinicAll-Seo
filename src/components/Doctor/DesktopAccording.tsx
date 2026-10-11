"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import { DateSlot2, DoctorProfile, isPastTimeSlot } from "./Interface";
import DoctorListProfile from "./DoctorListProfile";
import { Trans, useTranslation } from "react-i18next";
// import DoctorListTimeSlot3 from "./DoctorListTimeSlot3";
import { useRouter } from "next/navigation";
import moment from "moment";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
const DesktopAccording = ({ data }: { data: DoctorProfile }) => {
  const [according, setAccording] = useState(false);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [allDate, setAllDate] = useState<DateSlot2[]>();
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [timeselect, setTimeselect] = useState<string>();
  const [buttonloading, setButtonloading] = useState(false);
  const router = useRouter();

  //Next arrow button click
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          background: "#e5e7eb",
          width: "30px",
          height: "30px",
          borderRadius: "9999px",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onClick}
      />
    );
  }

  //Prev arrow button click
  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          background: "#e5e7eb",
          width: "30px",
          height: "30px",
          borderRadius: "9999px",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onClick}
      />
    );
  }

  //Slick Set up
  const settings = {
    // infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    beforeChange: (current: any, next: any) => {
      setSelectedDateIndex(current);
      setTimeselect("");
    },
    afterChange: (current: any) => {
      setSelectedDateIndex(current);
      setTimeselect("");
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          // infinite: true,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setButtonloading(true);

      var selectedDate;
      if (selectedDateIndex !== null && allDate) {
        selectedDate = allDate[selectedDateIndex]?.date; // Get the date based on the index
      }
      // console.log("THe Index is ", selectedDateIndex);
      // console.log("The Time is ", timeselect);
      // console.log("THe Date is ", selectedDate);
      router.replace(`doctorlist/${data._id}/${selectedDate}/${timeselect}`);
    } catch (error) {
      console.log(error);
    } finally {
      setButtonloading(false);
    }
  };

  const handleAccording = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAccording(!according);
  };

  //   init function called
  const init = async () => {
    try {
      setLoading(true);
      const currentDate = moment(); // Get current date and time

      const upcomingSlots: DateSlot2[] = data?.dateSlot?.filter((slot) => {
        const slotDate = moment(slot?.date, "YYYY-MM-DD"); // Parse date correctly

        return (
          slotDate.isSame(currentDate, "day") || slotDate.isAfter(currentDate)
        );
      });
      setAllDate(upcomingSlots);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, [data]);
  return loading ? (
    "Loading..."
  ) : (
    <div className="rounded-xl bg-white hover:bg-[#FFF4F4] hover:bg-opacity-40 shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] w-full">
      <div className="flex  px-6 py-5 ">
        <DoctorListProfile data={data} />
        <div className="flex flex-col space-y-2 justify-end md:w-[20%] lg:w-3/12  ">
          <button className="text-[#16020B] text-lg font-medium">
            {allDate && allDate?.length >= 1 ? t("freeAvailable") : ""}
          </button>
          <button
            onClick={handleAccording}
            className="bg-[#EB148C] w-[180px] text-base font-semibold px-2 xl:px-4 2xl:px-6 py-3 rounded-lg text-white"
          >
            {t("bookNow")}
          </button>
        </div>
      </div>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out  ${according
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div
          className={`overflow-hidden ${according ? " px-6 " : "transition-all duration-300 ease-in-out"
            }`}
        >
          <div className="">
            <span className="text-lg font-medium text-[#16020B]">
              {t("aboutDoctor")}
            </span>
            <p>{data.personalDetails}</p>
          </div>

          {/* <DoctorListTimeSlot data={data} /> */}
          {/* <DoctorListTimeSlot2 data={data}/> */}
          {/* <DoctorListTimeSlot3 data={data} /> */}
          <div className="min-h-20 border-t border-[#6B7588] my-2 ">
            {allDate && allDate.length > 0 ? (
              <>
                <div className="slider-container lg:w-11/12 mx-auto mt-4 ">
                  <Slider {...settings}>
                    {allDate?.map((item, index) => {
                      // console.log(item);

                      if (i18n.language === "bn") {
                        moment.locale("bn");
                      } else {
                        moment.locale("en");
                      }
                      const formattedDate = moment(item.date).format(
                        "MMMM DD, YYYY"
                      );
                      const slotlength = item?.timeSlots?.length;
                      return (
                        <div
                          key={index}
                          className={`min-h-6 py-3 flex flex-col cursor-pointer ${selectedDateIndex === index
                              ? "border-b-4  border-[#EB148C] transition duration-700"
                              : "border-b-4 border-[#F0F0F5]"
                            }`}
                        >
                          <p
                            className={`font-medium text-base text-center ${index === selectedDateIndex
                                ? "text-[#EB148C]"
                                : "text-[#16020B]"
                              } `}
                          >
                            {formattedDate}
                          </p>
                          <p className="text-center text-sm text-[#6B7588] font-normal">
                            {slotlength} slots available
                          </p>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
                <div className="min-h-52">
                  {allDate?.[selectedDateIndex]?.timeSlots &&
                    Object.entries(
                      allDate[selectedDateIndex]?.timeSlots.reduce(
                        (acc: Record<string, string[]>, timeSlot) => {
                          if (timeSlot?.period) {
                            acc[timeSlot.period] = acc[timeSlot.period] || [];
                            acc[timeSlot.period].push(timeSlot.time || "");
                          }
                          return acc;
                        },
                        {}
                      )
                    ).map(([period, times]) => {
                      const availableTimes = times.filter(
                        (time) =>
                          !isPastTimeSlot(
                            allDate[selectedDateIndex].date,
                            time
                          )
                      );

                      // If no slots are available for this period,
                      // remove the entire period
                      if (availableTimes.length === 0) {
                        return null;
                      }
                      return (
                        <div
                          key={period}
                          className={`flex space-x-5 py-3  border-[#6B7588] border-b ${period == "afternoon" ? "border-b" : ""
                            }`}
                        >
                          <h3 className="capitalize w-[100px] lg:w-[10%] text-base">
                            {period == "afternoon" ? "AfterNoon" : period}
                          </h3>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 2xl:gap-4 w-11/12">
                            {times
                              ?.filter((time) => !isPastTimeSlot(allDate[selectedDateIndex].date, time))
                              .map((time, index) => (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setTimeselect(time);
                                  }}
                                  className={`py-2 px-1 text-[13px] text-center rounded-md ${timeselect === time
                                    ? "border bg-[#EB148C] text-white border-white"
                                    : "border border-[#6B7588]"
                                    }`}
                                  key={index}
                                >
                                  {time}
                                </button>
                              ))}
                          </ul>
                        </div>
                      )
                    })}
                </div>
                <div className="flex justify-end items-end mb-3">
                  <button
                    onClick={handleSubmit}
                    disabled={!timeselect || buttonloading}
                    className={`px-14 py-2 font-medium text-sm text-white rounded-md ${!timeselect ? "bg-[#f58dc6] " : "bg-[#EB148C] "
                      }`}
                  >
                    {buttonloading ? "Loading..." : t("Continue")}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[30vh]">
                <Image
                  src={
                    "http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-21042025T125210-group-1.png"
                  }
                  width={112}
                  height={100}
                  alt="NoDateSlotFound"
                />
                <p className="my-1 text-xl font-semibold text-[#EB148C]">
                  {t("schedule")}
                </p>
                <p className="text-center">
                  {" "}
                  <Trans
                    i18nKey="scheduledesc"
                    components={{
                      br: <br />,
                    }}
                  />
                </p>
                {/* <Link href="/contact">Continue</Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopAccording;
