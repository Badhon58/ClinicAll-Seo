import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { clearLocalStorage, validatePhoneNumber } from "../Auth/AuthLib";
import { toast } from "react-toastify";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, JsonHeader, Methods } from "@/api/config";
import { getUserID, isAuthenticate } from "@/lib/authHandler";
import OTPInput from "react-otp-input";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useRouter } from "next/navigation";
interface initialState {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}
const RegisterLib = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [passwordMessage, setpasswordMessage] = useState("");
  const [passwordValid, setpasswordValid] = useState<boolean>();
  const [passwordView, setPasswordView] = useState(false);
  const { t } = useTranslation();

  const [values, setValues] = useState<initialState>({
    firstName: "",
    lastName: "",
    phone: phoneNumber,
    password: "",
  });

  const [status, setstatus] = useState<string>("create");
  const router = useRouter();
  // For Mobile Number and  OTP Creating
  const handleMobileNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPhoneNumber(e.target.value);
  };

  //OTP Creation
  const handleSubmit = async (e: React.MouseEvent<any>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const cleanPhoneNumber = phoneNumber.startsWith("+88")
        ? phoneNumber.slice(3)
        : phoneNumber;
      if (!validatePhoneNumber(cleanPhoneNumber)) {
        toast.error("Insert a valid mobile number", {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
        return;
      }
      const value = {
        phone: cleanPhoneNumber,
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.OTPCREATE,
        value,
        JsonHeader
      );
      if (response.success == true) {
        toast.success(response.message, {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
        setstatus("check");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  // For Check OTP
  const checkOtp = async (e: React.MouseEvent<any>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const cleanPhoneNumber = phoneNumber.startsWith("+88")
        ? phoneNumber.slice(3)
        : phoneNumber;
      if (phoneNumber && otp) {
        const value = {
          phone: cleanPhoneNumber,
          otp: parseInt(otp.toString()),
        };
        const response = await apiCall(
          Methods.POST,
          EndPoint.OTPCHECK,
          value,
          JsonHeader
        );
        if (response.success == true) {
          toast.success("OTP verified successfully.", {
            position: "top-right",
            hideProgressBar: true,
            autoClose: 3000,
          });
          setstatus("done");
          setValues((prev) => ({
            ...prev,
            phone: cleanPhoneNumber,
          }));
        } else {
          toast.error("Invalid OTP. Try again or request a new one.", {
            position: "top-right",
            hideProgressBar: true,
            autoClose: 3000,
          });
          setOtp("");
        }
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  // For Register User
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/;
    if (name == "password") {
      if (!passwordRegex.test(value)) {
        setpasswordMessage(
          "Password must include a letter, number, and special character"
        );
        setpasswordValid(false);
      } else {
        setpasswordMessage("");
        setpasswordValid(true);
      }
    }
    setValues({ ...values, [name]: value });
  };

  const showPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordView(!passwordView);
  };

  const loginUser = async () => {
    try {
      const value = {
        phone: phoneNumber,
        password: values.password,
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.SIGNIN,
        value,
        JsonHeader
      );
      if (response.success) {
        localStorage.setItem("userToken", response.data.accessToken);
        localStorage.setItem("userID", response.data._id);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Register User
  const handleOPTSubmit = async (e: React.MouseEvent<any>) => {
    e.preventDefault();
    try {
      setLoading(true);
      // if(values.password)
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/;
      if (!passwordRegex.test(values.password)) {
        toast.error("Password is not valid");
        return;
      }
      const response = await apiCall(
        Methods.POST,
        EndPoint.SIGNUP,
        values,
        JsonHeader
      );
      if (response.success == true) {
        toast.success("Succesfully created a new User");
        loginUser();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const init = async () => {
    try {
      const userId = await getUserID();
      const userAuthentication = await isAuthenticate();

      if (userId && userAuthentication) {
        const response = await apiCall(
          Methods.GET,
          `${EndPoint.SINGLE_USER}/${userId}`
        );

        if (response.success) {
          router.replace("/account");
        } else {
          clearLocalStorage();
        }
      } else {
        clearLocalStorage();
      }
    } catch (error) {
      console.error("Error during user login initialization:", error);
      clearLocalStorage();
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      {status == "create" && (
        <>
          <p className="mb-2 text-2xl font-semibold text-center">
            {" "}
            {t("registration")}
          </p>

          <form className="mt-3" onSubmit={handleSubmit}>
            <label className="block text-base font-medium text-gray-700">
              {t("phoneNumber")}
            </label>
            <div className="w-full border border-gray-300 rounded-md shadow-sm">
              <input
                type="text"
                placeholder={t("phonePlaceholder")}
                name="phone"
                className="w-full p-2 rounded-md outline-none no-spin focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                onChange={handleMobileNumber}
                value={phoneNumber}
                required
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="flex justify-center w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-[#EB148C] border border-transparent rounded-md shadow-sm  focus:outline-pink-500"
            >
              {loading ? "Loading..." : t("Verify")}
            </button>
          </form>
        </>
      )}

      {/* Opt Check  */}

      {status == "check" && (
        <>
          <div className="mb-8">
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
                className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#EB148C] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-pink-400 focus:outline-none focus:ring focus:ring-pink-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
              >
                {loading ? "Loading..." : t("Verify")}
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-center text-slate-500">
            {t("didntReceiveCode")}{" "}
            <button
              onClick={handleSubmit}
              className="font-medium text-[#EB148C] hover:text-[#EB148C]"
            >
              {" "}
              {t("resend")}
            </button>
          </div>
        </>
      )}
      {/* Register User  */}
      {status == "done" && (
        <>
          <p className="mb-6 text-center text-xl font-[550] text-gray-600">
            {t("enterRegistrationDetails")}
          </p>
          <form className="space-y-4" onSubmit={handleOPTSubmit}>
            <div className="flex w-full space-x-3">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  {t("firstName")}
                </label>
                <input
                  type="text"
                  placeholder={t("enterFirstName")}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  name="firstName"
                  onChange={handleChange}
                  value={values?.firstName}
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  {t("lastName")}
                </label>
                <input
                  type="text"
                  placeholder={t("enterLastName")}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  name="lastName"
                  onChange={handleChange}
                  value={values?.lastName}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("phoneNumber")}
              </label>
              <input
                type="number"
                placeholder={t("phonePlaceholder")}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm no-spin focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                name="phone"
                onChange={handleChange}
                value={values?.phone}
                required
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("password")}
              </label>
              <div className="relative mt-1">
                <input
                  type={passwordView ? "text" : "password"}
                  placeholder={t("enterPassword")}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  name="password"
                  onChange={handleChange}
                  value={values?.password}
                  required
                />
                <button
                  type="button"
                  onClick={showPassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
                >
                  {passwordView ? (
                    <IoMdEye size={20} />
                  ) : (
                    <IoMdEyeOff size={20} />
                  )}
                </button>
              </div>
              <span
                className={`text-xs ${
                  passwordValid ? "text-green-500" : "text-red-500"
                }`}
              >
                {passwordMessage}
              </span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
              />
              <label className="block ml-2 text-sm text-gray-900">
                {t("rememberMe")}
              </label>
            </div>
            <div>
              <button
                disabled={loading}
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#EB148C] border border-transparent rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                {loading ? "Loading.." : t("submit")}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default RegisterLib;
