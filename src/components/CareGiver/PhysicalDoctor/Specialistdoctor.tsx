"use client";
import React, { useEffect, useState } from "react";
import { catagory, specialist } from "../Interface";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { DatePicker, Modal, TimePicker } from "rsuite";
import PhoneInput from "react-phone-input-2";
import { getUserID, isAuthenticate } from "@/lib/authHandler";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import SignIn from "@/components/Auth/SignIn";
import { PaymentOrder } from "./PaymentOrder";
import { useRouter } from "next/navigation";
import moment from "moment";

const Specialistdoctor = ({
  physicalDoctorId,
  catagory,
  totalCost,
}: {
  physicalDoctorId: string | null;
  catagory: catagory[];
  totalCost: number;
}) => {
  const { t } = useTranslation();
  const [button, setbutton] = useState(false);
  const [authmodel, setAuthmodel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onlinePayment, setOnlinePayment] = useState<string>("bkash");
  const router = useRouter();
  const [values, setValues] = useState<specialist>({
    fullName: "",
    visitDate: null,
    visitTime: null,
    address: "",
    age: "",
    weight: "",
    payment: "online",
    physicalDoctorId: physicalDoctorId || "",
    gender: "Male",
    district: "",
    thana: "",
  });
  const [phoneData, setPhoneData] = useState({
    countryCode: "",
    dialCode: "",
    phone: "",
  });

  const handleSignIn: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAuthmodel(!authmodel);
  };

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
  const handleChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleOnlinePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnlinePayment(e.target.value);
  };
  const handleDateChange = (visitDate: Date | null) => {
    setValues({ ...values, visitDate });
  };

  const handleTimeChange = (visitTime: Date | null) => {
    setValues({ ...values, visitTime });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setbutton(true);
      // user functional
      const userId = await getUserID();
      const userauth = await isAuthenticate();
      if (!userauth) {
        setAuthmodel(true);
        return;
      }
      const response = await PaymentOrder(
        values,
        phoneData,
        userId,
        onlinePayment,
        router,
        totalCost
      );
      if (response.success) {
        const today = moment().format("dddd, MMMM D, YYYY");
        router.push(
          `/receipt?auth_time=${today}&req_reference_number=${response.data.invoiceNumber}`
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setbutton(false);
    }
  };

  return (
    <div className="p-3 md:p-4 2xl:p-7  shadow-[-6px_6px_37.5px_7px_rgba(0,_0,_0,_0.1)] rounded-md">
      <p className="text-lg font-[550]">
        {t("patientdetalis")} <span className="text-red-500 text-sm">*</span>{" "}
      </p>
      <div className="w-full p-0.5 border border-pink-500 rounded-md mt-0.5">
        <select
          name="category"
          value={values.category}
          onChange={handleChanged}
          id="category"
          className="w-full p-2 outline-none text-sm cursor-pointer"
        >
          {catagory.map((Item, index) => (
            <option key={index} value={Item._id}>
              {Item.name}
            </option>
          ))}
        </select>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="grid gap-3 mt-3 md:grid-cols-2">
          <div className="">
            <label className="relative block text-sm font-[450]">
              {t("fullName")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder={t("enterFullName")}
              className="w-full p-2 mt-1 text-sm border border-gray-300 rounded outline-none"
              name="fullName"
              onChange={handleChanged}
              value={values?.fullName}
              required
            />
          </div>
          <div className="">
            <label className="relative block text-sm font-[450] mb-1.5">
              {t("phone_number")} <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              country={"bd"}
              // disableCountryCode={false}
              onChange={handlePhoneChange}
              inputStyle={{
                width: "100%",
              }}
            />
          </div>
        </div>
        <div className="grid gap-3 mt-1.5 md:grid-cols-2">
          <div className="">
            <label className="relative block text-sm font-[450]" htmlFor="date">
              {t("selectdate")} <span className="text-red-500">*</span>
            </label>

            <DatePicker
              placeholder={t("selectdateplaceholder")}
              style={{ width: "100%" }}
              className="mt-2 "
              value={values.visitDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="">
            <label className="relative block text-sm font-[450]" htmlFor="time">
              {t("selecttime")}
              <span className="text-red-500">*</span>
            </label>

            <TimePicker
              format="hh:mm aa"
              showMeridiem
              className="mt-2"
              value={values.visitTime}
              style={{ width: "100%" }}
              onChange={handleTimeChange}
              placeholder={t("selecttimeplaceholder")}
            />
          </div>
        </div>
        <div className="grid gap-3 mt-1.5 md:grid-cols-2">
          <div className="">
            <label
              className="relative block text-sm font-[450]"
              htmlFor="district"
            >
              {t("district")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder={t("district_placeholder")}
              className="w-full p-2 mt-1 text-sm border border-gray-300 rounded outline-none"
              name="district"
              onChange={handleChanged}
              value={values?.district}
              required
            />
          </div>
          <div className="">
            <label
              className="relative block text-sm font-[450]"
              htmlFor="thana"
            >
              {t("thana")}
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              placeholder={t("thana_placeholder")}
              className="w-full p-2 mt-1 text-sm border border-gray-300 rounded outline-none"
              name="thana"
              onChange={handleChanged}
              value={values?.thana}
              // required
            />
          </div>
        </div>
        <div className="grid gap-3 mt-1.5 md:grid-cols-2">
          <div className="">
            <label
              className="relative block text-sm font-[450]"
              htmlFor="address"
            >
              {t("address")}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder={t("addressPlaceholder")}
              className="w-full p-2 mt-1 text-sm border border-gray-300 rounded outline-none"
              name="address"
              onChange={handleChanged}
              value={values?.address}
              required
            />
          </div>
          <div className="">
            <label className="relative block text-sm font-[450]" htmlFor="age">
              {t("age")}
            </label>
            <input
              type="text"
              placeholder={t("agePlaceholder")}
              className="w-full p-2 mt-1 text-sm border border-gray-300 rounded outline-none"
              name="age"
              onChange={handleChanged}
              value={values?.age}
            />
          </div>
        </div>
        <div className="grid gap-3 mt-1.5 md:grid-cols-2">
          <div className="">
            <label
              className="relative block text-sm font-[450]"
              htmlFor="weight"
            >
              {t("Weight")}
            </label>
            <input
              type="text"
              placeholder={t("weightplaceholder")}
              className="w-full p-2 mt-1 text-sm border border-gray-300 rounded outline-none"
              name="weight"
              onChange={handleChanged}
              value={values?.weight}
            />
          </div>
          <div className="">
            <label
              className="relative block text-sm font-[450]"
              htmlFor="gender"
            >
              {t("gender")}
            </label>
            <select
              name="gender"
              id="gender"
              value={values?.gender}
              onChange={handleChanged}
              className="w-full p-2 mt-1 text-sm border border-gray-300 rounded outline-none"
            >
              <option value="Male">{t("male")}</option>
              <option value="FeMale">{t("female")}</option>
            </select>
          </div>
        </div>
        {/* <div className="grid gap-3 mt-4  md:grid-cols-2">
          <div className="">
            <label className="block  text-sm font-medium text-gray-700">
              {t("selectPaymentMethod")}
            </label>

            <select
              name="payment"
              id="payment"
              value={values?.payment}
              onChange={handleChanged}
              className=" p-2 w-full mt-1 cursor-pointer text-sm border border-pink-500 rounded outline-none"
            >
              <option value="cod"> {t("cash_on_delivery")}</option>
              <option value="online">{t("online_payment")}</option>
            </select>
          </div>
        </div> */}
        {values.payment === "online" && (
          <div className="mt-3">
            <h2 className="block  text-sm font-medium text-gray-700">
              {t("paymentphy")}
            </h2>
            <div className="border rounded-lg p-2 mb-3 mt-2 flex items-center justify-between ">
              <div className="flex items-center w-full">
                <input
                  type="radio"
                  id="bkash"
                  name="onlinepayment"
                  value="bkash"
                  className="accent-pink-500 cursor-pointer"
                  checked={onlinePayment === "bkash"}
                  onChange={handleOnlinePayment}
                />
                <label
                  htmlFor="bkash"
                  className="ml-2 text-xs font-medium text-[#16020B] cursor-pointer  w-full"
                >
                  {t("bkash_payment")}
                </label>
              </div>
              <Image
                src="/services/Bkash.svg"
                alt="bKash logo"
                className="h-8 w-14"
                width={56}
                height={32}
              />
            </div>
            <div className="border rounded-lg p-2  flex items-center justify-between">
              <div className="flex items-center w-[80%] ">
                <input
                  type="radio"
                  id="card"
                  name="onlinepayment"
                  value="card"
                  className="accent-pink-500 cursor-pointer"
                  checked={onlinePayment === "card"}
                  onChange={handleOnlinePayment}
                />
                <label
                  htmlFor="card"
                  className="ml-2 text-xs font-medium text-[#16020B] cursor-pointer  w-full"
                >
                  {t("card_payment")}
                </label>
              </div>
              <div className="flex space-x-2">
                <Image
                  src="/services/Card.svg"
                  alt="MasterCard logo"
                  className="h-8 w-24"
                  width={70}
                  height={42}
                />
              </div>
            </div>
          </div>
        )}
        <div className="grid  mt-2.5 md:grid-cols-3">
          <span className="md:col-span-2"></span>

          <button
            type="submit"
            className="bg-[#EB148C] md:col-span-1 py-2 text-white font-medium text-base rounded-md"
          >
            {button ? t("payment.loading") : t("Continue to Payment")}
          </button>
        </div>
      </form>
      <Modal open={authmodel} onClose={handleSignIn} size="sm">
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <SignIn />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Specialistdoctor;
