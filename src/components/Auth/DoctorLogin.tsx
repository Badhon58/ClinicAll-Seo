"use client";
import { EndPoint, JsonHeader, Methods } from "@/api/config";
import { useSocket } from "@/context/SocketContext";
import { doctorIsAuthenticate, getUserID } from "@/lib/authHandler";
import { apiCall } from "@/lib/axios-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { clearLocalStorage } from "./AuthLib";
import PageLoading from "../Seo/PageLoading";

interface initialState {
  phone: string;
  password: string;
}
const DoctorLogin = () => {
  const [values, setValue] = useState<initialState>({
    phone: "",
    password: "",
  });
  const { handleSocketLogin } = useSocket();
  const [loading, setLoading] = useState(true);
  const [passwordView, setPasswordView] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValue({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      // const response = await loginDoctor(values);
      const cleanPhoneNumber = values.phone.startsWith("+88")
        ? values.phone.slice(3)
        : values.phone;
      const formetValue = {
        phone: cleanPhoneNumber,
        password: values.password,
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.DOCTOR_LOGIN,
        formetValue,
        JsonHeader
      );
      if (response.success) {
        localStorage.setItem("clinicallDoctorToken", response.data.accessToken);
        localStorage.setItem("userID", response.data._id);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("image", response.data.image);
        // console.log(response.data);

        localStorage.removeItem("userToken");
        toast.success("Welcome back! You are now logged in", {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });

        handleSocketLogin(response.data._id);
        router.replace("/doctoraccount");
      } else {
        toast.error(response.message, {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Oops! Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
    }
  };

  const showPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordView(!passwordView);
  };

  const init = async () => {
    try {
      setLoading(true);
      const userId = await getUserID();
      const token = await doctorIsAuthenticate();

      if (userId && token) {
        const response = await apiCall(
          Methods.GET,
          `${EndPoint.DOCTOR_FIND_BY_ID}/${userId}`
        );

        if (response.success) {
          router.replace("/doctoraccount");
        } else {
          clearLocalStorage();
          // router.replace("/Auth/docLogin");
        }
      } else {
        clearLocalStorage();
        // router.replace("/Auth/docLogin");
      }
    } catch (error) {
      console.error("Error during doctor login initialization:", error);
      clearLocalStorage();
      // router.replace("/Auth/docLogin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return loading ? (
    <PageLoading />
  ) : (
    <section className="container flex items-center justify-center mx-auto mt-2 min-h-[60vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 lg:w-[40%] md:w-[60%] sm:w-[80%] ">
        <h2 className="mb-2 text-2xl font-semibold text-center">
          Doctor Login
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Please enter your details .
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone number
            </label>
            <input
              type="text"
              placeholder="Enter your number"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              name="phone"
              onChange={handleChange}
              value={values?.phone}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={passwordView ? "text" : "password"}
                placeholder="Enter your password"
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
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
              />
              <label className="block ml-1.5 text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <Link
              type="button"
              href={"/Auth/doctorforgetpassword"}
              className="pl-1 text-sm hover:text-pink-500"
            >
              Forgot password?
            </Link>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-opacity-30" : ""
              } flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Don`t have an account?{" "}
          <Link
            href={"/Auth/docRegister"}
            className="text-pink-600 hover:text-pink-500"
          >
            Registration
          </Link>
        </p>
      </div>
    </section>
  );
};

export default DoctorLogin;
