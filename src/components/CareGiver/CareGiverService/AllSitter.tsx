"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiLocationOn } from "react-icons/ci";
import { DatePicker, DateRangePicker, Modal } from "rsuite";
import { DateRange } from 'rsuite/DateRangePicker';
import {
    CareGiverBookingPayload,
    ServicePackage,
} from "../Interface";
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import { getUserID, isAuthenticate } from "@/lib/authHandler";
import SignIn from "@/components/Auth/SignIn";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import Selection from "./Selection";
import { MdAccessTimeFilled } from "react-icons/md";
import { CareGiverPayment } from "@/components/CareGiver/CareGiverPayment";
const AllSitter = () => {
    const { t, i18n } = useTranslation();
    const [onlinePayment, setOnlinePayment] = useState("bkash");
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const [signInPage, setSignInPage] = useState(false);
    const [loading, setLoading] = useState(false)
    const [dayCount, setDayCount] = useState(1)
    const [selectedService, setSelectedService] = useState<ServicePackage>();
    const [userInfo, setUserInfo] = useState<CareGiverBookingPayload>({
        careGiverId: "",
        userId: "",
        fullName: "",
        countryCode: "",
        dialCode: "",
        phone: "",
        dutyTime: "",
        startDate: "",
        endDate: "",
        startTime: "",
        session: 0,
        gender: "male",
        paymentMethod: "online",
        address: "",
        age: "",
        weight: "",
        discountedPrice: 0,
        discountPercent: 0,
        discountReason: "0"
    });
    const [allServicePackage, setAllServicePackage] = useState<ServicePackage[]>()
    const [dateRange, setDateRange] = useState<[Date, Date] | null>([
        new Date(),
        new Date(),
    ]);
    const [deliveryOption, setDeliveryOption] = useState<string>("cod");
    const router = useRouter()
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const addDays = (date: Date, days: number): Date => {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    };

    const predefinedRanges: {
        label: string;
        value: DateRange;
    }[] = [
            {
                label: 'Today',
                value: [today, today]
            },
            // {
            //     label: 'Today + Tomorrow',
            //     value: [today, addDays(today, 1)]
            // },
            // {
            //     label: 'Next 7 Days',
            //     value: [today, addDays(today, 7)]
            // }
        ];

    const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const values = e.target.value;
        setDeliveryOption(values);
    };


    const showModal = () => {
        setSignInPage(!signInPage);
    };

    const handleOnlinePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault();
        setOnlinePayment(e.target.value);
        setUserInfo((prev) => ({
            ...prev,
            paymentMethod: "online",
        }));
    };

    const handleSelectPackage = (item: ServicePackage) => {
        setSelectedService(item)
        // setPaymentAmount(item.sellPrice || 0)
        setDateRange([
            new Date(),
            new Date(),
        ])
    }

    const handlePhoneChange = (value: string, country: any) => {
        let phoneWithoutDialCode = value.replace(`+${country.dialCode}`, "").trim();
        setUserInfo((prev) => ({
            ...prev,
            countryCode: country.countryCode.toUpperCase(),
            dialCode: country.dialCode,
            phone: phoneWithoutDialCode.startsWith(country.dialCode)
                ? phoneWithoutDialCode.slice(country.dialCode.length)
                : phoneWithoutDialCode,
        }))
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const userId = await getUserID();
            const userAuthentication = await isAuthenticate();
            if (!userId && !userAuthentication) {
                setSignInPage(!signInPage);
                return
            }
            const response = await CareGiverPayment(
                selectedService,
                userInfo,
                dateRange,
                onlinePayment,
                router,
                deliveryOption,
                dayCount
            )

        } catch (error) {
            console.log(error);
        }
    }

    const handleDateRange = (range: any) => {
        setDateRange(range)
        if (range?.[0] && range?.[1]) {
            const start = new Date(range[0]);
            const end = new Date(range[1]);
            const diffTime = end.getTime() - start.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (selectedService) {
                let finalAmount = diffDays * Number(selectedService?.sellPrice) || 0
                // setPaymentAmount(Number(finalAmount))
                if (diffDays === 0) {
                    setDayCount(1)
                } else {
                    setDayCount(diffDays)
                }
            }
        }
    }

    const init = async () => {
        try {
            setLoading(true)
            if (type !== null) {
                const response = await apiCall(
                    Methods.GET,
                    `${EndPoint.CARE_GIVER_GET_ALL}?serviceType=${type}`
                )
                setAllServicePackage(response.data)
                setSelectedService(response.data[0])

            } else {
                const response = await apiCall(
                    Methods.GET,
                    `${EndPoint.CARE_GIVER_GET_ALL}?serviceType=Nurse`
                )
                setAllServicePackage(response.data)
                setSelectedService(response.data[0])
            }

            const userId = await getUserID();
            if (userId) {
                const response = await apiCall(
                    Methods.GET,
                    `${EndPoint.SINGLE_USER}/${userId}`
                );
                if (response.success) {
                    setUserInfo((prev) => ({
                        ...prev,
                        fullName: `${response.data.firstName} ${response.data.lastName}`,
                        countryCode: response.data.countryCode,
                        dialCode: response.data.dialCode,
                        phone: response.data.phone,
                        userId: userId
                    }))
                }
            } else {
                setSignInPage(true)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        init()
    }, [searchParams])

    return (
        <div className='grid lg:grid-cols-2 gap-4 xl:gap-7'>
            {/* Left Section  */}
            <div>
                {/* Selector  */}
                <Selection />
                {/* package Selector  */}

                <div className="p-6 shadow-[-3px_3px_17.5px_1px_#10285130] rounded-md mt-3 min-h-[40vh]">
                    <p className="text-[17px] font-[550]">{t("caregiver.selectPackage")}</p>
                    {loading ?
                        <div className="grid grid-cols-1 gap-3 mt-2">
                            <p
                                className="flex flex-col bg-neutral-100 w-full h-20 animate-pulse rounded-xl p-4 gap-4"
                            >
                            </p>
                            <p
                                className="flex flex-col bg-neutral-100 w-full h-20 animate-pulse rounded-xl p-4 gap-4"
                            >
                            </p>
                        </div>
                        :
                        <div className="grid grid-cols-1  gap-3 mt-2">
                            {allServicePackage && allServicePackage.map((item, index) => {
                                const isSelected = selectedService === item;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleSelectPackage(item)}
                                        className={`
                p-3 py-3 rounded-lg cursor-pointer transition-all duration-200
                flex justify-between items-center
                border shadow-sm
                ${isSelected
                                                ? "border-[#E2136E] "
                                                : "border-gray-200 shadow-[0_8px_15px_rgba(0,0,0,0.02)]"
                                            }
              `}
                                    >
                                        {/* LEFT SIDE */}
                                        <div className="flex gap-2 items-center">
                                            <div
                                                className={`
                                                    p-2 rounded-md
                                                    ${isSelected ? "bg-[#E2136E] bg-opacity-90" : "bg-[#E2136E]/10"}
                                                    `}
                                            >
                                                <MdAccessTimeFilled
                                                    size={22}
                                                    className={isSelected ? "text-white" : "text-[#E2136E]"}
                                                />
                                            </div>

                                            <div>
                                                <p className="flex items-center">
                                                    <span className="font-semibold text-sm">
                                                        { }
                                                        {i18n.language == "bn" ? item.bnDutyTime : item.dutyTime}
                                                    </span>

                                                    <span className="ml-2 text-xs text-gray-400 font-medium">
                                                        {item.patientType ? t(item.patientType) : t("Normal")}
                                                    </span>
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    {item.hasSession ? "" : t("Daily")}
                                                </p>
                                            </div>
                                        </div>

                                        {/* RIGHT SIDE */}
                                        <div className="text-right">
                                            <p
                                                className={`font-semibold text-sm ${isSelected ? "text-[#E2136E]" : "text-gray-700"
                                                    }`}
                                            >
                                                {t("moneyCount", { count: item.sellPrice })}
                                            </p>

                                            {item.withFood && (
                                                <p className="text-xs text-gray-400">{t("withfood")}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    }

                </div>
            </div>
            <div className="p-4 px-6 shadow-[-3px_3px_17.5px_1px_#10285130] rounded-md">
                <p className="text-[17px] font-[550] py-2 ">{t("PatientFormInfo2")}</p>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 mt-3">
                    {/* fullName */}
                    <div className="">
                        <label className="block text-sm mb-1 font-medium text-gray-700" htmlFor="fullName">{t("patientName")}</label>
                        <input
                            type="text"
                            className=" px-2 py-[7px] text-sm w-full border rounded-md overflow-hidden outline-none"
                            placeholder={t("enterPatientName")}
                            value={userInfo?.fullName}
                            name="fullName"
                            onChange={handleChange}
                        />
                    </div>

                    {/* phoneNumber */}
                    <div>
                        <label className="block text-sm mb-1 font-medium text-gray-700">
                            {t("phoneNumber")}
                        </label>
                        <PhoneInput
                            country={"bd"}
                            disableCountryCode={true}
                            onChange={handlePhoneChange}
                            value={`${userInfo.dialCode}${userInfo.phone}` || ""}
                            inputStyle={{ width: "100%" }}
                        />
                    </div>

                    {/* gender */}
                    <div className="grid grid-cols-2 gap-3 col-span-2">
                        <div className="col-span-1">
                            <label htmlFor="gender" className="block text-sm mb-1 font-medium text-gray-700">
                                {t("gender")}
                            </label>
                            <select
                                name="gender"
                                value={userInfo?.gender}
                                onChange={handleChange}
                                className="px-2 py-2 text-sm w-full overflow-hidden outline-none border rounded flex items-center"
                            >

                                <option value="male">{t("male")}</option>
                                <option value="female">{t("female")}</option>
                                <option value="other">{t("others")}</option>
                            </select>
                        </div>

                        {/* age */}
                        <div>
                            <label htmlFor="age" className="block text-sm mb-1 font-medium text-gray-700">
                                {t("age")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="age"
                                name="age"
                                placeholder={t("agePlaceholder")}
                                className=" px-2 py-[7px] text-sm w-full overflow-hidden outline-none border rounded-md"
                                value={userInfo.age}
                                onChange={handleChange}
                            />
                        </div>

                        {/* weight */}
                        <div>
                            <label htmlFor="weight" className="block text-sm mb-1 font-medium text-gray-700">
                                {t("weight")}
                            </label>
                            <input
                                type="text"
                                id="weight"
                                name="weight"
                                placeholder={t("weightPlaceholder")}
                                className=" px-2 py-[7px] text-sm w-full overflow-hidden outline-none border rounded-md"
                                value={userInfo.weight}
                                onChange={handleChange}
                            />

                        </div>
                    </div>
                    {/* ChoseDate */}
                    <div>
                        <label
                            htmlFor="ChoseDate"
                            className=" block text-sm mb-1 font-medium text-gray-700"
                        >
                            {t("caregiver.selecteDate")}
                        </label>
                        <DateRangePicker
                            value={dateRange}
                            onChange={(range) => {
                                handleDateRange(range)
                            }}
                            format="yyyy-MM-dd"
                            className="w-full"
                            ranges={predefinedRanges}
                            disabledDate={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);

                                return date.getTime() < today.getTime();
                            }}
                        />
                    </div>

                    {/* ChoseTime */}
                    <div>
                        <label
                            htmlFor="ChoseTime"
                            className=" block text-sm mb-1 font-medium text-gray-700"
                        >
                            {t("caregiver.selectTime")}
                        </label>
                        <DatePicker
                            format="hh:mm:ss aa"
                            editable={false}
                            className="w-full"
                            onChange={(value) => {
                                setUserInfo((prev) => ({
                                    ...prev,
                                    startTime: value ? value.toString() : "",
                                }));
                            }}
                        />
                    </div>

                    {/* address */}
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-sm mb-1 font-medium text-gray-700"
                        >
                            {t("address")}
                        </label>

                        <div className="flex px-2 items-center w-full border rounded-md overflow-hidden">
                            <CiLocationOn size={23} />
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder={t("addressPlaceholder")}
                                className=" px-2 py-[7px] text-sm w-full overflow-hidden outline-none"
                                value={userInfo.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* payment details  */}

                    <div className="col-span-2 pt-2">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="payment"
                                className=" block text-sm mb-2 font-medium text-gray-700"
                            >
                                {t("AmountPayable")}
                            </label>
                        </div>
                        <div className=" border p-2.5 rounded-md">
                            <div className="flex items-center justify-between p-1">
                                <span className="text-sm text-gray-500">
                                    {t("caregiver.packagePrice")}
                                </span>
                                <span className="font-medium text-pink-500 text-sm">
                                    {t("moneyCount", { count: selectedService?.sellPrice || 0 })}
                                </span>
                            </div>
                            <hr className="my-2 border" />

                            <div className="flex items-center justify-between p-1">
                                <span className="text-sm text-gray-500">
                                    {t("caregiver.numberOfDays")}
                                </span>
                                <span className="font-medium text-pink-500 text-sm">
                                    {t("numberconvert", { count: dayCount || 0 })}
                                </span>
                            </div>

                            <hr className="my-2 border" />

                            <div className=" flex items-center justify-between p-1">
                                <span className="text-sm font-medium text-gray-600">
                                    {t("caregiver.totalAmount")}
                                </span>

                                <span className="text-base font-semibold text-pink-600">
                                    {t("moneyCount", {
                                        count: (selectedService?.sellPrice || 0) * dayCount
                                    })}
                                </span>
                            </div>

                        </div>
                    </div>
                    {/* payment option  */}
                    <div className={` col-span-2`}>
                        <h2 className="block text-sm mb-1 font-medium text-gray-700">
                            {t("choose_payment_option")}
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <label htmlFor="homeDelivery" className="border rounded-lg flex items-center  px-2 py-3 cursor-pointer">
                                <input
                                    type="radio"
                                    id="homeDelivery"
                                    name="deliveryOption"
                                    value="cod"
                                    className="accent-pink-500 cursor-pointer"
                                    checked={deliveryOption === "cod"}
                                    onChange={handleDeliveryChange}
                                />
                                <p
                                    className="ml-2 text-sm font-medium cursor-pointer"
                                >
                                    {t("cash_on_delivery")}
                                </p>
                            </label>
                            <label className="border rounded-lg  flex items-center px-2 py-3 cursor-pointer" htmlFor="StorePickup">
                                <input
                                    type="radio"
                                    id="StorePickup"
                                    name="deliveryOption"
                                    value="online"
                                    className="accent-pink-500 cursor-pointer"
                                    checked={deliveryOption === "online"}
                                    onChange={handleDeliveryChange}
                                />
                                <p

                                    className="ml-2 text-sm font-medium cursor-pointer"
                                >
                                    {t("online_payment")}
                                </p>
                            </label>
                        </div>
                    </div>
                    {deliveryOption !== "cod" &&
                        <div className="col-span-2 transition delay-700">
                            <h2 className="block text-sm mb-1 font-medium text-gray-700">
                                {t("paymentphy")}
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="border rounded-lg  px-2 flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center  w-full ">
                                        <input
                                            type="radio"
                                            id="bkash"
                                            name="onlinepayment"
                                            value="bkash"
                                            className="accent-pink-500 "
                                            checked={onlinePayment === "bkash"}
                                            onChange={handleOnlinePayment}
                                        />
                                        <p
                                            className="ml-2 py-3  text-xs font-medium text-[#16020B] cursor-pointer  w-full"
                                        >
                                            {t("bkash_payment")}
                                        </p>
                                    </div>
                                    <Image
                                        src="/services/Bkash.svg"
                                        alt="bKash logo"
                                        className="h-8 w-14"
                                        width={56}
                                        height={32}
                                    />
                                </label>
                                <label className="border rounded-lg px-2 flex items-center justify-between cursor-pointer">
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
                                        <p
                                            className="ml-2 py-3  text-xs font-medium text-[#16020B] cursor-pointer  w-full"
                                        >
                                            {t("card_payment")}
                                        </p>
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
                                </label>
                            </div>
                        </div>
                    }

                </div>
                <div className="flex justify-end items-center mt-3">
                    <button onClick={handleSubmit} className="flex items-center space-x-2 px-4 py-1.5 rounded-md border-[#E2136E] bg-[#E2136E] text-white font-medium text-sm ">
                        {t("submit")}
                    </button>
                </div>
            </div>

            <Modal
                size="sm"
                open={signInPage}
                onClose={showModal}
                backdrop={"static"}
                keyboard={false}
            >
                {/* <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header> */}
                <Modal.Body style={{ minWidth: "30rem" }}>
                    {/* <AuthLib /> */}
                    <SignIn />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AllSitter