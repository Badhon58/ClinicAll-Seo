"use client";
import { EndPoint, Methods } from "@/api/config";
import { apiCall } from "@/lib/axios-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
interface Passwordinterface {
  password: string;
  confirmpassword: string;
}
const DoctorForgotPassword = () => {
  const [status, setStatus] = useState<string>("create");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [firstpassword, setFirstpassword] = useState(false);
  const [lastpassword, setLastpassword] = useState(false);
  const [validPassword, setValidPassword] = useState<Passwordinterface>({
    password: "",
    confirmpassword: "",
  });
  const [passwordMessage1, setpasswordMessage1] = useState("");
  const [passwordValid1, setpasswordValid1] = useState<boolean>();
  const [passwordMessage2, setpasswordMessage2] = useState("");
  const [passwordValid2, setpasswordValid2] = useState<boolean>();
  const [ResetToken, setResetToken] = useState<string>("");
  const router = useRouter();
  // generate OTP
  const handleMobileNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPhoneNumber(e.target.value);
  };

  //Otp Generate
  const handleForgetPassword = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const value = {
        phone: phoneNumber,
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.DOCTORFORGETPASSWORD,
        value
      );

      if (response.success == true) {
        toast.success(response.message, {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
        setStatus("check");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const value = {
        phone: phoneNumber,
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.DOCTORFORGETPASSWORD,
        value
      );
      if (response.success == true) {
        toast.success(response.message, {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
        setStatus("check");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  // Check OTP
  const checkOtp = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (phoneNumber && otp) {
        const value = {
          phone: phoneNumber,
          otp: otp.toString(),
        };
        const response = await apiCall(
          Methods.POST,
          EndPoint.DOCTORFORGETOTPCHECK,
          value
        );
        // const response = await apiCall(Methods.POST,);
        if (response.success == true) {
          toast.success(response.message);
          setStatus("done");
          setResetToken(response.data.passResetToken);
        }
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  //Reset Password Functionality
  const handlePasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/;
    if (name == "password") {
      if (!passwordRegex.test(value)) {
        setpasswordMessage1(
          "Password must contain at least one letter, one number, and one special character"
        );
        setpasswordValid1(false);
      } else {
        setpasswordMessage1("");
        setpasswordValid1(true);
      }
    }
    if (name == "confirmpassword") {
      if (!passwordRegex.test(value)) {
        setpasswordMessage2(
          "Password must contain at least one letter, one number, and one special character"
        );
        setpasswordValid2(false);
      } else {
        setpasswordMessage2("");
        setpasswordValid2(true);
      }
    }
    setValidPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const showPassword1 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFirstpassword(!firstpassword);
  };
  const showPassword2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLastpassword(!lastpassword);
  };

  const handleChangePassword = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (validPassword.password === validPassword.confirmpassword) {
        const value = {
          passResetToken: ResetToken,
          password: validPassword.confirmpassword,
        };
        const response = await apiCall(
          Methods.POST,
          EndPoint.DOCTORRECOVERYPASSWORD,
          value
        );
        if (response.success == true) {
          toast.success(response.message);
          router.replace("/Auth/docLogin");
        }
      } else {
        toast.error("Password Dosen,t Match");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorlogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.replace("/Auth/docLogin");
  };

  return (
    <section className="container flex  justify-center items-center mx-auto mt-2 min-h-[60vh]  2xl:min-h-[60vh]">
      <div className="bg-white p-6  rounded-lg shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)] w-11/12 lg:w-[40%] md:w-[60%] sm:w-[80%]">
        {/* Otp Creation  */}
        {status == "create" && (
          <>
            <p className="text-2xl font-semibold text-center ">
              Doctor Forget Password
            </p>
            <p className="text-xs text-center">
              No Worries, we'll send you reset instructions
            </p>
            <form action="" onSubmit={handleForgetPassword}>
              <div className="my-6">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="number"
                  placeholder={"Enter your Number"}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm no-spin focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  name="phone"
                  onChange={handleMobileNumber}
                  value={phoneNumber}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
              >
                {loading ? "Loading.." : "Verify"}
              </button>
              <div className="mt-2 text-center ">
                <Link
                  href={"/Auth/docLogin"}
                  className="pl-1 text-base hover:text-pink-500"
                >
                  Back to Log In
                </Link>
              </div>
            </form>
          </>
        )}
        {/* otp Check  */}
        {status == "check" && (
          <>
            <div className="mb-8">
              <h2 className="mb-1 text-2xl font-bold text-center">
                OTP Verification
              </h2>
              <p className="text-[15px] text-slate-500 text-center">
                Enter the 4-digit verification code that was sent to your phone
                number.
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
                  {loading ? "Loading..." : "Verify Account"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-center text-slate-500">
              Didn't receive code?{" "}
              <button
                onClick={handleSubmit}
                className="font-medium text-[#EB148C] hover:text-[#EB148C]"
              >
                Resend
              </button>
            </div>
          </>
        )}
        {/* Register From Page  */}
        {status == "done" && (
          <>
            <p className="text-2xl font-semibold text-center ">
              Forget Password
            </p>
            <p className="text-xs text-center">
              No Worries, we'll send you reset instructions
            </p>
            <form action="" onSubmit={handleChangePassword}>
              <div className="my-3">
                <label className="block text-base font-medium text-gray-700 text-start">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={firstpassword ? "text" : "password"}
                    placeholder={"Enter your password"}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    name="password"
                    onChange={handlePasswordChanged}
                    value={validPassword?.password}
                    required
                  />
                  <button
                    type="button"
                    onClick={showPassword1}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
                  >
                    {firstpassword ? (
                      <IoMdEye size={20} />
                    ) : (
                      <IoMdEyeOff size={20} />
                    )}
                  </button>
                </div>
                <span
                  className={`text-xs  w-[395px] line-clamp-1 ${
                    passwordValid1 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {passwordMessage1}
                </span>
              </div>
              <div className="">
                <label className="block text-base font-medium text-gray-700 text-start">
                  Confirm Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={lastpassword ? "text" : "password"}
                    placeholder={"Enter your password"}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    name="confirmpassword"
                    onChange={handlePasswordChanged}
                    value={validPassword?.confirmpassword}
                    required
                  />
                  <button
                    type="button"
                    onClick={showPassword2}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
                  >
                    {lastpassword ? (
                      <IoMdEye size={20} />
                    ) : (
                      <IoMdEyeOff size={20} />
                    )}
                  </button>
                  <span
                    className={`text-xs  w-[395px] line-clamp-1 ${
                      passwordValid2 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {passwordMessage2}
                  </span>
                </div>
              </div>
              <div className="max-w-[260px] mx-auto mt-4 ">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#EB148C] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-pink-400 focus:outline-none focus:ring focus:ring-pink-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default DoctorForgotPassword;
