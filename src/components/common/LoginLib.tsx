"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { validatePhoneNumber } from "../Auth/AuthLib";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, JsonHeader, Methods } from "@/api/config";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
interface initialState {
  phone: string;
  password: string;
}
const LoginLib = () => {
  const [values, setValue] = useState<initialState>({
    phone: "",
    password: "",
  });
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [passwordView, setPasswordView] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValue({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const cleanPhoneNumber = values.phone.startsWith("+88")
        ? values.phone.slice(3)
        : values.phone;
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
        password: values.password,
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.SIGNIN,
        value,
        JsonHeader
      );
      if (response.success) {
        // console.log("User Response", response.data);
        localStorage.setItem(
          "userName",
          response.data.firstName + " " + response.data.lastName
        );
        localStorage.setItem("userImage", response.data.image);
        localStorage.setItem("userToken", response.data.accessToken);
        localStorage.setItem("userID", response.data._id);
        window.location.reload();
        // Emit login
        toast.success("Welcome back! You are now logged in", {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
      } else {
        toast.error(response.message, {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Oops! Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const showPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordView(!passwordView);
  };
  return (
    <div>
      <p className="mb-2 text-2xl font-semibold text-center">{t("Login")}</p>
      <p className="mb-6 text-center text-gray-600">{t("enterDetails")}</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("phoneNumber")}
          </label>
          <input
            type="text"
            placeholder={t("phonePlaceholder")}
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            name="phone"
            onChange={handleChange}
            value={values?.phone}
            required
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
              {passwordView ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
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
              {t("rememberMe")}
            </label>
          </div>
          <Link
            href={"/Auth/userforgetpassword"}
            type="button"
            className="pl-1 text-sm hover:text-pink-500"
          >
            {t("forgotPassword")}
          </Link>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-opacity-30" : "hover:bg-pink-700"
            } flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
          >
            {loading ? "Loading..." : t("Login")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginLib;
