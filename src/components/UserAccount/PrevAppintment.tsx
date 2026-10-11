"use client";
import { getUserID } from "@/lib/authHandler";
import React, { useEffect, useState } from "react";
import { Appointment } from "./Interface";
import Prescription from "./Prescription";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import PageLoading from "../Seo/PageLoading";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const PrevAppintment = () => {
  const [loading, setLoading] = useState(true);
  const [allUserAppoitment, setAllUserAppoitment] = useState<Appointment[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const init = async () => {
    try {
      setLoading(true);
      let userId;

      switch (pathname) {
        case "/microsite":
          const cookieUser = JSON.parse(Cookies.get("user") ?? "{}");
          if (Object.keys(cookieUser).length != 0) {
            userId = cookieUser.id;
          }
          apiCall(Methods.POST, EndPoint.VERIFY_JWT, {
            token: cookieUser.token,
          }).then((resp) => {
            if (!resp.success) {
              if (typeof window !== "undefined") {
                // window.tokenStatus?.(false, "Invalid Token");
                window.Android?.tokenStatus(false, "Invalid Token");
                if (
                  window.webkit &&
                  window.webkit.messageHandlers &&
                  window.webkit.messageHandlers.onTokenStatus
                ) {
                  window.webkit.messageHandlers.onTokenStatus.postMessage({
                    status: false,
                    message: "Invalid Token",
                  });
                } else {
                  console.log("iOS WebView not available");
                }
              }
              Cookies.remove("user");
              // router.replace("/microsite");
              location.replace("/microsite");
              console.log("After route push");
              // return location.replace("/microsite");
            } else {
              console.log("Token valid!");
            }
          });
          break;
        case "/microsite-test":
          userId = await getUserID();
          break;
        default:
          userId = await getUserID();
          break;
      }

      await apiCall(
        Methods.GET,
        `${EndPoint.USER_APPOINTMENT_HISTORY}/${userId}`
      )
        .then((response) => {
          setAllUserAppoitment(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
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
    <PageLoading />
  ) : (
    <section className="min-h-[70vh] xl:container xl:mx-auto px-2 lg:pt-3 xl:pt-6 2xl:pt-8 lg:px-2 xl:px-4 2xl:px-8 shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)]">
      <p className="2xl:text-2xl text-xl font-semibold mb-4">
        {t("Appoitment History")}
      </p>
      <aside className="min-w-full bg-white hidden md:block">
        <div className="grid grid-cols-5 bg-[#fff4f4]">
          <p className="py-2 px-4 text-center text-base font-semibold">
            {t("aboutDoctor")}
          </p>
          <p className="py-2 px-4 text-center  text-base font-semibold">
            {t("PatientInfo")}
          </p>
          <p className="py-2 px-4 text-center text-base font-semibold">
            {t("Date&Time")}
          </p>
          <p className="py-2 px-4 text-center text-base font-semibold">
            {t("Prescription")}
          </p>
          <p className="py-2  text-center text-base font-semibold">
            {t("AppointmentStatus")}
          </p>
          {/* <p className="py-2 px-4 text-center text-base font-semibold">
            Make Call
          </p> */}
        </div>

        {allUserAppoitment?.length > 0 ? (
          allUserAppoitment?.map((item, index) => (
            <div
              key={index}
              className="grid md:grid-cols-5  border-b border-x "
            >
              <p className="flex  justify-center items-center  text-sm font-medium text-[#6b7588]">
                {item?.doctor?.firstName} {item?.doctor?.lastName}
              </p>
              <p className="flex  justify-center items-center  text-sm font-medium text-[#6b7588] border-x">
                <span>{item?.fullName}</span>
                {/* <span className="text-xs"> {item.phone}</span> */}
              </p>
              <p className="flex justify-center flex-col items-center text-sm font-medium text-[#6b7588] py-2">
                <span>{moment(item?.date).format("Do MMMM YYYY")}</span>
                <span className="text-sm">{item?.time}</span>
              </p>
              <Prescription item={item} />
              <p className={`capitalize p-1.5 `}>
                <span
                  className={` flex justify-center items-center 
                 ${
                   item.paymentStatus == "pending"
                     ? " bg-[#ffe2e5] text-[#f64e60] font-medium h-full w-full "
                     : " text-[#5f8d4e] bg-[#f4fff3] font-medium h-full w-full"
                 }`}
                >
                  {item?.paymentStatus}
                </span>
              </p>
              {/* <button
                onClick={() => makeCall(item?.doctor?._id)}
                className="bg-green-500 px-4 py-1 text-white rounded"
              >
                Call
              </button> */}
            </div>
          ))
        ) : (
          <div className="min-h-[70vh]">
            <p>No Data Found</p>
          </div>
        )}
      </aside>
      <aside className="block md:hidden">
        {allUserAppoitment ? (
          allUserAppoitment?.map((item, index) => (
            <div
              className="grid grid-cols-3 mb-2 pb-2 border-b border-black"
              key={index}
            >
              <div className="grid grid-rows-5 col-span-1 bg-[#fff4f4]">
                <p className="py-1.5 flex items-center justify-center border-y text-sm">
                  {" "}
                  {t("aboutDoctor")}
                </p>
                <p className="py-1.5 flex items-center justify-center border-y text-sm">
                  {" "}
                  {t("PatientInfo")}
                </p>
                <p className="py-1.5 flex items-center justify-center border-y text-sm">
                  {" "}
                  {t("Date&Time")}
                </p>
                <p className="py-1.5 flex items-center justify-center border-y text-sm">
                  {" "}
                  {t("Prescription")}
                </p>
                <p className="py-1.5 flex items-center justify-center border-y text-sm text-center">
                  {" "}
                  {t("AppointmentStatus")}
                </p>
              </div>
              <div className="grid grid-rows-5 col-span-2">
                <p className=" flex items-center justify-center  border-y text-xs">
                  {" "}
                  {item?.doctor?.firstName} {item?.doctor?.lastName}
                </p>
                <p className=" flex items-center justify-center  border-y text-xs">
                  {" "}
                  {item?.fullName}
                </p>
                <p className="flex justify-center flex-col items-center text-xs font-medium text-[#6b7588] py-2">
                  <span>{moment(item?.date).format("Do MMMM YYYY")}</span>
                  <span>{item?.time}</span>
                </p>
                <Prescription item={item} />
                <p
                  className={`capitalize flex justify-center text-sm border-b items-center ${
                    item.paymentStatus == "pending"
                      ? "px-2 py-1 bg-[#ffe2e5] text-[#f64e60] font-medium "
                      : "px-2 py-1 text-[#5f8d4e] bg-[#f4fff3] font-medium  "
                  }`}
                >
                  {item?.paymentStatus}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="min-h-[70vh]">
            <p>No Data Found</p>
          </div>
        )}
      </aside>
    </section>
  );
};

export default PrevAppintment;
