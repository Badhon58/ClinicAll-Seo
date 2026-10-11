"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiLocationOn } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { DatePicker } from "rsuite";
const OldAgeCare = () => {
  const { t } = useTranslation();
  const [onlinePayment, setOnlinePayment] = useState("bkash");
  const [paymentAmount, setPaymentAmount] = useState("500");
  const [Hours, setHours] = useState("2");
  const [hour_amount, setHour_amount] = useState("2&500");

  const handleOnlinePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    setOnlinePayment(e.target.value);
  };

  const handleChoseHours = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const time = e.target.value;
    const time_date = time.split("&");
    setHour_amount(time);
    setHours(time);
    setPaymentAmount(time_date[1]);
  };

  return (
    <div className="p-6 shadow-[-6px_6px_17.5px_1px_#10285130] rounded-md mt-3">
      <p className="text-lg font-[550]">Read The Rules Before Booking</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        sapiente minus dolor beatae. Necessitatibus sunt culpa commodi delectus
        expedita fugiat, magni sint aliquam, odit laboriosam et, laborum iure
        dicta impedit!
      </p>
      <div className="md:grid md:grid-cols-2 gap-3 mt-3">
        
        <div className="w-full">
          <label className=" text-base font-medium text-gray-700">
            Chose Hours
          </label>
          <div className=" border rounded flex items-center px-2 w-full">
            <IoMdTime size={23} />
            <select
              name="ChoseHours"
              id="ChoseHours"
              className="outline-none w-full cursor-pointer py-2"
              onChange={handleChoseHours}
              value={hour_amount}
            >
              <option value="2&500">2 Hours</option>
              <option value="4&800">4 Hours</option>
              <option value="6&1000">6 Hours</option>
              <option value="12&1200">12 Hours</option>
              <option value="24&1500">24 Hours</option>
            </select>
          </div>
        </div>

        <div className="w-full">
          <label
            htmlFor="ChoseDate"
            className=" text-base font-medium text-gray-700"
          >
            Chose Date
          </label>
          <DatePicker oneTap className="w-full" />
        </div>

        <div className="w-full">
          <label
            htmlFor="ChoseTime"
            className=" text-base font-medium text-gray-700"
          >
            Chose Time
          </label>
          <DatePicker format="HH:mm:ss" editable={false} className="w-full" />
        </div>

        <div className="w-full">
          <label
            htmlFor="address"
            className=" text-base font-medium text-gray-700"
          >
            Address
          </label>
          <div className="w-full border rounded-md p-1.5 flex items-center">
            <CiLocationOn size={23} />
            <input
              type="text"
              className="outline-none ml-2 "
              placeholder="Enter address"
            />
          </div>
        </div>

        <div className="w-full">
          <label
            htmlFor="address"
            className=" text-base font-medium text-gray-700 w-full"
          >
            Payable Amount
          </label>
          <div className="w-full text-pink-500 font-medium border rounded-md p-1.5 flex items-center pl-3">
            BDT {paymentAmount}
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="block  text-base font-medium text-gray-700">
            {t("paymentphy")}
          </h2>
          <div className="border rounded-lg  mb-3 mt-2 px-2 flex items-center justify-between ">
            <div className="flex items-center  w-full ">
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
                className="ml-2 py-3  text-xs font-medium text-[#16020B] cursor-pointer  w-full"
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
          <div className="border rounded-lg px-2 flex items-center justify-between pr-2">
            <div className="flex items-center  w-full ">
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
                className="ml-2 py-3  text-xs font-medium text-[#16020B] cursor-pointer  w-full"
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
          <div className="flex justify-end items-center mt-3">
            <button className="flex items-center space-x-2 px-4 py-1.5 rounded-md border-[#E2136E] bg-[#E2136E] text-white font-medium text-sm ">
              {t("submit")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldAgeCare;
