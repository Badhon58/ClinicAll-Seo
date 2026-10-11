"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { Drawer, Modal } from "rsuite";
import { FaAngleRight, FaCaretDown } from "react-icons/fa6";
import { UserInfo } from "./Interface";
import { getUserID, isAuthenticate, signout } from "@/lib/authHandler";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import Auth from "./Auth";
import { useDispatch } from "react-redux";
import { setLanguage } from "@/redux/Slices/languageSlicer";
import { useAppSelector } from "@/redux/Hooks";
import { usePathname, useRouter } from "next/navigation";
// import { usePathname, useRouter } from "@/i18n/navigation";
// import { useLocale } from "next-intl";
const RightNavSection = () => {
  const language = useAppSelector((state) => state.languageSlice.language);
  const [open, setOpen] = useState(false);
  const [user, setuser] = useState<UserInfo | any>();
  const [loading, setLoading] = useState(false);
  // login Funtionality start here
  const [loginModel, setLoginModel] = useState(false);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const path = usePathname();
  const [languageSelector, setLanguageSelector] = useState("");
  // const locale = useLocale();
  // const router = useRouter();
  // const pathname = usePathname();

  const [reload, setReload] = useState(false);
  const handleOpenDrawer = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleLanguageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(false);
    if (language === "en") {
      const selectedLanguage = "bn";
      i18n.changeLanguage(selectedLanguage);
      dispatch(setLanguage(selectedLanguage));
      setLanguageSelector("Lang | বাংলা");
      // if (selectedLanguage != locale) {
      //   router.replace(pathname, { locale: selectedLanguage });
      //   router.refresh();
      // }
    } else {
      const selectedLanguage = "en";
      i18n.changeLanguage(selectedLanguage);
      dispatch(setLanguage(selectedLanguage));
      setLanguageSelector("Lang | English");
      // if (selectedLanguage != locale) {
      //   router.replace(pathname, { locale: selectedLanguage });
      //   router.refresh();
      // }
    }
  };

  const init = async () => {
    try {
      setLoading(true);
      // if (language === "en") {
      //   setLanguageSelector("Lang | English");
      // } else {
      //   setLanguageSelector("Lang | বাংলা");
      // }
      const usertoken = await isAuthenticate();
      const userId = await getUserID();
      if (usertoken && userId) {
        const { data } = await apiCall(
          Methods.GET,
          `${EndPoint.SINGLE_USER}/${userId}`
        );
        setuser(data)
        // console.log(data);

      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await signout();
      setReload((prev) => !prev);
      // init();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // login Funtionality End here

  const handleLoginModel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoginModel(!loginModel);
  };

  useEffect(() => {
    init();
  }, [reload]);

  useEffect(() => {
    if (open) setOpen(false);
  }, [path]);

  return (
    <>
      <div>
        {loading ? (
          <p className="size-7 border-b-4 border-b-white rounded-full  animate-spin "></p>
        ) : user ? (
          <div onClick={handleOpenDrawer} className="cursor-pointer">
            <Image
              src={user.image || "/other/userprofile.svg"}
              alt={"User Image"}
              width={300}
              height={300}
              className="size-9 border rounded-full"
            />
          </div>
        ) : (
          <button onClick={handleOpenDrawer}>
            <CgMenuLeft size={26} />
          </button>
        )}
      </div>

      <Drawer
        size={280}
        placement={"right"}
        open={open}
        onClose={() => setOpen(false)}
        className=" overflow-auto"
      >
        <div className="flex items-center w-full p-3 bg-[#fff4f4]">
          <div className="flex items-center justify-center flex-1 ">
            {/* <select
              name="language"
              id="language"
              className={`outline-none bg-red-40 border p-2 border-gray-600 rounded-md text-xs justify-end items-center bg-transparent cursor-pointer tracking-tighter`}
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">En</option>
              <option value="bn">বাংলা</option>
            </select> */}
            <button
              onClick={handleLanguageChange}
              className={`outline-none bg-red-40 border p-2 border-gray-600 rounded-md text-xs flex space-x-1 justify-end items-center bg-transparent cursor-pointer tracking-tighter`}
            >
              <span> {languageSelector}</span>{" "}
              <span>
                {" "}
                <FaCaretDown />
              </span>
            </button>
          </div>
          <div className="flex justify-end items-center">
            <button
              onClick={() => setOpen(false)}
              className="p-0.5  border rounded-full bg-gray-200"
            >
              <IoCloseOutline size={20} />
            </button>
          </div>
        </div>
        <div className=" bg-[#fff4f4] min-h-[90vh] relative px-2 overflow-auto">
          {user ? (
            <div className=" flex flex-col   ">
              <div className="flex items-center space-x-3 pt-4">
                <Image
                  src={user.image || "/other/userprofile.svg"}
                  alt={"User Image"}
                  width={300}
                  height={300}
                  className="size-10 border rounded-full"
                />
                <div>
                  <span className="text-sm">Hi</span>
                  <p className="text-xs font-medium capitalize">{user.firstName} {user.lastName}</p>
                </div>
              </div>
              <div className="mt-3 w-full">
                <Link
                  href={"/microsite-test/profile"}
                  className=" w-full flex text-xs justify-between border-y border-gray-300 p-2"
                >
                  <span>{t("My Profile")}</span>
                  <span>
                    <FaAngleRight size={15} />
                  </span>
                </Link>
                <Link
                  href={"/microsite-test/healthcard"}
                  className=" w-full flex text-xs justify-between border-b border-gray-300 p-2"
                >
                  <span>{t("Health Card")}</span>
                  <span>
                    <FaAngleRight size={15} />
                  </span>
                </Link>
                <Link
                  href={"/microsite-test/appointment"}
                  className=" w-full flex text-xs justify-between border-b border-gray-300 p-2"
                >
                  <span>{t("Previous Appointments")}</span>
                  <span>
                    <FaAngleRight size={15} />
                  </span>
                </Link>
                {/* <Link
                  href={"/microsite/report"}
                  className=" w-full flex text-xs justify-between border-b border-gray-300 p-2"
                >
                  <span>{t("Report")}</span>
                  <span>
                    <FaAngleRight size={15} />
                  </span>
                </Link> */}
              </div>
            </div>
          ) : null}
          <div className=" w-full  ">
            <Link
              href={"/microsite-test"}
              className=" w-full flex text-xs justify-between border-b border-gray-300 p-2"
            >
              <span>{t("Home")}</span>
              <span>
                <FaAngleRight size={15} />
              </span>
            </Link>

            <Link
              href={"/microsite-test/package"}
              className=" w-full flex text-xs justify-between border-b p-2 border-gray-300"
            >
              <span>{t("Health Package")}</span>
              <span>
                <FaAngleRight size={15} />
              </span>
            </Link>
          </div>
          <div className="flex flex-col justify-end items-center  min-h-[44vh]">
            {user ? (
              <div className="  flex items-center justify-end w-full h-full mt-2 ">
                <button
                  onClick={handleLogout}
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#EB148C] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-pink-400  transition-colors duration-150"
                >
                  {t("Logout")}
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-end w-full items-center min-h-[70vh] mt-2 mx-4 ">
                <button
                  onClick={handleLoginModel}
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#EB148C] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-pink-400  transition-colors duration-150"
                >
                  {t("Login")}
                </button>
              </div>
            )}
          </div>
        </div>
      </Drawer>
      <Modal
        open={loginModel}
        onClose={() => {
          setLoginModel(!loginModel);
        }}
        size="sm"
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <Auth />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RightNavSection;
