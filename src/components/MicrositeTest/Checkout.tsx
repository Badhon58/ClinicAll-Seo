"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PageLoading from "../Seo/PageLoading";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import {
  NewBronze,
  newGold,
  newSilver,
  PackageInterface,
  PackageVariation,
  teleMedicine,
} from "./Interface";
import NewSinglePackage from "./NewSinglePackage";
import Image from "next/image";
import { Trans, useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa6";
import { Payment } from "./Payment";
import { getUserID, isAuthenticate } from "@/lib/authHandler";
import { Modal } from "rsuite";
import Auth from "./Auth";

const Checkout = () => {
  const [loginModel, setLoginModel] = useState(false);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const title = searchParams.get("packageTitle");
  const packageId = searchParams.get("packageId");
  const packageVariationId = searchParams.get("variationId");
  const [spackage, setPackage] = useState<PackageInterface>();
  const [packageVar, setPackageVar] = useState<PackageVariation | null>();
  const [Amount, setAmount] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string>();
  const { t, i18n } = useTranslation();
  const [onlinePayment, setOnlinePayment] = useState("bkash");
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();
  const init = async () => {
    try {
      setLoading(true);
      const { data } = await apiCall(
        Methods.GET,
        `${EndPoint.PACKAGE_FIND_BY_ID}/${packageId}?variationId=${packageVariationId}`
      );
      // console.log(data);
      setPackageVar(data?.packageVariation?.[0] || null);
      setAmount(data.packageVariation?.[0]?.sellingPrice);
      setPackage(data);
      let packVar = data?.packageVariation?.[0] || null;
      const imgSrc =
        packVar.type === "bronze"
          ? NewBronze
          : packVar?.type === "silver"
          ? newSilver
          : packVar?.type == "telemedicine"
          ? teleMedicine
          : newGold;
      setImgSrc(imgSrc);
      const usertoken = await isAuthenticate();
      const userId = await getUserID();
      if (!usertoken && !userId) {
        setLoginModel(!loginModel);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnlinePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    setOnlinePayment(e.target.value);
  };

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setButtonLoading(true);
      const response = await Payment(
        title,
        packageId,
        packageVariationId,
        Amount,
        onlinePayment,
        router
      );
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);
  return loading ? (
    <PageLoading />
  ) : (
    <section className=" pb-4 pt-2 bg-white bg-opacity-35 ">
      <div className="relative flex  items-center">
        <Image
          src={imgSrc ?? "/homelogo/logo_text.svg"}
          alt={spackage?.type ?? ""}
          width={504}
          height={561}
          className={`object-cover h-[170px] w-full ${
            spackage?.type == "gold" ? "" : ""
          }`}
        />
        <div className="absolute top-0 h-full flex justify-between flex-col">
          <Image
            src={"/services/HeroImage2.svg"}
            alt="Package Image"
            width={50}
            height={100}
            className="pl-3 w-32 h-32"
          />
          <p className=" pl-3 capitalize  mb-6 bg-white bg-opacity-70 text-black  rounded-r-full pr-2">
            <span className=" text-sm  font-semibold">
              {" "}
              {t(spackage?.type ?? "")}
            </span>
            /
            <span className="text-[9px]  font-medium">
              {t(packageVar?.duration ?? "")}
            </span>
          </p>{" "}
        </div>
        {spackage?.type == "gold" && (
          <div className="absolute top-0 right-0 w-[40%] bg-white bg-opacity-80   rounded-tr-xl rounded-bl-full">
            <p className="text-black text-center text-sm font-semibold p-0.5 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 animate-gradient">
              Most Popular
            </p>
          </div>
        )}
      </div>
      <div className="text-justify flex-row h-full pt-2 p-3  ">
        <p className=" capitalize mb-1 text-sm">
          <span className="font-medium">
            {t("moneyCount", { count: packageVar?.sellingPrice ?? 0 })}
          </span>
        </p>
        <div className="flex items-center border-y py-3 space-x-2 text-xs">
          <input
            type="radio"
            name={`${packageVar?.duration}/${spackage?.type}`}
            className="cursor-pointer accent-pink-500"
            // checked={true}
            defaultChecked
            readOnly
          />
          <label
            htmlFor={`${packageVar?.duration}/${spackage?.type}`}
            className="capitalize cursor-pointer"
          >
            {t(packageVar?.duration ?? "")}
          </label>
        </div>
      </div>
      <div className="flex flex-col space-y-1 my-2 min-h-[150px] px-3">
        {spackage?.title && spackage?.title?.length > 0 && (
          <h3 className="flex items-center space-x-1.5 text-xs font-medium">
            {i18n.language === "bn" ? spackage?.bnTitle : spackage?.title}
          </h3>
        )}

        <p className="flex items-center space-x-1.5 text-xs pt-1.5 ">
          <span className="bg-[#16020B] p-0.5">
            <FaCheck className="text-white" size={11} />
          </span>
          <span>
            {i18n.language === "bn" ? packageVar?.bnTitle : packageVar?.title}
          </span>
        </p>

        {spackage?.type == "telemedicine" && (
          <p className="flex items-center space-x-1.5 text-[11.5px]">
            <span className="bg-[#16020B] p-0.5">
              <FaCheck className="text-white" size={11} />
            </span>
            <span>{t("telemedicinetext")}</span>
          </p>
        )}

        {packageVar?.hospitalCashback && (
          <p className="flex items-center space-x-1.5 text-[11.5px]">
            <span className="bg-[#16020B] p-0.5">
              <FaCheck className="text-white" size={11} />
            </span>
            <span>
              {/* {t("hospital_cashback_package", {
                          count: packageVar?.hospitalCashback ?? 0,
                        })} */}
              <Trans
                i18nKey="hospital_cashback_package"
                values={{ count: packageVar?.hospitalCashback ?? 0 }}
                components={{
                  bold: (
                    <strong className="font-normal text-[15px] text-gray-900" />
                  ),
                }}
              />
            </span>
          </p>
        )}

        {packageVar?.perClaimBenefit && (
          <p className="flex items-center space-x-1.5 text-[11.5px]">
            <span className="bg-[#16020B] p-0.5">
              <FaCheck className="text-white" size={11} />
            </span>
            <span>
              {t("per_claim_benefit")}{" "}
              <strong className="font-normal text-[15px] text-gray-900">
                {t("moneyCount", {
                  count: packageVar?.perClaimBenefit ?? 0,
                })}
              </strong>
            </span>
          </p>
        )}

        {packageVar?.perDayBenefit && (
          <p className="flex items-center space-x-1.5 text-[11.5px]">
            <span className="bg-[#16020B] p-0.5">
              <FaCheck className="text-white" size={11} />
            </span>
            <span>
              {t("per_day_benefit")}{" "}
              <strong className="font-normal text-[15px] text-gray-900">
                {t("moneyCount", {
                  count: packageVar?.perDayBenefit ?? 0,
                })}
              </strong>
            </span>
          </p>
        )}

        {packageVar?.isolationCoverage && (
          <p className="flex items-center space-x-1.5 text-[11.5px]">
            <span className="bg-[#16020B] p-0.5">
              <FaCheck className="text-white" size={11} />
            </span>
            <span>
              {t("isolation_coverage")}{" "}
              <strong className="font-normal text-[15px] text-gray-900">
                {t("moneyCount", {
                  count: packageVar?.isolationCoverage ?? 0,
                })}
              </strong>
            </span>
          </p>
        )}

        {packageVar?.opd && (
          <p className="flex items-center space-x-1.5 text-[11.5px]">
            <span className="bg-[#16020B] p-0.5">
              <FaCheck className="text-white" size={11} />
            </span>
            <span>
              {t("opd_consultation")}{" "}
              <strong className="font-normal text-[15px] text-gray-900">
                {t("moneyCount", { count: packageVar?.opd ?? 0 })}
              </strong>
            </span>
          </p>
        )}
      </div>
      <div className=" p-3">
        <div className="  rounded-md p-3 shadow-[0px_0px_13px_2px_rgba(0,_0,_0,_0.1)]">
          <h2 className="mb-2 text-sm font-medium">
            {t("choose_payment_option")}
          </h2>
          <div className="flex items-center justify-between p-2 mt-2 mb-3 border rounded-lg">
            <div className="flex items-center w-full ">
              <input
                type="radio"
                id="bkash"
                name="onlinepayment"
                value="bkash"
                className="cursor-pointer accent-pink-500"
                checked={onlinePayment === "bkash"}
                onChange={handleOnlinePayment}
              />
              <label
                htmlFor="bkash"
                className="ml-2 text-xs font-medium text-[#16020B] cursor-pointer  w-full"
              >
                {t("bkash_payment")}
              </label>
            </div>
            <Image
              src="/services/Bkash.svg"
              alt="bKash logo"
              className="h-8 w-14"
              width={56}
              height={32}
            />
          </div>
          <div className="flex items-center justify-between p-2 border rounded-lg">
            <div className="flex items-center w-full">
              <input
                type="radio"
                id="card"
                name="onlinepayment"
                value="card"
                className="cursor-pointer accent-pink-500"
                checked={onlinePayment === "card"}
                onChange={handleOnlinePayment}
              />
              <label
                htmlFor="card"
                className="ml-2 text-xs font-medium text-[#16020B] cursor-pointer  w-full"
              >
                {t("card_payment")}
              </label>
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
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end px-3">
        <button
          onClick={handlePayment}
          className="bg-[#EB148C] rounded-md text-white text-xs px-7 py-2.5"
        >
          {buttonLoading ? t("payment.loading") : t("Checkout")}
        </button>
      </div>
       <Modal
        size={"sm"}
        open={loginModel}
        // onClose={() => setLoginModel(!loginModel)}
      >
        {/* <Modal.Header></Modal.Header> */}
        <Modal.Body>
          <Auth />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Checkout;
