"use client";
import React, { useState } from "react";
import LoginLib from "./LoginLib";
import RegisterLib from "./RegisterLib";
import { useTranslation } from "react-i18next";

const AuthLib = () => {
  const [authpage, setAuthpage] = useState(true);
  const { t } = useTranslation();
  const handleChangeAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAuthpage(!authpage);
  };
  return (
    <div className="">
      {authpage ? (
        <>
          <LoginLib />
          <div className=" text-sm text-center text-gray-600 mt-6">
            {t("noAccount")}
            <button
              className="pl-2 text-pink-600 hover:text-pink-500"
              onClick={handleChangeAuth}
            >
              {t("registration")}
            </button>
          </div>
        </>
      ) : (
        <>
          <RegisterLib />
          <div className=" text-sm text-center text-gray-600 mt-6">
            {t("alreadyHaveAccount")}
            <button
              className="pl-2 text-pink-600 hover:text-pink-500"
              onClick={handleChangeAuth}
            >
              {t("Login")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthLib;

// "use client";
// import { EndPoint, JsonHeader, Methods } from "@/api/config";
// import { apiCall } from "@/lib/axios-client";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import OTPInput from "react-otp-input";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { toast } from "react-toastify";

// const AuthLib = () => {
//   const { t } = useTranslation();
//   const [phoneData, setPhoneData] = useState({
//     countryCode: "",
//     dialCode: "",
//     phone: "",
//   });
//   const [buttonLoading, setButtonLoading] = useState(false);
//   const [buttonLoading2, setButtonLoading2] = useState(false);
//   const [status, setstatus] = useState("create");
//   const [otp, setOtp] = useState<string>();
//   const router = useRouter();
//   const [minutes, setMinutes] = useState(1);
//   const [seconds, setSeconds] = useState(59);

//   //   Otp OnChangeing on mobile number selection
//   const handlePhoneChange = (value: string, country: any) => {
//     let phoneWithoutDialCode = value.replace(`+${country.dialCode}`, "").trim();
//     setPhoneData({
//       countryCode: country.countryCode.toUpperCase(),
//       dialCode: country.dialCode,
//       phone: phoneWithoutDialCode.startsWith(country.dialCode)
//         ? phoneWithoutDialCode.slice(country.dialCode.length)
//         : phoneWithoutDialCode,
//     });
//   };
//   //   Otp Creation  on mobile number
//   const handleSignIn = async (e: React.FormEvent<HTMLFormElement> | any) => {
//     e.preventDefault();
//     try {
//       setButtonLoading(true);
//       const response = await apiCall(
//         Methods.POST,
//         EndPoint.USEROTPSIGNIN,
//         phoneData,
//         JsonHeader
//       );
//       if (response.success) {
//         setstatus("done");
//         toast.success(response.message);
//         setMinutes(1);
//         setSeconds(59);
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setButtonLoading(false);
//     }
//   };

//   const checkOtp = async (e: React.FormEvent<HTMLFormElement>) => {
//     try {
//       e.preventDefault();
//       setButtonLoading2(true);
//       const value = {
//         dialCode: phoneData.dialCode,
//         phone: phoneData.phone,
//         otp: otp,
//       };
//       const response = await apiCall(
//         Methods.POST,
//         EndPoint.USEROTPCHECK,
//         value,
//         JsonHeader
//       );
//       if (response.success) {
//         localStorage.setItem("userToken", response.data.accessToken);
//         localStorage.setItem("userID", response.data._id);
//         window.location.reload();
//         toast.success(response.message);
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setButtonLoading2(false);
//     }
//   };

//   // useEffect(()=>{
//   //   const interval=setInterval(() => {

//   //   }, interval);
//   // },[])
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (seconds > 0) {
//         setSeconds(seconds - 1);
//       }
//       if (seconds === 0) {
//         if (minutes === 0) {
//           clearInterval(interval);
//         } else {
//           setSeconds(59);
//           setMinutes(minutes - 1);
//         }
//       }
//     }, 1000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, [seconds]);

//   return (
//     <section className=" flex  justify-center mx-auto">
//       <div className="bg-white p-8 rounded-lg w-full">
//         {status === "create" ? (
//           <>
//             <p className=" text-2xl font-semibold text-center">{t("Login")}</p>
//             <p className="text-center text-gray-600 mb-2">
//               {t("enterDetails")}
//             </p>
//             <form className="w-11/12 mx-auto" onSubmit={handleSignIn}>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   {t("phoneNumber")}
//                 </label>
//                 <PhoneInput
//                   country={"bd"} // Default country
//                   onChange={handlePhoneChange}
//                   inputStyle={{ width: "100%" }}
//                 />
//               </div>
//               <button
//                 disabled={buttonLoading}
//                 type="submit"
//                 className="flex justify-center w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-[#EB148C] border border-transparent rounded-md shadow-sm  focus:outline-pink-500"
//               >
//                 {buttonLoading ? "Loading..." : t("Verify")}
//               </button>
//             </form>
//           </>
//         ) : (
//           <>
//             <div className="mb-6">
//               <h2 className="mb-1 text-2xl font-[550] text-center">
//                 {t("otpVerification")}
//               </h2>
//               <p className="text-[15px] text-slate-500 text-center">
//                 {t("verificationCodeMessage")}
//               </p>
//             </div>
//             <form action="" onSubmit={checkOtp}>
//               <div className="flex items-center justify-center gap-3">
//                 <OTPInput
//                   value={otp}
//                   onChange={setOtp}
//                   numInputs={4}
//                   renderSeparator={<span>-</span>}
//                   renderInput={(props) => <input {...props} />}
//                   inputStyle={{
//                     width: "50px",
//                     height: "50px",
//                     outline: "none",
//                     border: "1px solid",
//                     marginLeft: "5px",
//                     marginRight: "5px",
//                     fontSize: "24px",
//                     borderRadius: "5px",
//                   }}
//                 />
//               </div>
//               <div className="max-w-sm mx-auto  mt-4 flex items-center justify-between text-sm text-center text-slate-500">
//                 <p>
//                   Time Remaining :{" "}
//                   <span>
//                     {minutes < 10 ? `0${minutes}` : minutes} :{" "}
//                     {seconds < 10 ? `0${seconds}` : seconds}
//                   </span>
//                 </p>

//                 <button
//                   onClick={handleSignIn}
//                   disabled={seconds > 0 || minutes > 0}
//                   className="font-medium text-[#EB148C] hover:text-[#EB148C]"
//                 >
//                   {" "}
//                   {t("resend")}
//                 </button>
//               </div>
//               <div className="max-w-sm mx-auto mt-4 ">
//                 <button
//                   type="submit"
//                   className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#EB148C] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10  focus:outline-none focus:ring focus:ring-pink-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
//                 >
//                   {buttonLoading2 ? "Loading..." : t("Verify")}
//                 </button>
//               </div>
//             </form>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default AuthLib;
