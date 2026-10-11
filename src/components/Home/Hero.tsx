"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HomeServices, PlatformData } from "./AllInterface";
import "./Style.css";
import { useRouter } from "next/navigation";
import { getUserID, isAuthenticate } from "@/lib/authHandler";
import { toast } from "react-toastify";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { useTranslation } from "react-i18next";
import { Modal } from "rsuite";
import { useSocket } from "@/context/SocketContext";
import ComponentSlider from "./ComponentSlider";
import PageLoading from "../Seo/PageLoading";
import SignIn from "../Auth/SignIn";

const Hero = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [signInPage, setSignInPage] = useState(false);
  const [availableDoctor, setAvailableDoctor] = useState<any>(null);
  const { makeAgoraCall } = useSocket();
  const [allData, setAllData] = useState<PlatformData | null>();
  const [loading, setLoading] = useState(false)
  // const [videobanner, setVideobanner] = useState(false);
  let userID = null;

  if (typeof window !== "undefined") {
    userID = localStorage.getItem("userID");
  }
  const init = async () => {
    try {
      setLoading(true)
      await apiCall(Methods.GET, EndPoint.AVAILABLE_DOCTOR)
        .then((resp) => {
          // console.log("resp", resp);
          if (resp.success) {
            setAvailableDoctor(resp.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      const response = await apiCall(Methods.GET, EndPoint.SETTING_FIND_ALL);
      if (response.success) {
        // console.log(response);

        setAllData(response.data);
      }
      // localStorage.setItem("watch", "true");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleClick = async (
    e: React.MouseEvent<HTMLDivElement>,
    slug: string
  ) => {
    try {
      e.preventDefault();
      if (slug == "callDoctor") {
        const userId = await getUserID();
        const userAuthentication = await isAuthenticate();
        if (userId && userAuthentication) {
          const response = await apiCall(
            Methods.GET,
            `${EndPoint.GET_BOOK_PACKAGE}/${userId}`
          );
          if (response.success) {
            const userAgent = navigator.userAgent || navigator.vendor;

            let storeUrl = "https://play.google.com/store/apps/details?id=com.clinicall.clinicallapp";

            if (/iPad|iPhone|iPod/.test(userAgent)) {
              storeUrl =
                "https://apps.apple.com/us/app/clinicall-online-doctor-app/id6743645786";
            }

            window.location.href = storeUrl;
            return
            toast.success(t("downloadapp"), {
              hideProgressBar: true,
            });
            if (!availableDoctor) {
              toast.warning("Currently all doctors are busy!", { hideProgressBar: true });
              return;
            }
            const historyData = {
              doctor: availableDoctor._id,
              user: userID,
            };
            await apiCall(
              Methods.POST,
              EndPoint.CALL_HISTORY_CREATE,
              historyData
            )
              .then((resp: any) => {
                // console.log("history resp", resp);
                if (resp.success) {
                  makeAgoraCall(
                    availableDoctor._id,
                    resp.data._id,
                    availableDoctor.fcmToken
                  );
                }
              })
              .catch((error: any) => {
                console.log("History create error", error);
              });
            // toast.success("Download App");
          } else {
            toast.warn("You didn't buy any package", { hideProgressBar: true });
            router.replace("/healthPackage");
          }
        } else {
          toast.warning("Login First", { hideProgressBar: true });
          setSignInPage(!signInPage);
        }
      } else {
        router.replace(`/${slug}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSignInPage(!signInPage);
  };

  return loading ? <PageLoading /> : (
    <section className="relative px-1 xl:container xl:mx-auto 2xl:px-0">
      {/* <ComponentSlider component={component} /> */}
      <ComponentSlider allData={allData!} />

      <div className="min-h-[10vh]  grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-2 md:gap-3  xl:gap-6 2xl:gap-10 justify-between 2xl:w-[94%] px-1 mx-auto mt-2 2xl:mt-4">
        {HomeServices.map((item, index) => (
          <div
            onClick={(e) => handleClick(e, item.slug)}
            key={index}
            className="relative "
          >
            <div className="2xl:p-2.5 p-1.5  h-full cursor-pointer  bg-white rounded-[10px]  hover:scale-105 transition hover:shadow-[0px_0px_15px_2px_rgba(0,_0,_0,_0.1)] duration-150">
              <div className="  h-full  flex flex-col sm:flex-row items-center justify-around w-full py-2.5  p-1 bg-[#fff4f4] rounded-[10px]">
                <div className="w-14 h-14  flex items-center justify-center rounded-full bg-[#ffdfe5]">
                  <Image
                    alt={item.entitle}
                    src={item.icon}
                    width={26}
                    height={26}
                    className="w-full h-full p-3 "
                  />
                </div>
                <div className="w-full sm:w-[66%] text-center md:text-start ">
                  <h3 className="text-base 2xl:text-lg font-semibold text-[#16020B]">
                    {t(item.entitle)}
                  </h3>
                  <p className="h-10 text-sm line-clamp-2 text-[#3A3A3C]">
                    {t(item.ensubtitle)}
                  </p>
                </div>
              </div>
            </div>
            <span className="-z-10 element "></span>
          </div>
        ))}
      </div>

      <Modal open={signInPage} onClose={handleSignIn} size="sm">
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignIn />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Hero;
