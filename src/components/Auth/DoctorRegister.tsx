"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import { catagory, initialState } from "./interface";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { apiCall } from "@/lib/axios-client";
import CryptoJS from "crypto-js";
import { EndPoint, FormDataHeader, JsonHeader, Methods } from "@/api/config";
import {
  doctorIsAuthenticate,
  doctorSignout,
  getUserID,
} from "@/lib/authHandler";
import { clearLocalStorage, validatePhoneNumber } from "./AuthLib";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import PhoneInput from "react-phone-input-2";
const encryptText = (phone: string) => {
  const hash = CryptoJS.HmacSHA256(
    phone,
    process.env.NEXT_PUBLIC_CLINICALL_SECRET_CODE!
    // "Badhon Biswas"
  );
  const signature = CryptoJS.enc.Base64.stringify(hash);
  return signature;
};
const DoctorRegister = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [passwordMessage, setpasswordMessage] = useState("");
  const [passwordValid, setpasswordValid] = useState<boolean>();
  const [passwordView, setPasswordView] = useState(false);
  const [phoneData, setPhoneData] = useState({
    countryCode: "",
    dialCode: "",
    phone: "",
  });
  const [values, setValues] = useState<initialState>({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    category: [],
    hospital: "",
    degree: "",
    bmdc: "",
    visitFee: "",
    yearsOfExperience: "",
    email: "",
    isActive: false,
    isApproved: false,
    showHome: false,
    bmdcRegistered: true,
  });
  const [doctorcategory, setDoctorcategory] = useState<catagory[]>([]);
  const [status, setstatus] = useState<string>("create");
  const router = useRouter();
  const [createopt, setCreateopt] = useState(false);
  // For Mobile Number and  OTP Creating
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
  //Otp Create
  const handleSubmit = async (e: React.MouseEvent<any>) => {
    e.preventDefault();
    // setCreateopt(true);
    try {
      setLoading(true);
      // if (!phoneData.phone && phoneData.phone.length === 0) {
      //   toast.info("Please Enter A Valid Number", { hideProgressBar: true });
      //   return
      // }
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
        finalvalue,
        JsonHeader
      );
      if (response.success == true) {
        toast.success(response.message, {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });

        setstatus("check");
      } else {
        toast.error(response.message, {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  //For Check OTP

  const checkOtp = async (e: React.MouseEvent<any>) => {
    e.preventDefault();
    try {
      setLoading(true);
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
      if (response.success == true) {
        toast.success(response.message);
        setstatus("done");
        setValues((prev) => ({
          ...prev,
          phone: `0${value.phone}`,
        }));
      }
    }
    catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  //For Doctor Register

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const init = async () => {
    try {
      setLoading(true);
      const { data } = await apiCall(
        Methods.GET,
        EndPoint.CATEGORY_OF_DOCTOR_FIND_ALL_NAME
      );
      setDoctorcategory(data);
      const token = await doctorIsAuthenticate();
      const userId = await getUserID();

      if (userId && token) {
        // const { data }: any = await getsingleDoctors(doctorId);
        const response: any = await apiCall(
          Methods.GET,
          `${EndPoint.DOCTOR_FIND_BY_ID}/${userId}`
        );
        if (response.success) {
          router.replace("/doctoraccount");
        } else if (!response.success) {
          try {
            clearLocalStorage();
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        try {
          clearLocalStorage();
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (selectedOptions: any) => {
    const transformedCategory = (selectedOptions || []).map(
      (cat: any) => cat.value
    );
    setValues((prevState: any) => ({
      ...prevState,
      category: transformedCategory,
    }));
  };

  const loginUser = async () => {
    try {
      setLoading(true);
      const value = {
        phone: values.phone,
        password: values.password,
      };
      // const response = await loginDoctor(value);
      const response = await apiCall(
        Methods.POST,
        EndPoint.DOCTOR_LOGIN,
        value,
        JsonHeader
      );
      if (response.success) {
        localStorage.setItem("clinicallDoctorToken", response.data.accessToken);
        localStorage.setItem("userID", response.data._id);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("image", response.data.image);
        localStorage.removeItem("userToken");
        router.push("/doctoraccount");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Oops! Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      // console.log(typeof(values.bmdcRegistered));
      // console.log(values);
      const response = await apiCall(
        Methods.POST,
        EndPoint.DOCTOR_CREATE,
        values,
        FormDataHeader
      );
      if (response.success == true) {
        toast.success(response.message, {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
        loginUser();
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckdoctor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isDoctor = e.target.value === "doctor";

    setValues((prev) => ({
      ...prev,
      bmdcRegistered: isDoctor,
      bmdc: isDoctor
        ? ""
        : Math.floor(1000000000 + Math.random() * 9000000000).toString(), // Generate a random 8-digit number
    }));
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <section className="container min-h-[75vh] flex items-center justify-center mx-auto mt-2">
      <div className="bg-white p-8 rounded-lg shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)] lg:w-[50%] xl:w-[45%] 2xl:w-[40%] md:w-[70%] sm:w-[80%] w-11/12">
        {/* create OTP  */}
        {status == "create" && (
          <>
            <p className="text-2xl font-semibold text-center">
              Doctor Registration
            </p>
            <p className="py-2 text-center text-sm">
              Register to connect with patients, manage appointments, provide
              consultations, and expand your health care services online!
            </p>

            <form className="mt-3" onSubmit={handleSubmit}>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <PhoneInput
                  country={"bd"}
                  // disableCountryCode={false}
                  onChange={handlePhoneChange}
                  inputStyle={{ width: "100%" }}
                />
              </div>
              <button
                disabled={loading}
                onClick={handleSubmit}
                type="submit"
                className={`flex justify-center w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-[#EB148C] border border-transparent rounded-md shadow-sm  focus:outline-pink-500 ${loading && "bg-opacity-90"
                  }`}
              >
                {loading ? "Loading..." : " Verify"}
              </button>
            </form>

            <p className="mt-6 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                type="button"
                href={"/Auth/docLogin"}
                className="text-pink-600 hover:text-pink-500"
              >
                Log In
              </Link>
            </p>
          </>
        )}
        {/* check OTP  */}
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
                  onClick={checkOtp}
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
        {/* Register Page  */}
        {status == "done" && (
          <>
            <h2 className="mb-2 text-2xl font-semibold text-center">
              Doctor Register
            </h2>
            <p className="mb-6 text-center text-gray-600">
              Please enter Your details.
            </p>
            <form className="space-y-4" onSubmit={handleDoctorSubmit}>
              {/* first Name And Last Name  */}
              <div className="flex w-full space-x-3">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your First Name"
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    name="firstName"
                    onChange={handleChange}
                    value={values?.firstName}
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Last Name"
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    name="lastName"
                    onChange={handleChange}
                    value={values?.lastName}
                    required
                  />
                </div>
              </div>
              {/* Speciality  */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Speciality <span className="text-red-500">*</span>
                </label>
                <Select
                  name="select"
                  options={doctorcategory}
                  isMulti
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  onChange={handleCategoryChange}
                />
              </div>
              {/* Hospital  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Hospitals <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Hospital"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  name="hospital"
                  onChange={handleChange}
                  value={values?.hospital}
                  required
                />
              </div>
              {/* checkDoctor  */}
              <div className="flex items-center space-x-2 ">
                <div className="flex items-center justify-center">
                  <input
                    type="radio"
                    id="doctor"
                    name="onlinepayment"
                    value="doctor"
                    className="text-yellow-500 cursor-pointer accent-pink-500"
                    onChange={handleCheckdoctor}
                    checked={values.bmdcRegistered}
                  />
                  <label
                    htmlFor="doctor"
                    className="ml-2 text-sm font-medium cursor-pointer"
                  >
                    Doctor
                  </label>
                </div>
                <div className="flex items-center justify-center">
                  <input
                    type="radio"
                    id="other"
                    name="onlinepayment"
                    value="other"
                    className="form-radio cursor-pointer accent-pink-500"
                    checked={!values.bmdcRegistered}
                    onChange={handleCheckdoctor}
                  />
                  <label
                    htmlFor="other"
                    className="ml-2 text-sm font-medium cursor-pointer"
                  >
                    Other{" "}
                    <span className="text-xs">
                      (e.x. Psychologist/Nutritionist)
                    </span>
                  </label>
                </div>
              </div>
              {/* Degree And BMDC */}
              <div className="flex w-full space-x-3">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Degree <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Degree"
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    name="degree"
                    onChange={handleChange}
                    value={values?.degree}
                    required
                  />
                </div>
                <div
                  className={`${values.bmdcRegistered ? "w-full " : "hidden"}`}
                >
                  <label
                    title="If you don't have any BMDC number, start with 0"
                    className="block text-sm font-medium text-gray-700 no-underline"
                  >
                    BMDC Number <span className="text-red-500">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your BMDC Number"
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    name="bmdc"
                    onChange={handleChange}
                    value={values?.bmdc}
                    title="If you don't have any BMDC number, start with multiple 0"
                    required
                  />
                </div>
              </div>
              {/* visit fee and years of experiance  */}
              <div className="flex w-full space-x-3">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Visit Fee <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Visit Fee"
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    name="visitFee"
                    onChange={handleChange}
                    value={values?.visitFee}
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Year of Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Year of Experience"
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    name="yearsOfExperience"
                    onChange={handleChange}
                    value={values?.yearsOfExperience}
                    required
                  />
                </div>
              </div>
              {/* Email and Phone Number  */}
              <div className="flex w-full space-x-3">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Email"
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    name="email"
                    onChange={handleChange}
                    value={values?.email}
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Your Phone Number"
                    className="block w-full px-3 no-spin py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    name="phone"
                    onChange={handleChange}
                    value={values?.phone}
                    required
                    disabled
                  />
                </div>
              </div>
              {/* password  */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <input
                    type={passwordView ? "text" : "password"}
                    placeholder="Enter Your password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    name="password"
                    onChange={handleChange}
                    value={values?.password}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordView(!passwordView)}
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
                  className={`text-xs ${passwordValid ? "text-green-500" : "text-red-500"
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
                  Remember me
                </label>
              </div>
              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
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

export default DoctorRegister;
