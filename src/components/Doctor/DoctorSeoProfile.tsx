"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { EndPoint, Methods } from '@/api/config'
import Loading from '@/app/loading'
import { apiCall } from '@/lib/axios-client'
import React, { useEffect, useState } from 'react'
import { DateSlot2, DoctorProfile, isPastTimeSlot } from './Interface'
import Image from 'next/image'
import { Trans, useTranslation } from 'react-i18next'
import Slider from "react-slick";
import moment from 'moment'
import { useRouter } from 'next/navigation'


const DoctorSeoProfile = ({ slugString }: { slugString: string }) => {
  const [loading, setLoading] = useState(false)
  const [Doctor, setMyDoctor] = useState<DoctorProfile>()
  const { t, i18n } = useTranslation();
  const [allDate, setAllDate] = useState<DateSlot2[]>();
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [timeselect, setTimeselect] = useState<string>();
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter()

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
      setButtonLoading(true);

      var selectedDate;
      if (selectedDateIndex !== null && allDate) {
        selectedDate = allDate[selectedDateIndex]?.date; // Get the date based on the index
      }
      // console.log("THe Index is ", selectedDateIndex);
      // console.log("The Time is ", timeselect);
      // console.log("THe Date is ", selectedDate);
      router.replace(`/doctorlist/${Doctor?._id}/${selectedDate}/${timeselect}`);
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  // Initial Function Call
  const init = async () => {
    try {
      setLoading(false)
      const decodedName = decodeURIComponent(slugString);
      const value = {
        slug: decodedName,
      };
      // console.log(value);

      const res = await apiCall(
        Methods.POST,
        EndPoint.SEARCH_DOCTOR,
        value
      );

      const data: any = res.data[0];
      // console.log(data);

      setMyDoctor(data)

      const currentDate = moment(); // Get current date and time

      const upcomingSlots: DateSlot2[] = data?.dateSlot?.filter((slot: any) => {
        const slotDate = moment(slot?.date, "YYYY-MM-DD"); // Parse date correctly

        return (
          slotDate.isSame(currentDate, "day") || slotDate.isAfter(currentDate)
        );
      });
      setAllDate(upcomingSlots);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }



  useEffect(() => {
    init()
  }, [])
  return loading && Doctor === null ? <Loading /> : (
    <div className="min-h-screen bg-gray-50 px-3 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* =====PROFILE HEADER====== */}
        <div className="overflow-hiddenrounded-3xl bg-white shadow-sm ring-1 ring-gray-100">

          {/* Top background */}
          <div className="h-28 bg-gradient-to-r from-[#EB148C] via-[#c2187a] to-[#EB148C] sm:h-36" >

          </div>


          <div className="px-4 pb-6 sm:px-8">

            <div className="relative -mt-14 flex flex-col items-center gap-5 sm:-mt-16 sm:flex-row sm:items-end">

              {/* Doctor? Image */}
              <div className="relative shrink-0">
                <img
                  src={Doctor?.image}
                  alt={`${Doctor?.firstName} ${Doctor?.lastName}`}
                  className="
                                        h-28 w-28 rounded-2xl
                                        border-4 border-white
                                        bg-white object-cover
                                        shadow-lg
                                        sm:h-32 sm:w-32
                                    "
                />

                {/* Online / available indicator */}
                <span
                  className={`
                                        absolute bottom-2 right-2
                                        h-4 w-4 rounded-full
                                        border-2 border-white
                                        ${Doctor?.isAvailable
                      ? "bg-green-500"
                      : "bg-gray-400"
                    }
                                    `}
                />
              </div>

              {/* Doctor? name */}
              <div className="min-w-0 flex-1 text-center sm:pb-1 sm:text-left">
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {Doctor?.firstName} {Doctor?.lastName}
                  </h1>

                  {Doctor?.bmdcRegistered && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      ✓ BMDC Verified
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm font-medium text-gray-500">
                  {Doctor?.role
                    ?.replaceAll("_", " ")
                    .replace(/\b\w/g, (c) =>
                      c.toUpperCase()
                    )}
                </p>
              </div>

              {/* Status */}
              <div className="sm:pb-1">
                <span
                  className={`
                                        inline-flex items-center gap-2
                                        rounded-full px-4 py-2
                                        text-sm font-medium
                                        ${Doctor?.isActive
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                    }
                                    `}
                >
                  <span
                    className={`
                                            h-2 w-2 rounded-full
                                            ${Doctor?.isActive
                        ? "bg-green-500"
                        : "bg-red-500"
                      }
                                        `}
                  />

                  {Doctor?.isActive
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* =================================================
                        LEFT / MAIN CONTENT
                    ================================================== */}
          <div className="space-y-6 lg:col-span-2">

            {/* About Doctor? */}
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    About Doctor?
                  </h2>

                  <p className="text-xs text-gray-400">
                    Professional information
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm leading-7 text-gray-600">
                {Doctor?.personalDetails ? (
                  Doctor?.personalDetails
                    .split("\r\n")
                    .map(
                      (paragraph, index) =>
                        paragraph.trim() && (
                          <p key={index}>
                            {paragraph}
                          </p>
                        )
                    )
                ) : (
                  <p>
                    No professional information has been
                    added yet.
                  </p>
                )}
              </div>
            </section>

            {/* Education / Qualification */}
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                  🎓
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Education & Qualification
                  </h2>

                  <p className="text-xs text-gray-400">
                    Medical qualifications
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm font-medium leading-7 text-gray-700">
                  {Doctor?.degree}
                </p>
              </div>
            </section>

            {/* Work Experience */}
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                  💼
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Professional Experience
                  </h2>

                  <p className="text-xs text-gray-400">
                    Career history
                  </p>
                </div>
              </div>

              <div className="relative space-y-6 pl-6">

                {/* Timeline line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200" />

                {Doctor?.workDetails?.map(
                  (work, index) => (
                    <div
                      key={index}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <span
                        className="
                                                    absolute -left-[25px]
                                                    top-1.5 h-3 w-3
                                                    rounded-full
                                                    border-2 border-white
                                                    bg-blue-500
                                                    ring-2 ring-blue-100
                                                "
                      />

                      <div>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {work.designation}
                            </h3>

                            <p className="mt-1 text-sm font-medium text-gray-600">
                              {work.organization}
                            </p>
                          </div>

                          <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                            {work.startMonth}{" "}
                            {work.startYear}
                            {" - "}
                            {work.isCurrentlyWorking
                              ? "Present"
                              : `${work.endMonth} ${work.endYear}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Time Section  */}
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6">
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
                        disabled={!timeselect || buttonLoading}
                        className={`px-14 py-2 font-medium text-sm text-white rounded-md ${!timeselect ? "bg-[#f58dc6] " : "bg-[#EB148C] "
                          }`}
                      >
                        {buttonLoading ? "Loading..." : t("Continue")}
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
            </section>
          </div>

          {/* =================================================
                        RIGHT SIDEBAR
                    ================================================== */}
          <div className="space-y-6">

            {/* Consultation Card */}
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">

              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-gray-900">
                  Consultation
                </h2>

                <span className="rounded-lg bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                  Available
                </span>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-5">
                <p className="text-sm text-gray-500">
                  Consultation Fee
                </p>

                <div className="mt-1 flex items-end gap-1">
                  <span className="text-3xl font-bold text-gray-900">
                    ৳{Doctor?.visitFee}
                  </span>

                  <span className="mb-1 text-sm text-gray-500">
                    / visit
                  </span>
                </div>
              </div>

              {/* Future time slot area */}
              {/* <div className="mt-4 rounded-xl border border-dashed border-gray-200 p-4 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
                  🕐
                </div>

                <p className="mt-2 text-sm font-medium text-gray-700">
                  Appointment schedule
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Time slots will appear here
                </p>
              </div> */}
            </section>

            {/* Specialization */}
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  🩺
                </div>

                <h2 className="font-bold text-gray-900">
                  Specialization
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {Doctor?.category && Doctor?.category?.length > 0 ? (
                  Doctor?.category.map((category) => (
                    <span
                      key={category._id}
                      className="
                                                rounded-full
                                                bg-gray-50
                                                px-3 py-1.5
                                                text-xs font-medium
                                                text-gray-600
                                            "
                    >
                      {category.name}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">
                    No specialization added.
                  </p>
                )}
              </div>
            </section>

            {/* Doctor? Details */}
            <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">

              <h2 className="mb-4 font-bold text-gray-900">
                Doctor? Details
              </h2>

              <div className="space-y-4">

                {/* Experience */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                    ⏱️
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Experience
                    </p>

                    <p className="text-sm font-semibold text-gray-800">
                      {Doctor?.yearsOfExperience} Years
                    </p>
                  </div>
                </div>

                {/* BMDC */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                    ✓
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      BMDC Registration
                    </p>

                    <p className="text-sm font-semibold text-gray-800">
                      {Doctor?.bmdc}
                    </p>
                  </div>
                </div>

                {/* Hospital */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                    🏥
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">
                      Hospital
                    </p>

                    <p className="text-sm font-semibold text-gray-800">
                      {Doctor?.hospital}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}

          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorSeoProfile