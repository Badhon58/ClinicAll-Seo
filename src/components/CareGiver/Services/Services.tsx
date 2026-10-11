"use client";
import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { Modal } from "rsuite";
import { useRouter } from "next/navigation";
import { getUserID, isAuthenticate } from "@/lib/authHandler";
import { CareGiverInterface } from "../Interface";
import PageLoading from "@/components/Seo/PageLoading";
import SignIn from "@/components/Auth/SignIn";

const Services = () => {
  const [services, setServices] = useState<CareGiverInterface[]>();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [signInPage, setsignInPage] = useState(false);
  const router = useRouter();
  const init = async () => {
    try {
      setLoading(true);
      const { data } = await apiCall(Methods.GET, EndPoint.CARE_GIVER_GET_ALL);
      // console.log(data);

      setServices(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = (e: any) => {
    e.preventDefault();
    setsignInPage(!signInPage);
  };

  const handleEvent = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const userauth = await isAuthenticate();
    const userId = await getUserID();

    // Fetch user data if authenticated and userId is available
    if (userauth && userId) {
      router.push("/account/claim");
    } else {
      setsignInPage(!signInPage);
    }
  };

  useEffect(() => {
    init();
  }, []);
  return loading ? (
    <PageLoading />
  ) : (
    <section className="min-h-[80vh] xl:mx-auto xl:container p-2 ">
      {/* <div className="">
        <h2 className="text-lg font-semibold">{t("scheduleService")}</h2>
        <p className="text-gray-600 text-sm">
          {t("callphone")} {t("mobile")}
        </p>
      </div> */}
      <div className="grid grid-cols-2 mt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-5 gap-2 lg:gap-4">
        <ServiceCard
          key={0}
          name={t("physicaldoctor")}
          desc={"Your Physical Doctor"}
          image={
            "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-04092025T150326-5.jpg"
          }
          slug="physicaldoctor"
        />
        <div className="bg-white rounded-lg shadow-[-6px_6px_37.4px_0px_#10285130] overflow-hidden hover:scale-105 cursor-pointer transition hover:duration-500 p-4">
          <div
            onClick={handleEvent}
            className="bg-[#FFF4F4] h-full flex text-center hover:scale-105 group shadow hover:shadow-xl duration-150 lg:px-5 xl:px-1 py-2 2xl:py-[11px] rounded-[10px] flex-col justify-center items-center "
          >
            <div className="w-14 h-14  flex items-center justify-center rounded-full bg-[#ffdfe5]">
              <Image
                alt={"Make Claim"}
                src={"/servicesImage/MakeClaim.svg"}
                width={26}
                height={26}
                className=" w-full h-full p-3"
              />
            </div>
            <h3
              className="text-sm font-medium lg:text-base xl:text-lg 2xl:text-xl mt-2"
              id="doctor"
            >
              {t("Make Claim")}
            </h3>
            <p className="text-[10px] xl:text-sm w-[80%] text-[#8F90A6] mx-auto h-10 line-clamp-2">
              {" "}
              {t("Easily claim and enjoy your health care benefits!")}
            </p>
          </div>
        </div>{" "}
        <ServiceCard
          key={3}
          name={t("Babysitter")}
          desc="Your Baby Sitter"
          image={
            "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-04092025T150326-5.jpg"
          }
          slug="query=Babysitter"
        />
        <ServiceCard
          key={3}
          name={t("Old Age Care")}
          desc="Your Old Age Care"
          image={
            "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-04092025T150326-5.jpg"
          }
          slug="Babysitter"
        />
      </div>
      <Modal open={signInPage} onClose={handleSignIn} size="sm">
        <Modal.Header>{/* <Modal.Title></Modal.Title> */}</Modal.Header>
        <Modal.Body>
          {/* <AuthLib /> */}
          <SignIn />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Services;
