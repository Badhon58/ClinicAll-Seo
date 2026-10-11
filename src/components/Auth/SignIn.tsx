"use client";
import { EndPoint, JsonHeader, Methods } from "@/api/config";
import { apiCall } from "@/lib/axios-client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import OTPInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import Link from "next/link";

const SignIn = () => {
  const { t } = useTranslation();
  const [phoneData, setPhoneData] = useState({
    countryCode: "",
    dialCode: "",
    phone: "",
  });
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonLoading2, setButtonLoading2] = useState(false);
  const [status, setstatus] = useState("create");
  const [otp, setOtp] = useState<string>();
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  //   Otp OnChangeing on mobile number selection
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

  const encryptText = (phone: string) => {
    const hash = CryptoJS.HmacSHA256(
      phone,
      process.env.NEXT_PUBLIC_CLINICALL_SECRET_CODE!
      // "Badhon Biswas"
    );
    const signature = CryptoJS.enc.Base64.stringify(hash);
    return signature;
  };

  const startTimer = () => {
    setTimer(60); // 60 seconds
    setIsResendDisabled(true);
  };
  //   Otp Creation  on mobile number
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    try {
      setButtonLoading(true);
      if (!phoneData.phone && phoneData.phone.length === 0) {
        toast.info("Please Enter A Valid Number", { hideProgressBar: true });
        return
      }
      let millisecound = Date.now();
      let randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
      let phone_random_milisecound = `${phoneData.phone}:${randomNumber}:${millisecound}`;
      let finalvalue = {
        ...phoneData,
        phone: phone_random_milisecound,
        country: encryptText(phone_random_milisecound),
      };
      // console.log(finalvalue);

      // return;

      const response = await apiCall(
        Methods.POST,
        EndPoint.USEROTPSIGNIN,
        finalvalue,
        JsonHeader
      );
      if (response.success) {
        setstatus("done");
        toast.success(response.message, { hideProgressBar: true });
        //  console.log(response);
        startTimer();
      } else {
        toast.error(response.response.data.message, { hideProgressBar: true });
        //  console.log(response.response);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  const checkOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setButtonLoading2(true);
      if (!otp || otp.length === 0) {
        toast.info("Please Enter The OTP", { hideProgressBar: true });
        return
      }
      const value = {
        dialCode: phoneData.dialCode,
        phone: phoneData.phone,
        otp: otp,
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.USEROTPCHECK,
        value,
        JsonHeader
      );
      if (response.success) {
        localStorage.setItem("userToken", response.data.accessToken);
        localStorage.setItem("userID", response.data._id);
        // router.replace("/account");
        window.location.reload();
        toast.success(response.message, { hideProgressBar: true });
      } else {
        toast.error(response.message, { hideProgressBar: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading2(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <section className=" flex items-center justify-center mx-auto mt-2 ">
      <div className="bg-white p-3 md:p-8 rounded-lg w-full ">
        {status === "create" ? (
          <>
            <p className=" text-2xl font-semibold text-center">{t("Login")}</p>
            <p className="text-center text-gray-600 mb-2">
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
                disabled={buttonLoading}
                type="submit"
                className="flex justify-center w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-[#EB148C] border border-transparent rounded-md shadow-sm  focus:outline-pink-500"
              >
                {buttonLoading ? "Loading..." : t("Verify")}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="">
              <h2 className="mb-1 text-2xl font-[550] text-center">
                {t("otpVerification")}
              </h2>
              <p className="text-[15px] text-slate-500 text-center">
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
                  renderInput={(props) => (
                    <input
                      {...props}
                      type="tel"
                      inputMode="numeric"
                      pattern="\d*"
                    />
                  )}
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
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#EB148C] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-pink-400 focus:outline-none focus:ring focus:ring-pink-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                >
                  {buttonLoading2 ? "Loading..." : t("Verify")}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-center text-slate-500">
              {t("didntReceiveCode")}{" "}
              {isResendDisabled ? (
                <span className="font-medium text-gray-400">
                  {t("resend")} in {timer}s
                </span>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="font-medium text-[#EB148C] hover:text-[#EB148C]"
                  disabled={isResendDisabled}
                >
                  {t("resend")}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SignIn;
