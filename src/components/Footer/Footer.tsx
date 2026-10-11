"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaFacebookF, FaLinkedin, FaSquareInstagram } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { IoLogoYoutube } from "react-icons/io5";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { MdOutlineEmail } from "react-icons/md";
import { doctorIsAuthenticate, isAuthenticate } from "@/lib/authHandler";
const Footer = () => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mouted, setMouted] = useState(false);

  const init = async () => {
    try {
      setLoading(true);
      const doctortoken = await doctorIsAuthenticate();
      const usertoken = await isAuthenticate();
      if (doctortoken || usertoken) {
        // console.log("Authenticate");
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        // console.log("Not Authenticate");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
    setMouted(true);
  });

  return (
    <div className=" bg-[#16020B] mt-4">
      <div className="xl:container xl:mx-auto ">
        <div className="grid grid-cols-2 lg:grid-cols-4 text-white pt-4 2xl:pt-[30px] pl-3 ">
          <div className="flex flex-col mt-4 xl:mt-0 ">
            <Image
              src={"/other/logo.svg"}
              alt="Footer Image"
              height={46}
              width={170}
            />

            <p className="flex py-2 space-x-2 items-center">
              <FiMapPin />
              <span className=""> {mouted && t("Oraddress")}</span>
            </p>
            <p className="flex space-x-2 items-center">
              <LiaPhoneVolumeSolid />
              <span>{mouted && t("mobile")}</span>
            </p>
            <p className="flex pt-1 space-x-2 items-center">
              <MdOutlineEmail />
              <span>{mouted && t("emailcont")}</span>
            </p>
          </div>
          <div className="flex flex-col space-y-[16px]  mt-4 xl:mt-0 ">
            <Link href="/About" className={``}>
              <h3>{mouted && t("About Us")}</h3>
            </Link>
            <Link href="/contact" className={``}>
              <h3>{mouted && t("Contact Us")}</h3>
            </Link>
            <Link href="/terms-and-condition" className={``}>
              <h3>{mouted && t("Terms & Conditions")}</h3>
            </Link>
            <Link href="/privacy-policy" className="">
              <h3>{mouted && t("Privacy Policy")}</h3>
            </Link>
            <Link href="/refund-policy" className="">
              <h3>{mouted && t("Refund Policy")}</h3>
            </Link>
          </div>
          <div className="flex flex-col space-y-[16px]  mt-4 xl:mt-0 ">
            <Link href="/discount" className="">
              <h3>{mouted && t("Our Partners")}</h3>
            </Link>
            <Link href="/press" className="">
              <h3>{mouted && t("Press Release")}</h3>
            </Link>
            <Link href="/blog" className="">
              <h3>{mouted && t("Blogs")}</h3>
            </Link>
            {isAuthenticated ? (
              ""
            ) : (
              <Link href="/Auth/docLogin" className="text-start">
                <h3>{mouted && t("Sign Up As A Doctor")}</h3>
              </Link>
            )}
            <Link href="/Auth/remove" className="text-start">
              <h3>{mouted && t("Account Delete")}</h3>
            </Link>
          </div>
          <div className="flex flex-col space-y-[16px]  mt-4 xl:mt-0 ">
            <Link href="/healthPackage" className="">
              <h3>{mouted && t("Health Packages")}</h3>
            </Link>
            <Link href="/doctorlist#doctor" className="">
              <h3>{mouted && t("Book Appointment")}</h3>
            </Link>
            <Link href="/lab" className="">
              <h3>{mouted && t("Lab Test")}</h3>
            </Link>
            <Link href="" className="">
              <h3>{mouted && t("Call Doctor")}</h3>
            </Link>
            <Link href="/mediMart" className="">
              <h3>{mouted && t("Medicine Order")}</h3>
            </Link>
          </div>
        </div>
        <div className="lg:pt-[20px] px-3 lg:px-0 ">
          <hr className="h-[1px] bg-white " />
          <div className="grid lg:grid-cols-3 mt-3 gap-2 lg:gap-0">
            <div className="lg:flex lg:items-center">
              <p className="text-white text-[12px] font-light xl:text-base">
                Copyright ©2024 Clinicall. All Rights Reserved
              </p>
            </div>

            <div className="flex lg:items-center lg:space-x-2 lg:justify-center space-x-4">
              <div className=" bg-white rounded flex flex-col items-center justify-center px-4 py-1">
                <Image
                  src={"/footer/dbid.png"}
                  alt="DBID Image"
                  width={55}
                  height={21}
                  className="w-[55px] h-[21px]"
                />
                {/* <p className="text-[10px]">463031018</p> */}
              </div>
              <div className=" bg-white rounded flex flex-col items-center justify-center px-4 py-1">
                <Image
                  src={"/footer/basis.jpeg"}
                  alt="DBID Image"
                  width={55}
                  height={21}
                  className="w-[55px] h-[21px]"
                />
                {/* <p className="text-[10px]">463031018</p> */}
              </div>
              <div className=" bg-white rounded flex flex-col items-center justify-center px-4 py-1">
                <Image
                  src={"/footer/ecab.png"}
                  alt="DBID Image"
                  width={55}
                  height={21}
                  className="w-[55px] h-[21px]"
                />
                {/* <p className="text-[10px]">2835</p> */}
              </div>
            </div>

            <div className="flex space-x-2 lg:justify-end">
              <Link href={"https://www.facebook.com/theclinicall/"}>
                <span className="flex justify-center items-center bg-white rounded-full size-10">
                  <FaFacebookF size={24} className="text-[#E2136E]" />
                </span>
              </Link>
              <Link href={"https://www.linkedin.com/company/104822209/"}>
                <span className="flex justify-center bg-white rounded-full size-10 items-center">
                  <FaLinkedin size={25} className="text-[#E2136E]" />
                </span>
              </Link>
              <Link href={"https://www.instagram.com/theclinicall/"}>
                <span className="flex justify-center items-center bg-white rounded-full size-10">
                  <FaSquareInstagram size={25} className="text-[#E2136E]" />
                </span>
              </Link>
              <Link href={"https://www.youtube.com/@CliniCallLimited"}>
                <span className="flex justify-center items-center bg-white rounded-full size-10">
                  <IoLogoYoutube size={25} className="text-[#E2136E]" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
