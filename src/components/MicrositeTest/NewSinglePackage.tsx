"use client";
import React, { useEffect, useState } from "react";
import {
  NewBronze,
  newGold,
  newSilver,
  PackageInterface,
  PackageVariation,
  teleMedicine,
} from "./Interface";
import { useRouter, useSearchParams } from "next/navigation";
import { Modal } from "rsuite";
import Image from "next/image";
import { Trans, useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa6";
import TableTACBangla from "../Package/TableTACBangla";
import TableTAC from "../Package/TableTAC";
import PackageInstantDoctorbn from "../Package/PackageInstantDoctorbn";
import PackageInstantDoctor from "../Package/PackageInstantDoctor";

const NewSinglePackage = ({ data }: { data: PackageInterface }) => {
  // const searchParams = useSearchParams();
  const [model, setModel] = useState(false);
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const [defaultplan, setDefaultplan] = useState<string>(
    data?.packageVariation?.[0]
      ? `${data.packageVariation[0].duration}/${data.type}`
      : ""
  );
  const [packageVar, setPackageVar] = useState<PackageVariation | null>(
    data?.packageVariation?.[0] || null
  );

  const imgSrc =
    data.type === "bronze"
      ? NewBronze
      : data.type === "silver"
      ? newSilver
      : data.type == "telemedicine"
      ? teleMedicine
      : newGold;

  // Action
  const handleDurationCheck = async (
    e: React.ChangeEvent<HTMLInputElement>,
    item: PackageVariation
  ) => {
    setDefaultplan(e.target.value);
    setPackageVar(item);
  };

  const handleRoute = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(
      `/microsite-test/micpackagecheckout?packageId=${data?._id}&packageTitle=${data?.type}&variationId=${packageVar?._id}`
    );
    
  };

  const handleOpenButton: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModel(!model);
  };

  useEffect(() => {
    if (data.type === "telemedicine") {
      setDefaultplan(
        data?.packageVariation?.[1]
          ? `${data.packageVariation[1].duration}/${data.type}`
          : ""
      );
      setPackageVar(data?.packageVariation?.[1] || null);
    }
  }, []);

  return (
    <>
      <div
        className={`bg-[#FFF4F4] border min-w-[300px] max-w-[320px]
  w375:min-w-[340px] w375:max-w-[350px]
  w430:min-w-[390px] w430:max-w-[400px]  h-full flex flex-col rounded-[14px] ${
    data.type === "gold" ? "rounded-b-[14px]" : "rounded-[14px]"
  }`}
      >
        <div className="relative flex  items-center">
          <Image
            src={imgSrc}
            alt={data?.type ?? ""}
            width={504}
            height={561}
            className={`object-cover h-[170px] w-full rounded-t-[14px] ${
              data.type == "gold" ? "" : "rounded-t-[14px]"
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
                {t(data?.type ?? "")}
              </span>
              /
              <span className="text-[9px]  font-medium">
                {t(packageVar?.duration ?? "")}
              </span>
            </p>{" "}
          </div>
          {data.type == "gold" && (
            <div className="absolute top-0 right-0 w-[40%] bg-white bg-opacity-80   rounded-tr-xl rounded-bl-full">
              <p className="text-black text-center text-sm font-semibold p-0.5 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 animate-gradient">
                Most Popular
              </p>
            </div>
          )}
        </div>
        <div className="p-3 text-justify flex-row h-full ">
          <p className=" capitalize mb-1 text-sm">
            <span className="font-medium">
              {t("moneyCount", { count: packageVar?.sellingPrice ?? 0 })}
            </span>
          </p>

          <div className=" border-y-2 p-1 py-2 flex justify-between items-center border-[#D9D9D9]">
            {data?.packageVariation?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-2 text-xs"
              >
                <input
                  type="radio"
                  name={`${item.duration}/${data.type}`}
                  id={`${item.duration}/${data.type}`}
                  className="cursor-pointer accent-pink-500"
                  // checked
                  value={`${item.duration}/${data.type}`}
                  checked={defaultplan === `${item.duration}/${data.type}`}
                  onChange={(e) => handleDurationCheck(e, item)}
                />
                <label
                  htmlFor={`${item.duration}/${data.type}`}
                  className="capitalize cursor-pointer"
                >
                  {t(item?.duration ?? "")}
                </label>
              </div>
            ))}
          </div>

          <div className="flex flex-col space-y-1 my-2 min-h-[150px]">
            {data.title && data.title?.length > 0 && (
              <h3 className="flex items-center space-x-1.5 text-xs font-medium">
                {i18n.language === "bn" ? data.bnTitle : data.title}
              </h3>
            )}

            <p className="flex items-center space-x-1.5 text-xs pt-1.5 ">
              <span className="bg-[#16020B] p-0.5">
                <FaCheck className="text-white" size={11} />
              </span>
              <span>
                {i18n.language === "bn"
                  ? packageVar?.bnTitle
                  : packageVar?.title}
              </span>
            </p>

            {data.type == "telemedicine" && (
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

          <div className="flex flex-col items-center justify-center mt-2 ">
            <button
              // href={`/healthPackage/checkout?packageId=${data?._id}&packageTitle=${data?.type}&variationId=${packageVar?._id}`}
              onClick={handleOpenButton}
              className="bg-[#EB148C] rounded-md text-white text-sm 2xl:text-base px-4 py-1.5"
            >
              {t("Buy Now")}
            </button>
          </div>

          <span className="text-[9px] flex justify-end items-end text-gray-500">
            * {t("conditionapply")}
          </span>
        </div>
      </div>
      <Modal size="lg" open={model} onClose={handleOpenButton}>
        <Modal.Header>
          <Modal.Title>
            {" "}
            <p className=" text-xl font-semibold text-[#16020B] text-center">
              {t("package_includes")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.type == "telemedicine" ? (
            i18n.language == "bn" ? (
              <PackageInstantDoctorbn
                gift={"false"}
                data={data}
                defaultplan={defaultplan}
                packageVar={packageVar}
              />
            ) : (
              <PackageInstantDoctor
                gift={"false"}
                data={data}
                defaultplan={defaultplan}
                packageVar={packageVar}
              />
            )
          ) : i18n.language == "bn" ? (
            <TableTACBangla
              gift={"false"}
              data={data}
              defaultplan={defaultplan}
              packageVar={packageVar}
            />
          ) : (
            <TableTAC
              gift={"false"}
              data={data}
              defaultplan={defaultplan}
              packageVar={packageVar}
            />
          )}
          {/* <button>Submit</button> */}
          <div className="flex justify-center mt-3">
            <button
              onClick={handleRoute}
              className="w-[159px] h-10 py-[11px] rounded-lg font-medium border border-black hover:border-[#E2136E] hover:text-white text-center flex justify-center items-center hover:bg-[#E2136E]"
            >
              {t("Buy Package")}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewSinglePackage;
