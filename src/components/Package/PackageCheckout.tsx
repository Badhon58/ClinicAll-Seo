"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, use, useEffect, useState } from "react";
import PageLoading from "../Seo/PageLoading";
import { getUserID, isAuthenticate } from "@/lib/authHandler";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, JsonHeader, Methods } from "@/api/config";
import {
  BracPromoCode,
  GPPromoCode,
  Package,
  PackageVariation,
  PromoCode,
  scrollToTop,
} from "./Interface";
import { Trans, useTranslation } from "react-i18next";
import { Modal } from "rsuite";
import Image from "next/image";
import { toast } from "react-toastify";
import { PackagePay } from "@/lib/PackageBuy";
// import AuthLib from "../common/AuthLib";
import CheckoutPackage from "./CheckoutPackage";
import SignIn from "../Auth/SignIn";
import { PakagePayment } from "./PackagePaymentLib";
const PackageCheckout = () => {
  const searchparams = useSearchParams();
  const packageId = searchparams.get("packageId");
  const packagetitle = searchparams.get("packageTitle");
  const packagevariation = searchparams.get("variationId");
  const phonenumber = searchparams.get("phone");
  const countryCode = searchparams.get("countryCode");
  const dialCode = searchparams.get("dialCode");
  const gift = searchparams.get("gift");
  const fullname = searchparams.get("fullname");

  // console.log(packagetitle);

  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();
  const [spackage, setPackage] = useState<Package>();
  const [onlinePayment, setOnlinePayment] = useState<string>("bkash");
  const [signInPage, setSignInPage] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [packageVar, setPackageVar] = useState<PackageVariation | null>();
  const router = useRouter();
  const [couponCode, setCouponCode] = useState<string>("");
  const [braccard, setBraccard] = useState<boolean>(false);
  const [bracCardNumber, setBracCardNumber] = useState<string>("");
  const [Amount, setAmount] = useState<number>(0);
  const [couponData, setCouponData] = useState<PromoCode>();
  const [bracCardDiscount, setBracCardDiscount] = useState<BracPromoCode>();
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [GPLoyalityUser, setGPLoyalityUser] = useState(false);
  const [GpLoyalityDiscount, setGpLoyalityDiscount] = useState<GPPromoCode>();
  const [gpStarModel, setGpStarModel] = useState(false);
  // const [discount, setDiscount] = useState<number>(0);

  //  Package Function Called

  const init = async () => {
    try {
      setLoading(true);
      scrollToTop()
      const { data } = await apiCall(
        Methods.GET,
        `${EndPoint.PACKAGE_FIND_BY_ID}/${packageId}?variationId=${packagevariation}`,
      );
      // console.log(data);
      setPackageVar(data?.packageVariation?.[0] || null);
      setAmount(data.packageVariation?.[0]?.sellingPrice);
      setPackage(data);
      const userId = await getUserID();
      const userAuthentication = await isAuthenticate();
      if (userId && userAuthentication) {
        const singleUser = await apiCall(
          Methods.GET,
          `${EndPoint.SINGLE_USER}/${userId}`,
        );
        // console.log(singleUser);
        if (singleUser.data.phone) {
          let value = {
            phone: singleUser.data.phone,
          };
          const checkgployality = await apiCall(
            Methods.POST,
            EndPoint.GP_LOYALITY_CHECK,
            value,
          );

          // console.log(checkgployality);
          if (checkgployality.success) {
            setGpLoyalityDiscount(checkgployality.data);
            setGPLoyalityUser(true);
            const discountPercent = checkgployality.data.discountPercent;
            const sellingPrice = data.packageVariation[0].sellingPrice;
            const discount = (sellingPrice * discountPercent) / 100;
            const finalPrice = sellingPrice - discount;
            setAmount(finalPrice);
            setTimeout(() => {
              setGpStarModel(true);
            }, 2000);
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //Handle Payment Infomation
  const handleOnlinePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setBraccard(false);
    const values = e.target.value;
    // if (values === "card") {
    //   let carddiscountvalue = Math.ceil(Number(packageVar?.sellingPrice) * 0.8);
    //   setAmount(Math.min(carddiscountvalue, Amount));
    // } else {

    // }
    if (couponData) {
      setAmount(Math.min(Number(packageVar?.sellingPrice), Amount));
    } else {
      if (!GPLoyalityUser) {
        setAmount(Number(packageVar?.sellingPrice));
      }
    }
    setOnlinePayment(values);
  };

  const showModal: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSignInPage(!signInPage);
  };

  //   Handle Checkout FOr Payment
  const handleCheckout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setButtonLoading(true);
      const userId = await getUserID();
      const userAuthentication = await isAuthenticate();
      if (!userAuthentication && !userId) {
        setSignInPage(true);
        return;
      }
      await PakagePayment({
        userId,
        router,
        gift: gift ?? undefined,
        packageId,
        packagevariation,
        phonenumber: phonenumber ?? undefined,
        onlinePayment,
        Amount,
        packagetitle: packagetitle ?? undefined,
        couponData: couponData ?? undefined,
        bracCardDiscount: bracCardDiscount ?? undefined,
        countryCode: countryCode ?? undefined,
        dialCode: dialCode ?? undefined,
        fullname: fullname ?? undefined,
        GPLoyalityUser: GPLoyalityUser,
        GpLoyalityDiscount: GpLoyalityDiscount,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleCouponCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCouponCode(e.target.value);
  };

  const handleApplyCouponCode = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    try {
      e.preventDefault();
      const userId = await getUserID();
      const userAuthentication = await isAuthenticate();
      if (!userAuthentication && !userId) {
        setSignInPage(true);
        return;
      }
      const { data } = await apiCall(
        Methods.GET,
        `${EndPoint.SINGLE_USER}/${userId}`,
      );
      if (!data.email) {
        toast.warn(
          "Please add your email address before purchasing a package.",
        );
        router.replace("/account");
        return;
      }

      let value: any;
      value = {
        userId: userId ?? "",
        variationId: packagevariation ?? "",
        promoType: "pak",
        code: couponCode.toUpperCase(),
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.PROMO_CODE_CHECK,
        value,
      );
      // console.log(response);

      if (response.success) {
        setGPLoyalityUser(false);
        // setCouponCodeApply(true);
        setCouponData(response.data);
        toast.success(
          `${response.data.discountPercent}% Discount in the Package`,
        );
        const discount = response.data.discountPercent;
        let originalPrice = Number(packageVar?.sellingPrice);
        let discountedAmount = originalPrice * (1 - discount / 100);
        let value = Math.min(Number(discountedAmount), originalPrice);

        // console.log(value);
        if (Amount > value) {
          setAmount(Math.ceil(value));
        } else {
          setAmount(Math.ceil(Amount));
        }
        // setAmount(Number(Math.ceil(value)));
      } else {
        toast.warn(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBracCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBraccard(!braccard);
  };

  const handleBracCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBracCardNumber(e.target.value);
  };

  const handleApplyBracCard = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    try {
      const userId = await getUserID();
      const userAuthentication = await isAuthenticate();
      if (!userAuthentication && !userId) {
        setSignInPage(true);
        return;
      }
      const value = {
        code: bracCardNumber,
        variationId: packagevariation,
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.CARD_DICOUNT_CHECK,
        value,
      );
      setBracCardDiscount(response.data);
      // console.log(response);
      if (response.success) {
        setErrorMessage(false);
        if (response.data.discountPercent) {
          const discount = response.data.discountPercent;
          let originalPrice = Number(packageVar?.sellingPrice);
          const disCountPrice = originalPrice * (1 - Number(discount) / 100);
          const price = Math.min(disCountPrice, originalPrice);
          if (Amount > price) {
            setAmount(price);
          } else {
            setAmount(Amount);
          }
        }
      } else {
        setErrorMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect Called
  useEffect(() => {
    init();
  }, []);

  return loading ? (
    <PageLoading />
  ) : (
    <>
      <section className=" xl:container xl:mx-auto lg:pt-4 xl:pt-6 2xl:pt-10 pt-2 grid grid-cols-1 lg:grid-cols-2  lg:gap-5 gap-3 px-3 lg:px-5 xl:px-7 2xl:px-10 min-h-[70vh] ">
        {/* Form */}

        <aside className="min-h-[70vh] ">
          <div className="flex flex-col space-y-3 md:px-6 md:py-2 border rounded-t-md shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] h-full ">
            {/* {spackage && <SinglePackage data={spackage} language={language} />} */}
            {spackage && (
              <Suspense fallback={<div className="h-full">Loading..</div>}>
                <CheckoutPackage data={spackage} />
              </Suspense>
            )}
          </div>
        </aside>
        <aside className="min-h-[70vh] ">
          <div
            className={`p-6 border rounded-lg shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)]  h-full  flex flex-col justify-between`}
          >
            <div>
              <div className="pb-2">
                <label htmlFor="Promo" className="text-lg font-medium">
                  {t("UseaPromo")}
                </label>
                <div className="flex items-center justify-between border rounded-md ">
                  <input
                    type="text"
                    className="p-2 outline-none md:w-[70%]"
                    placeholder={t("EnterCoupon")}
                    value={couponCode}
                    onChange={handleCouponCode}
                  />

                  <button
                    onClick={handleApplyCouponCode}
                    className="p-2 bg-[#EB148C] rounded-md text-white font-medium"
                  >
                    {t("ApplyCoupon")}
                  </button>
                </div>
              </div>
              <hr className="my-2 border border-gray-400" />
              <h2 className="mb-2 text-lg font-medium">
                {t("choose_payment_option")}
              </h2>
              <label
                htmlFor="bkash"
                className="flex items-center justify-between p-2 mt-2 mb-3 border rounded-lg cursor-pointer"
              >
                <div className="flex items-center w-full">
                  <input
                    type="radio"
                    id="bkash"
                    name="onlinepayment"
                    value="bkash"
                    className="cursor-pointer accent-pink-500"
                    checked={onlinePayment === "bkash"}
                    onChange={handleOnlinePayment}
                  />
                  <span className="ml-2 text-sm font-medium text-[#16020B] w-full">
                    {t("bkash_payment")}
                  </span>
                </div>

                <Image
                  src="/services/Bkash.svg"
                  alt="bKash logo"
                  className="h-8 w-14"
                  width={56}
                  height={32}
                />
              </label>

              <label
                htmlFor="card"
                className="flex items-center justify-between p-2 border rounded-lg cursor-pointer"
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="card"
                    name="onlinepayment"
                    value="card"
                    className="cursor-pointer accent-pink-500"
                    checked={onlinePayment === "card"}
                    onChange={handleOnlinePayment}
                  />
                  <span className="ml-2 text-sm font-medium text-[#16020B]">
                    {t("card_payment")}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Image
                    src="/services/Card.svg"
                    alt="MasterCard logo"
                    className="w-24 h-8"
                    width={70}
                    height={42}
                  />
                </div>
              </label>

              {onlinePayment === "card" && (
                <div className="flex flex-col p-2 mt-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <label htmlFor="braccard" className="w-full cursor-pointer">
                      <Trans
                        i18nKey="braccard"
                        components={{
                          span: (
                            <span className="font-semibold text-[#EB148C]" />
                          ),
                        }}
                      />
                    </label>
                    <input
                      type="checkbox"
                      name="braccard"
                      id="braccard"
                      checked={braccard}
                      className="cursor-pointer accent-pink-500 size-4"
                      onChange={handleBracCard}
                    />
                  </div>
                  {braccard && (
                    <div className="flex items-center justify-between mt-2.5 ">
                      <input
                        type="text"
                        className="p-2 outline-none md:w-[70%]  border-2 rounded-[4px] "
                        placeholder={t("cardplaceholder")}
                        value={bracCardNumber}
                        onChange={handleBracCardNumber}
                        name="braccard"
                      />

                      <button
                        onClick={handleApplyBracCard}
                        className="p-2 bg-[#EB148C] rounded-[4px] text-white font-medium"
                      >
                        {t("GetDiscount")}
                      </button>
                    </div>
                  )}
                </div>
              )}

              <hr className="my-2 border border-gray-400" />

              {/* {onlinePayment === "bkash" && (
              <p className="inline-block px-3 py-1 text-sm text-green-600 border border-green-300 rounded bg-green-50">
                {t("cardpayment")}
              </p>
            )} */}
              {errorMessage && (
                <p className="inline-block px-3 py-1 text-sm text-red-600 border border-red-300 rounded bg-red-50">
                  {t("invalidCode")}
                </p>
              )}
              {bracCardDiscount && onlinePayment === "card" && (
                <p className="inline-block px-3 py-1 text-sm text-green-600 border border-green-300 rounded bg-green-50">
                  {t("bracCardDiscount", {
                    count: Number(bracCardDiscount.discountPercent),
                  })}
                </p>
              )}

              <div className="flex justify-between p-2 mt-3 border rounded-lg">
                <p className="text-base">{t("total_price")}</p>
                {/* <p className="">{packageVar?.sellingPrice}</p> */}
                <div>
                  <p>
                    {" "}
                    {t("moneyCount", {
                      count: Number(Amount),
                    })}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={buttonLoading}
              className="py-3 w-full mt-10 rounded-md bg-[#EB148C] text-center text-white text-base font-medium"
            >
              {buttonLoading ? t("payment.loading") : t("Checkout")}
            </button>
          </div>
        </aside>
        <Modal size="sm" open={signInPage} onClose={showModal}>
          <Modal.Header>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignIn />
          </Modal.Body>
        </Modal>
      </section>
      <Modal
        open={gpStarModel}
        onClose={() => setGpStarModel(false)}
        size={"sm"}
      >
        <Modal.Header>
          <p className="text-center text-lg font-semibold">{t("gp.title")}</p>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            {/* Congruatulations you get a {GpLoyalityDiscount.discountPercent} %
            discount */}
            {GpLoyalityDiscount &&
              t("gp.description", {
                count: GpLoyalityDiscount.discountPercent,
              })}
          </p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setGpStarModel(false)}
              className="rounded-md hover:no-underline hover:text-white px-6 py-2 text-white text-sm bg-[#EB148C]"
            >
              {t("gp.button")}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PackageCheckout;
