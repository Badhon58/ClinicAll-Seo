"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaFacebookF, FaLinkedin, FaSquareInstagram } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { IoLogoYoutube } from "react-icons/io5";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-[#16020B] p-4 text-white">
      <div className="flex flex-col mt-4 xl:mt-0 text-[12px] ">
        <Image
          src={"/other/logo.svg"}
          alt="Footer Image"
          height={46}
          width={170}
        />

        <p className="flex py-2 space-x-2 items-center">
          <FiMapPin />
          <span className=""> {t("Oraddress")}</span>
        </p>
        <p className="flex space-x-2 items-center">
          <LiaPhoneVolumeSolid />
          <span>{t("mobile")}</span>
        </p>
        <p className="flex pt-1 space-x-2 items-center">
          <MdOutlineEmail />
          <span>{t("emailcont")}</span>
        </p>
        <p>Scan QR Code for Download</p>
      </div>
      <hr className="border my-2 border-white" />
      <div className="grid grid-cols-2 gap-1 ">
        <div className="flex  space-x-4">
          <div className=" bg-white rounded flex flex-col items-center justify-center">
            <Image
              src={"/footer/dbid.png"}
              alt="DBID Image"
              width={55}
              height={21}
              className="w-[55px] h-[21px]"
            />
            <p className="text-[9px] text-black">463031018</p>
          </div>
          <div className=" bg-white rounded flex flex-col items-center justify-center p-1">
            <Image
              src={"/footer/ecab.png"}
              alt="DBID Image"
              width={55}
              height={21}
              className="w-[55px] h-[21px]"
            />
            <p className="text-[9px] text-black">2835</p>
          </div>
        </div>

        <div className="flex space-x-2 ">
          <Link href={"https://www.facebook.com/theclinicall/"}>
            <span className="flex justify-center items-center bg-white rounded-full size-8">
              <FaFacebookF size={15} className="text-[#E2136E]" />
            </span>
          </Link>
          <Link href={"https://www.linkedin.com/company/104822209/"}>
            <span className="flex justify-center bg-white rounded-full size-8 items-center">
              <FaLinkedin size={15} className="text-[#E2136E]" />
            </span>
          </Link>
          <Link href={"https://www.instagram.com/theclinicall/"}>
            <span className="flex justify-center items-center bg-white rounded-full size-8">
              <FaSquareInstagram size={15} className="text-[#E2136E]" />
            </span>
          </Link>
          <Link href={"https://www.youtube.com/@CliniCallLimited"}>
            <span className="flex justify-center items-center bg-white rounded-full size-8">
              <IoLogoYoutube size={15} className="text-[#E2136E]" />
            </span>
          </Link>
        </div>

        <p className="text-white text-[12px] font-light col-span-2">
          Copyright ©2024 Clinicall. All Rights Reserved
        </p>
      </div>
    </section>
  );
};

export default Footer;
