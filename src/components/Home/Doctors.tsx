// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import "./Style.css";
// import { DoctorProfile } from "../Doctor/Interface";
// import Loading from "@/app/loading";
// import Link from "next/link";
// import { apiCall } from "@/lib/axios-client";
// import { EndPoint, Methods } from "@/api/config";
// import { useTranslation } from "react-i18next";
// import Image from "next/image";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

// const Doctors = () => {
//   const router = useRouter();
//   const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { t } = useTranslation();
//   const boxRef = useRef<HTMLDivElement | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const init = async () => {
//     try {
//       setLoading(true);
//       const { data } = await apiCall(Methods.GET, EndPoint.DOCTOR_SPECIALIST);
//       setDoctors(data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNext = (e: React.MouseEvent) => {
//     e.preventDefault();
//     if (boxRef.current && doctors.length > 0) {
//       const width = boxRef.current.clientWidth;
//       const newIndex =
//         currentIndex === doctors.length - 1 ? 0 : currentIndex + 1;
//       setCurrentIndex(newIndex);
//       boxRef.current.scrollTo({
//         left: newIndex * width,
//         behavior: "smooth",
//       });
//     } else {
//       if (boxRef.current) {
//         setCurrentIndex(0);
//         boxRef.current.scrollTo({
//           left: 0,
//           behavior: "smooth",
//         });
//       }
//     }
//   };

//   const handlePrev = (e: React.MouseEvent) => {
//     e.preventDefault();
//     if (boxRef.current && doctors.length > 0) {
//       const width = boxRef.current.clientWidth;
//       const newIndex =
//         currentIndex === 0 ? doctors.length - 1 : currentIndex - 1;
//       setCurrentIndex(newIndex);
//       boxRef.current.scrollTo({
//         left: newIndex * width,
//         behavior: "smooth",
//       });
//     }
//   };
//   const handleClick = (id: string) => {
//     router.push(`/doctorlist?_doc_id_=${id}`);
//   };
//   const handleScroll = () => {
//     if (boxRef.current) {
//       const width = boxRef.current.clientWidth;
//       const scrollLeft = boxRef.current.scrollLeft;
//       const index = Math.round(scrollLeft / width);
//       setCurrentIndex(index);
//     }
//   };
//   useEffect(() => {
//     init();
//   }, []);

//   return loading ? (
//     <Loading />
//   ) : (
//     <section className="xl:container relative  xl:mx-auto  pb-4   lg:pt-12  2xl:px-0 ">
//       <h2 className="text-xl text-center text-[#16020B] pb-3 lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">
//         {t("Meet Our Specialists Doctor & Book Appointment")}
//       </h2>

//       <div
//         ref={boxRef}
//         onScroll={handleScroll}
//         className="flex overflow-y-hidden scroll-smooth overflow-x-hidden  overflow- w-[97%] mx-auto  "
//       >
//         {doctors?.map((item, index) => {
//           return (
//             <div key={index} className="p-2 hover:scale-105 transition">
//               <div
//                 onClick={() => handleClick(item?._id)}
//                 className="size-60 flex flex-col items-center border rounded-[15px] justify-center   cursor-pointer"
//               >
//                 <div className="w-full h-full  flex flex-col justify-between">
//                   <Image
//                     src={item.image}
//                     width={179}
//                     height={225}
//                     alt={item.firstName}
//                     className="h-[185px] w-full rounded-t-[15px]"
//                   />
//                   <div className="bg-gray-700 min-h-14 rounded-b-lg  flex flex-col justify-center items-center">
//                     <p className="text-xs max-w-48 line-clamp-1 tracking-widest font-semibold text-white">
//                       {item.firstName} {item.lastName}
//                     </p>
//                     <p className="flex flex-wrap space-x-2 items-center justify-center text-[10px] font-medium text-white px-3 line-clamp-2">
//                       {item.category.map((cat) => cat.name).join(",  ")}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="text-end  mt-4 ">
//         <Link
//           href={"/doctorlist#doctor"}
//           className="cursor-pointer hover:text-[#E2136E] p-3 text-sm 2xl:text-base"
//         >
//           {t("View All Doctors")}
//         </Link>
//       </div>
//       <button
//         className="absolute p-1.5 bg-white border rounded-full  top-[49%]"
//         onClick={handlePrev}
//       >
//         <FaArrowLeft />
//       </button>
//       <button
//         className="absolute right-0 p-1.5 border bg-white rounded-full  top-[49%]"
//         onClick={handleNext}
//       >
//         <FaArrowRight />
//       </button>
//     </section>
//   );
// };

// export default Doctors;
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./Style.css";
import { DoctorProfile } from "../Doctor/Interface";
import Loading from "@/app/loading";
import Link from "next/link";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Doctors = () => {
  const router = useRouter();
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const init = async () => {
    try {
      setLoading(true);
      const { data } = await apiCall(Methods.GET, EndPoint.DOCTOR_SPECIALIST);
      setDoctors(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Reusable scroll function
  const scrollToIndex = (index: number) => {
    if (boxRef.current) {
      const width = boxRef.current.clientWidth;
      setCurrentIndex(index);
      boxRef.current.scrollTo({
        left: index * width,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (doctors.length > 0) {
      const newIndex = (currentIndex + 1) % doctors.length; // loop back to 0
      scrollToIndex(newIndex);
    }
  };

  const handlePrev = () => {
    if (doctors.length > 0) {
      const newIndex = (currentIndex - 1 + doctors.length) % doctors.length; // loop back to last
      scrollToIndex(newIndex);
      // console.log(newIndex);
    }
  };

  const handleClick = (slug: string) => {

    // console.log(formattedName);
    // return
    router.push(`/doctorprofile/${slug}`);
  };

  const handleScroll = () => {
    if (boxRef.current) {
      // const width = boxRef.current.clientWidth;
      // const scrollLeft = boxRef.current.scrollLeft;
      // const index = Math.round(scrollLeft / width);
      // setCurrentIndex(index);
      if (!boxRef.current) return;
      let width = boxRef.current.clientWidth;
      let scrollLeft = boxRef.current.scrollLeft;

      // Find nearest slide index
      let index = Math.ceil(scrollLeft / width);
      // console.log(index);
      // scrollToIndex(index);
    }
  };

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (doctors) {
      if (doctors.length > 0) {
        const interval = setInterval(() => {
          handleNext();
        }, 4000);

        return () => clearInterval(interval);
      }
    }
  }, [currentIndex, doctors]);

  useEffect(() => {
    init();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <section className="xl:container relative xl:mx-auto pb-4 pt-3 lg:pt-12 2xl:px-0">
      <h2 className="text-xl text-center text-[#16020B] pb-3 lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold">
        {t("Meet Our Specialists Doctor & Book Appointment")}
      </h2>

      <div
        ref={boxRef}
        onScroll={handleScroll}
        // className="flex overflow-y-hidden scroll-smooth overflow-x-hidden w-[97%] mx-auto"
        className="flex slide_container  scrollbar-hide overflow-hidden w-[97%]  mx-auto"
      >
        {doctors?.map((item, index) => {
          return (
            <div key={index} className="p-2 hover:scale-105 transition">
              <div
                onClick={() => handleClick(item.slug)}
                className="size-60 flex flex-col items-center border rounded-[15px] justify-center cursor-pointer"
              >
                <div className="w-full h-full flex flex-col justify-between">
                  <Image
                    src={item.image}
                    width={179}
                    height={225}
                    alt={item.firstName}
                    className="h-[185px] w-full rounded-t-[15px]"
                  />
                  <div
                    title={`${item.firstName} ${item.lastName}`}
                    className="bg-gray-700 min-h-14 rounded-b-lg flex flex-col justify-center items-center"
                  >
                    <p className="text-xs max-w-48 line-clamp-1 tracking-widest font-semibold text-white">
                      {item.firstName} {item.lastName}
                    </p>
                    <p className="flex flex-wrap space-x-2 items-center justify-center text-[10px] font-medium text-white px-3 line-clamp-2">
                      {item.category.map((cat) => cat.name).join(",  ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-end mt-4">
        <Link
          href={"/doctorlist#doctor"}
          className="cursor-pointer hover:text-[#E2136E] p-3 text-sm 2xl:text-base"
        >
          {t("View All Doctors")}
        </Link>
      </div>

      {/* Prev / Next buttons */}
      <button
        className="absolute p-1.5 bg-white border rounded-full md:top-[49%] top-[40%]"
        onClick={handlePrev}
      >
        <FaArrowLeft />
      </button>
      <button
        className="absolute right-0 p-1.5 border bg-white rounded-full md:top-[49%] top-[40%]"
        onClick={handleNext}
      >
        <FaArrowRight />
      </button>
    </section>
  );
};

export default Doctors;
