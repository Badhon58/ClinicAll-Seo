"use client";
import {
  doctorIsAuthenticate,
  doctorSignout,
  getDoctorId,
  getUserID,
  isAuthenticate,
  signout,
} from "@/lib/authHandler";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ShoppingProduct from "../MediMart/ShoppingProduct";
import { useAppSelector } from "@/redux/Hooks";
import NavbarMenu from "./NavbarMenu";
import { useDispatch } from "react-redux";
import { setLanguage } from "@/redux/Slices/languageSlicer";
// import { usePathname, useRouter } from "@/i18n/navigation";
// import { useLocale } from "next-intl";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { Avatar, Badge, Drawer, Dropdown, Modal } from "rsuite";
interface UserInfo {
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  bmdcRegistered?: boolean;
  bmdc?: string;
}
import { RxCross1 } from "react-icons/rx";
import { IoCartOutline, IoMenu } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { clearCart } from "@/redux/Slices/CartSlicer";
import { clearLab } from "@/redux/Slices/LabSlice";
import { FiUser } from "react-icons/fi";
import AuthLib from "../common/AuthLib";
import { FaRegUser, FaUser } from "react-icons/fa6";
const { SINGLE_USER, DOCTOR_FIND_BY_ID } = EndPoint;
import { Loader } from "rsuite";
import SignIn from "../Auth/SignIn";
import { useRouter } from "next/navigation";
const bottombarblack =
  "duration-300 cursor-pointer relative overflow-hidden after:h-[1px] after:w-full after:bottom-0 after:right-full after:bg-black after:absolute hover:after:translate-x-full after:duration-300";
const RightPanal = () => {
  const language = useAppSelector((state) => state.languageSlice.language);
  const [loading, setLoading] = useState(true);
  const [productType, setProductType] = useState<string>("product");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [doctorInfo, setDoctorInfo] = useState<UserInfo | null>(null);
  // const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [signInPage, setSignInPage] = useState(false);
  const [storeLink, setStoreLink] = useState("");
  // const locale = useLocale();
  const router = useRouter();
  // const pathname = usePathname();
  const init = async () => {
    try {
      setLoading(true);
      // i18n.changeLanguage(locale);
      // dispatch(setLanguage(locale));
      if (typeof window !== "undefined") {
        const userAgent = navigator.userAgent || navigator.vendor;

        if (/android/i.test(userAgent)) {
          setStoreLink(
            "https://play.google.com/store/apps/details?id=com.clinicall.clinicallapp"
          );
        } else if (/iPad|iPhone|iPod/.test(userAgent)) {
          // setStoreLink("https://apps.apple.com/app/your-app-id");
          setStoreLink(
            "https://apps.apple.com/us/app/clinicall-online-doctor-app/id6743645786"
          );
        } else {
          setStoreLink(
            "https://play.google.com/store/apps/details?id=com.clinicall.clinicallapp"
          );
        }
      }
      const usertoken = await isAuthenticate();
      const userId = await getUserID();
      if (usertoken && userId) {
        const { data } = await apiCall(Methods.GET, `${SINGLE_USER}/${userId}`);
        setUserInfo(data);
        // console.log(data);
      }
      const doctorToken = await doctorIsAuthenticate();
      const doctorId = await getDoctorId();
      if (doctorToken && doctorId) {
        const { data }: any = await apiCall(
          Methods.GET,
          `${DOCTOR_FIND_BY_ID}/${doctorId}`
        );
        setDoctorInfo(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const ProductTotal = useAppSelector((state) => state.CartSlicer.cartitems);
  const ProductTotalPrice = useAppSelector(
    (state) => state.CartSlicer.cartTotalAmount
  );

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
    dispatch(setLanguage(selectedLanguage));
    // if (selectedLanguage != locale) {
    //   router.replace(pathname, { locale: selectedLanguage });
    //   router.refresh();
    // }
  };

  const handleDrawer: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDrawer(!drawer);
  };

  const handleMenuOpen: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const renderToggle = (props: any, ref: React.Ref<any>) => {
    // const imagesource = userInfo?.image ? userInfo.image : doctorInfo?.image;
    const imagesource =
    userInfo?.image ||
    doctorInfo?.image ||
    "/User/Group.png";
    const firstName = userInfo?.firstName
      ? userInfo.firstName
      : doctorInfo?.firstName
      ? doctorInfo?.firstName
      : "Hello User";
    return (
      <div
        {...props}
        ref={ref}
        className="flex items-center gap-1 -mt-1 cursor-pointer 2xl:gap-2 group"
      >
        {/* Avatar */}
        <Avatar src={imagesource} alt={firstName.charAt(0)} circle size="sm" />
        {/* Name */}
        <span className="text-xs lg:text-sm">{firstName ?? "Hello User"}</span>
        <IoMdArrowDropdown
          size={18}
          className="text-xl transition duration-500 group-hover:-rotate-180"
        />
      </div>
    );
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await doctorSignout();
      await signout();
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/");
      window.location.reload();
    }
  };

  const handleRoute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/checkout");
  };

  const handleSignIn: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSignInPage(!signInPage);
  };

  useEffect(() => {
    init();
  }, []);

  return loading ? (
    <div className="flex justify-center items-center w-[10%] lg:w-[30%]">
      <Loader />
    </div>
  ) : (
    <>
      <aside className="w-[10%] lg:w-[50%] flex items-center lg:items-start lg:justify-center xl:justify-end 2xl:justify-center">
        <div className="hidden  lg:flex justify-center 2xl:justify-end lg:space-x-1 xl:space-x-3 2xl:space-x-3 text-[#000] text-sm font-medium">
          <button
            className={`mt-1 mr-2 `}
            onClick={handleDrawer}
            disabled={ProductTotal.length == 0}
          >
            <Badge content={t("numberconvert", { count: ProductTotal.length })}>
              <IoCartOutline className="text-lg" />
            </Badge>
          </button>
          {/* </div> */}
          {userInfo ? (
            <Dropdown
              noCaret
              trigger={"hover"}
              placement="bottomEnd"
              renderToggle={renderToggle}
            >
              <Dropdown.Item as={Link} href="/account">
                {t("My Profile")}
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/account/healthcard">
                {t("Health Card")}
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/account/claim">
                {t("Claim")}
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/account/claimHistory">
                {t("Claim History")}
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/account/prevappointment">
                {t("Previous Appointments")}
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/account/report">
                {t("Report")}
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/account/orders">
                {t("Orders")}
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>
                {" "}
                {t("Log Out")}
              </Dropdown.Item>

              <p className="w-48"></p>
            </Dropdown>
          ) : doctorInfo ? (
            <Dropdown
              // noCaret
              trigger={"hover"}
              placement="bottomEnd"
              renderToggle={(props, ref) =>
                renderToggle({ ...props, text: doctorInfo?.firstName }, ref)
              }
            >
              <Dropdown.Item as={Link} href="/doctoraccount">
                My Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/doctoraccount/myappointment">
                My Appointments
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/doctoraccount/appoitmentshistory">
                Appointment History
              </Dropdown.Item>
              <Dropdown.Item as={Link} href="/doctoraccount/visitingHours">
                Visiting Hours
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <button
              onClick={handleSignIn}
              className="flex space-x-3 justify-center cursor-pointer px-2.5 animatedbar"
            >
              {t("Login")}
            </button>
          )}
          <Link
            href={storeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`border-b delay-300 border-black hover:${bottombarblack} hover:delay-0 hover:border-0 tracking-tighter md:text-xs lg:text-sm `}
          >
            {t("Download App")}
          </Link>
          <div>
            <select
              name="language"
              id="language"
              className={`outline-none bg-transparent cursor-pointer tracking-tighter`}
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">En</option>
              <option value="bn">বাংলা</option>
            </select>
          </div>
        </div>
        {/* Responsive cart  */}
        <div className="flex items-center justify-center w-full transition-transform duration-300 lg:hidden">
          <button onClick={handleMenuOpen}>
            {isMenuOpen ? (
              <RxCross1 className="text-[43px] transition-all duration-300 ease-in-out transform rotate-180" />
            ) : (
              <IoMenu className="text-[43px] transition-all duration-300 ease-in-out transform " />
            )}
          </button>
        </div>
      </aside>
      {/* Cart  */}
      <Drawer
        placement={"right"}
        open={drawer}
        onClose={handleDrawer}
        className="responsive-drawer"
      >
        <Drawer.Header>
          <div className="flex items-center justify-center w-full">
            <div className="relative">
              <p className="mt-2 font-semibold text-center 2xl:text-xl">
                {t("Shopping Cart")}
              </p>
              {/* <span className="absolute flex items-center justify-center text-xs text-white translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full top-1 -right-1 size-5">
                {t("numberconvert", { count: ProductTotal.length })}
              </span> */}
            </div>
          </div>
        </Drawer.Header>

        <ShoppingProduct />
        <div className="absolute bottom-0 w-full bg-white">
          <p className="flex justify-between text-base  p-2 2xl:p-4 text-[#EB148C] font-semibold border-t">
            <span>{t("product_price")}</span>
            <span>
              {t("moneyCount", { count: Number(ProductTotalPrice.toFixed(2)) })}
            </span>
          </p>

          <button
            onClick={handleRoute}
            disabled={ProductTotal.length == 0 && true}
            className=" z-20 w-full p-2 bg-[#EB148C] text-white mb-1 2xl:text-xl text-center border rounded-lg 2xl:p-4"
          >
            {t("Checkout")}
          </button>
        </div>
        {/* <Link
          href={"/checkout"}
          className="absolute cursor-pointer bottom-0 z-20 w-full p-2 bg-[#EB148C]  text-white mb-1 2xl:text-xl text-center border rounded-lg 2xl:p-4 "
        >
          {t("Checkout")}
        </Link> */}
      </Drawer>
      {/* Mobile Responsive  */}
      <Drawer size={"xs"} open={isMenuOpen} onClose={handleMenuOpen}>
        <NavbarMenu
          userInfo={userInfo}
          doctorInfo={doctorInfo}
          ProductTotal={ProductTotal.length}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          drawer={drawer}
          setDrawer={setDrawer}
          handleSignIn={handleSignIn}
        />
      </Drawer>
      <Modal open={signInPage} onClose={handleSignIn} size="sm">
        <Modal.Header>{/* <Modal.Title></Modal.Title> */}</Modal.Header>
        <Modal.Body>
          {/* <AuthLib /> */}
          <SignIn />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RightPanal;
