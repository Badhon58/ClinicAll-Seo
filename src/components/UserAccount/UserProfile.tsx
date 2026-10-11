"use client";
import React, { useEffect, useState } from "react";
import { UserInfo } from "./Interface";
import { getUserID } from "@/lib/authHandler";
import Image from "next/image";
import { toast } from "react-toastify";

import { apiCall } from "@/lib/axios-client";
import { EndPoint, FormDataHeader, Methods } from "@/api/config";
import { useRouter } from "next/navigation";
import PageLoading from "../Seo/PageLoading";
import { useTranslation } from "react-i18next";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [passwordView, setPasswordView] = useState(false);
  const [ProfileImage, setProfileImage] = useState<String | null>(
    "/User/Group.svg"
  );
  const [userid, setuserId] = useState<string | null>();
  const { t } = useTranslation();
  const [userInformation, setUserInformation] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // dob: "",
    bloodGroup: "",
    nid: "",
    address: "",
    // image: File,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInformation({ ...userInformation, [name]: value });
  };

  const init = async () => {
    try {
      setLoading(true);
      const userId = await getUserID();
      setuserId(userId || null);
      if (userId) {
        const response = await apiCall(
          Methods.GET,
          `${EndPoint.SINGLE_USER}/${userId}`
        );
        if (response.success) {
          if (response.data === null) {
            toast.error(
              "No user data found. Please check the user ID or try again."
            );
            router.replace("/");
            return;
          }
          setUserInformation(response.data);
          setProfileImage(response.data.image);
          // if (response.data.email == "") {
          //   toast.success("To get Started fill up the information");
          // }
        }
      }
    } catch (error) {
      console.error("Error initializing user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setUserInformation((prevData) => ({
        ...prevData,
        image: file,
      }));
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const showPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordView(!passwordView);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName } = userInformation;
    if (!firstName || !lastName) {
      let errorMessage = "";

      if (!firstName) errorMessage += "First Name, ";
      if (!lastName) errorMessage += "Last Name, ";
      // if (!email) errorMessage += "Email, ";

      // Remove trailing comma and space
      errorMessage = errorMessage.trim().replace(/,$/, "") + " are required.";

      toast.error(errorMessage, {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
      return;
    }
    try {
      setLoading(true);
      const response = await apiCall(
        Methods.PATCH,
        `${EndPoint.SINGLE_USER_UPDATE}/${userid}`,
        userInformation,
        FormDataHeader
      );
      if (response.success) {
        toast.success("Successfully updated user", {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      toast.error("Something Went Wrong", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
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
    <section className="xl:container xl:mx-auto">
      <form action="" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2  px-5 py-2  min-h-[80vh] lg:gap-3 2xl:gap-5 shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)]">
          <h2 className="md:mb-6 mb-3 text-base md:text-2xl font-semibold md:hidden block">
            {t("My Profile")}
          </h2>
          {/* responsive Image function  */}
          <div className=" relative border border-[#8F90A6] p-4 grid place-content-center rounded-lg md:hidden">
            <Image
              width={250}
              height={200}
              alt="Profile Image 1"
              src={ProfileImage ? `${ProfileImage}` : "/User/Group.png"}
              className="object-fill rounded-full size-48 "
            />
            <label
              id="profileImage"
              className=" cursor-pointer mt-2 absolute bottom-[18%] right-[26%]  py-1 text-center text-[#16020B] rounded-[5px]"
            >
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                id="profileImage"
              />

              <CiEdit
                size={24}
                className="bg-[#EB148C] text-white rounded-full size-9 p-1"
              />
            </label>
          </div>
          {/* My Profile Image Function  */}
          <aside className="w-full bg-white rounded-lg mt-4 md:mt-0">
            <h2 className="mb-6 text-2xl font-semibold hidden md:block">
              {t("My Profile")}
            </h2>
            {/* First And Last Name  */}
            <div className="flex w-full space-x-2">
              <div className="w-full mb-4">
                <label
                  className="block mb-2 text-sm font-normal text-gray-700"
                  htmlFor="firstName"
                >
                  {t("firstName")}
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  onChange={handleChange}
                  value={userInformation.firstName ?? ""}
                  name="firstName"
                  placeholder={t("enterFirstName")}
                />
              </div>
              <div className="w-full mb-4">
                <label
                  className="block mb-2 text-sm font-normal text-gray-700"
                  htmlFor="lastName"
                >
                  {" "}
                  {t("lastName")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  onChange={handleChange}
                  value={userInformation.lastName ?? ""}
                  name="lastName"
                  placeholder={t("enterLastName")}
                />
              </div>
            </div>

            {/* Email  */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-normal text-gray-700"
                htmlFor="email"
              >
                {t("email")}
                {/* <span className="text-red-500">*</span> */}
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                onChange={handleChange}
                value={userInformation.email ?? ""}
                name="email"
                placeholder={t("emailPlaceholder")}
              />
            </div>

            {/* Phone Number  */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-normal text-gray-700"
                htmlFor="phone"
              >
                {t("phoneNumber")}
                <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                onChange={handleChange}
                value={userInformation.phone ?? ""}
                name="phone"
                disabled={true}
                placeholder={t("phonePlaceholder")}
              />
            </div>

            {/* Date Of Birth  */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-normal text-gray-700"
                htmlFor="dob"
              >
                {t("dateOfBirth")}
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                id="dob"
                type="date"
                onChange={handleChange}
                value={userInformation.dob ?? ""}
                name="dob"
                max={new Date().toISOString().split("T")[0]}
                placeholder={t("enterDateOfBirth")}
              />
            </div>

            {/* Blood Group  */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-normal text-gray-700"
                htmlFor="blood-group"
              >
                {t("bloodGroup")}
              </label>
              <select
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
                id="blood-group"
                onChange={handleChange}
                value={userInformation.bloodGroup ?? ""}
                name="bloodGroup"
              >
                <option value="">{t("selectblood")}</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Nid Card Number  */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-normal text-gray-700"
                htmlFor="nid"
              >
                {t("nidNumber")}
              </label>
              <div className="px-1  mt-1 flex border border-gray-300 rounded-md justify-between items-center">
                <input
                  type={passwordView ? "number" : "password"}
                  placeholder={t("enterNID")}
                  className="block w-[93%]  sm:text-sm no-spin pl-2 outline-none h-full py-2"
                  value={userInformation.nid ?? ""}
                  onChange={handleChange}
                  name="nid"
                />
                <button
                  onClick={showPassword}
                  // className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
                  className=""
                >
                  {passwordView ? (
                    <IoMdEye size={20} />
                  ) : (
                    <IoMdEyeOff size={20} />
                  )}
                </button>
              </div>
            </div>
            {/* Address  */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-normal text-gray-700"
                htmlFor="address"
              >
                {t("address")}
              </label>
              <textarea
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                id="address"
                rows={5}
                maxLength={150}
                value={userInformation.address ?? ""}
                name="address"
                onChange={handleChange}
                placeholder={t("addressPlaceholder")}
              />
              <div className="text-sm text-right text-gray-500">
                {userInformation.address?.length}/150
              </div>
            </div>
          </aside>
          {/* Image function */}
          <aside className="flex flex-col justify-between px-2 py-2">
            <div className=" relative border border-[#8F90A6] p-4 py-12 md:grid place-content-center rounded-lg mt-[75px] hidden">
              <Image
                width={250}
                height={200}
                alt="Profile Image 1"
                src={ProfileImage ? `${ProfileImage}` : "/User/Group.png"}
                className="object-fill rounded-full size-48 "
              />
              <label
                id="profileImage"
                className=" cursor-pointer mt-2 absolute bottom-[19%] right-[33%]  py-1 text-center text-[#16020B] rounded-[5px]"
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  id="profileImage"
                />

                <CiEdit
                  size={24}
                  className="bg-[#EB148C] text-white rounded-full size-9 p-1"
                />
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-2  ">
              <button
                type="submit"
                className="px-3 py-2 bg-[#EB148C] text-xs font-semibold text-white rounded-md"
              >
                {t("updateProfile")}
              </button>
            </div>
          </aside>
        </div>
      </form>
    </section>
  );
};

export default UserProfile;
