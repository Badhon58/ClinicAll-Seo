"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import CryptoJS from "crypto-js";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
const encryptText = (phone: string) => {
  const hash = CryptoJS.HmacSHA256(
    phone,
    process.env.NEXT_PUBLIC_CLINICALL_SECRET_CODE!
    // "Badhon Biswas"
  );
  const signature = CryptoJS.enc.Base64.stringify(hash);
  return signature;
};
const Auth = () => {
  const [status, setStatus] = useState("create");
  const [createbuttonLoading, setCreatebuttonLoading] = useState(false);
  const [buttonLoading2, setButtonLoading2] = useState(false);
  const [message, setMessage] = useState<string | null>();
  const [otp, setOtp] = useState<string>();
  const { t } = useTranslation();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [reload, setReload] = useState(false);
  const [phoneData, setPhoneData] = useState({
    countryCode: "",
    dialCode: "",
    phone: "",
  });

  const handlePhoneChange = (value: string, country: any) => {
    let phoneWithoutDialCode = value.replace(`+${country.dialCode}`, "").trim();
    setPhoneData({
      countryCode: country.countryCode.toUpperCase(),
      dialCode: country.dialCode,
      phone: phoneWithoutDialCode.startsWith(country.dialCode)
        ? phoneWithoutDialCode.slice(country.dialCode.length)
        : phoneWithoutDialCode,
    });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement> | any) => {
    try {
      e.preventDefault();
      setCreatebuttonLoading(true);
      let millisecound = Date.now();
      let randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
      let phone_random_milisecound = `${phoneData.phone}:${randomNumber}:${millisecound}`;
      let finalvalue = {
        ...phoneData,
        phone: phone_random_milisecound,
        country: encryptText(phone_random_milisecound),
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.USEROTPSIGNIN,
        finalvalue
      );
      if (response.success) {
        setStatus("done");
        setMessage(null);
        toast.success(response.message);
      } else {
        setMessage(response.response.data.message);
        setCreatebuttonLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCreatebuttonLoading(false);
    }
  };

  const checkOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setButtonLoading2(true);
      const value = {
        dialCode: phoneData.dialCode,
        phone: phoneData.phone,
        otp: otp,
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.USEROTPCHECK,
        value
      );
      if (response.success) {
        localStorage.setItem("userToken", response.data.accessToken);
        localStorage.setItem("userID", response.data._id);
        localStorage.setItem("userPhone", response.data.phone);
        localStorage.setItem("userDialCode", response.data.dialCode);
        localStorage.setItem(
          "userName",
          response.data.firstName + " " + response.data.lastName
        );
        localStorage.setItem("userImage", response.data.image);

        window.location.reload();
      } else {
        setMessage(response.message);
        setButtonLoading2(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading2(false);
    }
  };

  return (
    <>
      {status === "create" ? (
        <>
          <p className=" text-base font-semibold text-center">{t("Login")}</p>
          <p className="text-center text-sm text-gray-600 mb-2">
            {t("enterDetails")}
          </p>
          <form className="w-11/12 mx-auto" action="" onSubmit={handleSignIn}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("phoneNumber")}
              </label>
              <PhoneInput
                country={"bd"}
                // disableCountryCode={false}
                onChange={handlePhoneChange}
                inputStyle={{ width: "100%" }}
              />
            </div>
            <button
              disabled={createbuttonLoading}
              type="submit"
              className="flex justify-center w-full mt-4 px-4 py-2 text-xs font-medium text-white bg-[#EB148C] border border-transparent rounded-md shadow-sm  focus:outline-pink-500"
            >
              {createbuttonLoading ? "Loading..." : t("Verify")}
            </button>
            {message?.length! > 0 && (
              <span className="text-[10px] text-red-400">{message}</span>
            )}
          </form>
        </>
      ) : (
        <>
          <div className=" mb-2">
            <h2 className="mb-1 text-sm font-[550] text-center">
              {t("otpVerification")}
            </h2>
            <p className="text-xs text-slate-500 text-center">
              {t("verificationCodeMessage")}
            </p>
          </div>
          <form action="" onSubmit={checkOtp}>
            <div className="flex items-center justify-center gap-3">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "50px",
                  height: "50px",
                  outline: "none",
                  border: "1px solid",
                  marginLeft: "5px",
                  marginRight: "5px",
                  fontSize: "24px",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div className="max-w-[260px] mx-auto mt-4 ">
              <button
                type="submit"
                className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#EB148C] px-3.5 py-2.5 text-xs font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-pink-400 focus:outline-none focus:ring focus:ring-pink-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
              >
                {buttonLoading2 ? "Loading..." : t("Verify")}
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-center text-slate-500">
            {t("didntReceiveCode")}{" "}
            {isResendDisabled ? (
              <span className="font-medium text-gray-400">
                {t("Resend")} in {timer}s
              </span>
            ) : (
              <button
                onClick={handleSignIn}
                className="font-medium text-[#EB148C] hover:text-[#EB148C]"
                disabled={isResendDisabled}
              >
                {t("Resend")}
              </button>
            )}
          </div>
          {message?.length! > 0 && (
            <span className="text-[10px] text-red-400">{message}</span>
          )}
        </>
      )}
    </>
  );
};

export default Auth;
