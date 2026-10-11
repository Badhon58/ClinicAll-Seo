"use client";
import { getUserID, isAuthenticate } from "@/lib/authHandler";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { EndPoint, Methods } from "@/api/config";
import { apiCall } from "@/lib/axios-client";
import { IoMdArrowDropdown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Dropdown, Modal } from "rsuite";
import AuthLib from "../common/AuthLib";
import SignIn from "../Auth/SignIn";
const Navigation = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [signInPage, setSignInPage] = useState(false);
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
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
        } else {
          toast.warn("You didn't buy any package");
          router.replace("/healthPackage");
        }
      } else {
        toast.warning("Login First");
        router.replace("/Auth/userlogin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const renderToggle = (props: any, ref: React.Ref<any>) => {
    const { text } = props;
    return (
      <p ref={ref} className={`cursor-pointer flex items-center`}>
        <span>{text}</span>
        <IoMdArrowDropdown className="text-xl" />
      </p>
    );
  };

  const handleClaim = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userId = await getUserID();
    const userAuthentication = await isAuthenticate();
    if (userId && userAuthentication) {
      router.replace("/account/claim");
    } else {
      setSignInPage(!signInPage);
    }
  };

  const showModal = () => {
    setSignInPage(!signInPage);
  };

  return (
    <>
      <div className="hidden lg:flex space-x-2 xl:space-x-4 text-[#000] text-xs lg:text-sm 2xl:text-base font-medium">
        <Link href={"/"} className={`animatedbar`}>
          {t("Home")}
        </Link>
        <Link href={"/About"} className={`animatedbar`}>
          {t("About Us")}
        </Link>
        <Dropdown
          trigger={"hover"}
          placement="bottomEnd"
          renderToggle={(props, ref) =>
            renderToggle({ ...props, text: t("Services") }, ref)
          }
        >
          <div className=" w-48 ">
            <button
              onClick={handleClick}
              className="block px-4 py-2 text-[13px] text-[#000] 2xl:text-sm hover:bg-gray-100 cursor-pointer w-full text-start"
            >
              {t("Call Doctor")}
            </button>
            <Link
              href="/doctorlist#doctor"
              className="block px-4 py-2 text-[13px] text-[#000] 2xl:text-sm hover:bg-gray-100"
            >
              {t("Book Appointment")}
            </Link>
            <Link
              href="/healthPackage"
              className="block px-4 py-2 text-[13px] text-[#000] 2xl:text-sm hover:bg-gray-100"
            >
              {t("Health Package")}
            </Link>
            <Link
              href="/lab"
              className="block px-4 py-2 text-[13px] text-[#000] 2xl:text-sm hover:bg-gray-100"
            >
              {t("Book Lab test")}
            </Link>
            <Link
              href="/mediMart"
              className="block px-4 py-2 text-[13px] text-[#000] 2xl:text-sm hover:bg-gray-100"
            >
              {t("Buy Medicine")}
            </Link>
            <Link
              href="/allservices"
              className="block px-4 py-2 text-[13px] text-[#000] 2xl:text-sm hover:bg-gray-100"
            >
              {t("Other Services")}
            </Link>
          </div>
        </Dropdown>
        <button className={`animatedbar`} onClick={handleClaim}>
          {t("Claim")}
        </button>
        <Link href={"/mediMart"} className={`animatedbar`}>
          {t("MediMart")}
        </Link>
        <Link href={"/press"} className={`animatedbar`}>
          {t("Press Release")}
        </Link>
        <Link href={"/contact"} className={`animatedbar`}>
          {t("Contact Us")}
        </Link>
        <Link href={"/blog"} className={`animatedbar`}>
          {t("Blogs")}
        </Link>
      </div>
      <Modal
        size="sm"
        open={signInPage}
        onClose={showModal}

      >
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minWidth: "30rem" }}>
          {/* <AuthLib /> */}
          <SignIn />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navigation;
