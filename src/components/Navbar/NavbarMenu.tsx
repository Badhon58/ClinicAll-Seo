"use client";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { setLanguage } from "@/redux/Slices/languageSlicer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ResLeftSidebar from "./ResLeftSidebar";
import {
  doctorSignout,
  getUserID,
  isAuthenticate,
  signout,
} from "@/lib/authHandler";
import { useSocket } from "@/context/SocketContext";
import { RxCross1 } from "react-icons/rx";
import { Avatar, Badge, Dropdown } from "rsuite";
import { IoCartOutline } from "react-icons/io5";
import { t } from "i18next";
import { IoMdArrowDropdown } from "react-icons/io";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { toast } from "react-toastify";
import i18n from "@/lib/i18n";
import { useRouter } from "next/navigation";
// import { usePathname, useRouter } from "@/i18n/navigation";
// import { useLocale } from "next-intl";
interface UserInfo {
  firstName: string;
  lastName: string;
  image: string;
  email: string;
}
interface doctorInfo {
  firstName?: string;
  image?: string;
  bmdc?: string;
  email?: string;
  lastName?: string;
  bmdcRegistered?: boolean;
}
const NavbarMenu = ({
  doctorInfo,
  userInfo,
  ProductTotal,
  isMenuOpen,
  setIsMenuOpen,
  drawer,
  setDrawer,
  handleSignIn,
}: {
  userInfo: UserInfo | null;
  doctorInfo: doctorInfo | null;
  ProductTotal: number;
  isMenuOpen: boolean;
  setIsMenuOpen: any;
  drawer: boolean;
  setDrawer: any;
  handleSignIn: any;
}) => {
  // const router = useRouter();
  const { handleSocketLogout } = useSocket();
  const language = useAppSelector((state) => state.languageSlice.language);
  const [availableDoctor, setAvailableDoctor] = useState<any>({});
  const { makeAgoraCall } = useSocket();
  // const locale = useLocale();
  const router = useRouter();
  // const pathname = usePathname();
  let userID = null;

  if (typeof window !== "undefined") {
    userID = localStorage.getItem("userID");
  }

  useEffect(() => {
    apiCall(Methods.GET, EndPoint.AVAILABLE_DOCTOR)
      .then((resp) => {
        // console.log("resp", resp);
        if (resp.success) {
          setAvailableDoctor(resp.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleResCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDrawer(!drawer);
  };

  const handleMenuOpen: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const dispatch = useAppDispatch();

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
          const historyData = {
            doctor: availableDoctor._id,
            user: userID,
          };
          apiCall(Methods.POST, EndPoint.CALL_HISTORY_CREATE, historyData)
            .then((resp: any) => {
              // console.log("history resp", resp);
              if (resp.success) {
                makeAgoraCall(
                  availableDoctor._id,
                  resp.data.id,
                  availableDoctor.fcmToken
                );
              }
            })
            .catch((error: any) => {
              console.log("History create error", error);
            });
        } else {
          toast.warn("You didn't buy any package");
          router.replace("/healthPackage");
        }
      } else {
        toast.warning("Login First");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
    dispatch(setLanguage(selectedLanguage));
    // if (selectedLanguage != locale) {
    //   router.replace(pathname, { locale: selectedLanguage });
    //   router.refresh();
    // }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const user_id = localStorage.getItem("userID");
      if (user_id) {
        handleSocketLogout(user_id);
      }
      // localStorage.removeItem("userID");
      await doctorSignout();
      await signout();

      router.push("/");
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

  return (
    <div className="flex flex-col justify-between max-h-[94vh] min-h-[89vh]  overflow-y-auto pl-4 ">
      <div className="p-6">
        <div className="flex justify-between  mb-1">
          <div className="flex flex-col space-y-2">
            <Link href={"/About"} className="text-black">
              {t("About Us")}
            </Link>
            <Dropdown
              trigger={"hover"}
              placement="bottomStart"
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
            <ul className="space-y-2 flex flex-col">
              <Link href="/account/claim" className={`animatedbar`}>
                {t("Claim")}
              </Link>
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
              <li>
                <button className={`mt-1 `} onClick={handleResCart}>
                  <Badge content={t("numberconvert", { count: ProductTotal })}>
                    <IoCartOutline className="text-lg" />
                  </Badge>
                </button>
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-2 ">
            <button className="flex justify-end" onClick={handleMenuOpen}>
              <RxCross1 className="text-2xl transition-all duration-300 ease-in-out transform rotate-180" />
            </button>
            <select
              name="language"
              id="language"
              className={`outline-none bg-transparent cursor-pointer tracking-tighter `}
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="bn">বাংলা</option>
            </select>
          </div>
        </div>
      </div>
      <ResLeftSidebar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <p className="mt-6"></p>
      {userInfo ? (
        <div className=" px-5">
          <div className="flex items-center space-x-2">
            <Avatar
              src={
                userInfo.image ? `${userInfo.image}` : "/User/Group.png"
              }
              circle
              size="md"
            />
            <div>
              <p>
                {userInfo.firstName} {userInfo.lastName}
              </p>
              <p className="text-xs">{userInfo.email}</p>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <Link
              href={"/account"}
              className="px-3 py-3 border-y "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {t("My Profile")}
            </Link>
            <Link
              href={"/account/healthcard"}
              className="px-3 py-3 border-b "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {t("Health Card")}
            </Link>
            <Link
              href={"/account/claim"}
              className="px-3 py-3 border-b "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {t("Claim")}
            </Link>
            <Link
              href={"/account/claimHistory"}
              className="px-3 py-3 border-b "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {t("Claim History")}
            </Link>
            <Link
              href={"/account/prevappointment"}
              className="px-3 py-3 border-b "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {t("Previous Appointments")}
            </Link>
            <Link
              href={"/account/report"}
              className="px-3 py-3 border-b "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {t("Report")}
            </Link>
            <Link
              href={"/account/orders"}
              className="px-3 py-3 border-b "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {t("Orders")}
            </Link>

            <button
              onClick={handleLogout}
              className="flex justify-start px-3 py-3 border-b"
            >
              {t("Log Out")}
            </button>
            <Link
              href={"/Auth/remove"}
              className="px-3 py-3 border-b text-start"
            >
              {t("Account Delete")}
            </Link>
          </div>
        </div>
      ) : doctorInfo ? (
        <div className=" px-6 ">
          <div className="flex items-center space-x-2">
            <Avatar
              src={
                doctorInfo.image
                  ? `${doctorInfo.image}`
                  : "/other/userprofile.svg"
              }
              circle
              size="md"
            />
            <div>
              <p>
                {doctorInfo.firstName} {doctorInfo.lastName}
              </p>
              <p className="text-xs">
                {" "}
                {doctorInfo.bmdcRegistered
                  ? `BMDC No: ${doctorInfo.bmdc}`
                  : `Email : ${doctorInfo.email}`}
              </p>
            </div>
          </div>
          <div className="flex flex-col mt3">
            <Link
              href={"/doctoraccount"}
              className="px-3 py-3 border-y "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              My Profile{" "}
            </Link>
            <Link
              href={"/doctoraccount/myappointment"}
              className="px-3 py-3 border-b "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              My Appoitments
            </Link>
            <Link
              href={"/doctoraccount/appoitmentshistory"}
              className="px-3 py-3 border-b "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Appoitments History
            </Link>
            <Link
              href={"/doctoraccount/visitingHours"}
              className="px-3 py-3 border-b "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Visiting Hours
            </Link>
            <button
              onClick={handleLogout}
              className="flex justify-start px-3 py-3 border-b"
            >
              Log Out{" "}
            </button>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col space-y-2 h-full px-6">
          <button
            onClick={handleSignIn}
            className="flex space-x-3  cursor-pointer"
          >
            {t("Login")}
          </button>
          <div className="text-black underline"> {t("Download App")}</div>
        </div>
      )}
    </div>
  );
};

export default NavbarMenu;
