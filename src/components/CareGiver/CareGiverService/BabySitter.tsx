// "use client";
// import Image from "next/image";
// import { useSearchParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { CiLocationOn } from "react-icons/ci";
// import { DatePicker, DateRangePicker, Modal } from "rsuite";
// import {
//   babySitterPackage,
//   babySitterPackageInterface,
//   CareGiverBookingPayload,
//   nursePackage,
//   paramedicPackage,
//   physioTherapistPackage,
//   speechTherapistPackage,
//   trainedTherapistPackage,
// } from "../Interface";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { getUserID, isAuthenticate } from "@/lib/authHandler";
// import SignIn from "@/components/Auth/SignIn";
// import { apiCall } from "@/lib/axios-client";
// import { EndPoint, Methods } from "@/api/config";
// import { MdAccessTimeFilled } from "react-icons/md";

// const BabySitter = () => {
//   const { t } = useTranslation();
//   const [onlinePayment, setOnlinePayment] = useState("bkash");
//   const [paymentAmount, setPaymentAmount] = useState(0);
//   const searchParams = useSearchParams();
//   const careGiverId = searchParams.get("careGiverId");
//   const type = searchParams.get("type");
//   const [signInPage, setSignInPage] = useState(false);
//   const [loading, setLoading] = useState(false)
//   const [dayCount, setDayCount] = useState(1)
//   const [selectedService, setSelectedService] = useState<babySitterPackageInterface>();
//   const [userInfo, setUserInfo] = useState<CareGiverBookingPayload>({
//     careGiverId: careGiverId || "",
//     userId: "",
//     fullName: "",
//     countryCode: "",
//     dialCode: "",
//     phone: "",
//     dutyTime: "8 Hours",
//     startDate: "",
//     endDate: "",
//     startTime: "",
//     session: 0,
//     gender: "male",
//     paymentMethod: "online",
//     address: "",
//     age: "",
//     weight: "",
//   });
//   const [dateRange, setDateRange] = useState<[Date, Date] | null>([
//     new Date(),
//     new Date(),
//   ]);
//   const [sitterPackage, setSitterPackage] = useState<babySitterPackageInterface[]>([])


//   const showModal = () => {
//     setSignInPage(!signInPage);
//   };

//   const handleOnlinePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // e.preventDefault();
//     setOnlinePayment(e.target.value);
//     setUserInfo((prev) => ({
//       ...prev,
//       paymentMethod: "online",
//     }));
//   };

//   const handleSelectPackage = (item: babySitterPackageInterface) => {
//     setSelectedService(item)
//     setPaymentAmount(item.price)
//     setDateRange([
//       new Date(),
//       new Date(),
//     ])
//   }

//   const handlePhoneChange = (value: string, country: any) => {
//     let phoneWithoutDialCode = value.replace(`+${country.dialCode}`, "").trim();
//     setUserInfo((prev) => ({
//       ...prev,
//       countryCode: country.countryCode.toUpperCase(),
//       dialCode: country.dialCode,
//       phone: phoneWithoutDialCode.startsWith(country.dialCode)
//         ? phoneWithoutDialCode.slice(country.dialCode.length)
//         : phoneWithoutDialCode,
//     }))
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setUserInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault()
//     try {
//       const userId = await getUserID();
//       const userAuthentication = await isAuthenticate();
//       if (!userId && !userAuthentication) {
//         setSignInPage(!signInPage);
//         return
//       }
//       userInfo.userId = userId || ""
//       const response = await apiCall(Methods.POST, EndPoint.CAREGIVER_BOOK_NEW, userInfo)
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const handleDateRange = (range: any) => {
//     setDateRange(range)
//     if (range?.[0] && range?.[1]) {
//       const start = new Date(range[0]);
//       const end = new Date(range[1]);
//       const diffTime = end.getTime() - start.getTime();
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       if (selectedService) {
//         let finalAmount = diffDays * selectedService?.price
//         setPaymentAmount(Number(finalAmount))
//         setDayCount(diffDays)
//       }
//     }
//   }

//   const init = async () => {
//     try {
//       setLoading(true)
//       if (type === "babysitter") {
//         setSelectedService(babySitterPackage[0])
//         setPaymentAmount(babySitterPackage[0].price)
//         setSitterPackage(babySitterPackage)
//       }
//       else if (type === "nurse") {
//         setSelectedService(nursePackage[0])
//         setPaymentAmount(nursePackage[0].price)
//         setSitterPackage(nursePackage)
//       }
//       else if (type === "paramedics") {
//         setSelectedService(paramedicPackage[0])
//         setPaymentAmount(paramedicPackage[0].price)
//         setSitterPackage(paramedicPackage)
//       }
//       else if (type === "physiotherapist") {
//         setSelectedService(physioTherapistPackage[0])
//         setPaymentAmount(physioTherapistPackage[0].price)
//         setSitterPackage(physioTherapistPackage)
//       }
//       else if (type === "speechtherapist") {
//         setSelectedService(speechTherapistPackage[0])
//         setPaymentAmount(speechTherapistPackage[0].price)
//         setSitterPackage(speechTherapistPackage)
//       }
//       else if (type === "trainedtherapist") {
//         setSelectedService(trainedTherapistPackage[0])
//         setPaymentAmount(trainedTherapistPackage[0].price)
//         setSitterPackage(trainedTherapistPackage)
//       }

//       const userId = await getUserID();
//       if (userId) {
//         const response = await apiCall(
//           Methods.GET,
//           `${EndPoint.SINGLE_USER}/${userId}`
//         );
//         if (response.success) {
//           console.log(response.data);
//           setUserInfo((prev) => ({
//             ...prev,
//             fullName: `${response.data.firstName} ${response.data.lastName}`,
//             countryCode: response.data.countryCode,
//             dialCode: response.data.dialCode,
//             phone: response.data.phone
//           }))
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     init()
//   }, [searchParams])

//   return (
//     <section>

//       <div className="p-6 shadow-[-3px_3px_17.5px_1px_#10285130] rounded-md mt-3">
//         <p className="text-[17px] font-[550]">{t("caregiver.selectPackage")}</p>
//         {loading ?
//           <div className="grid grid-cols-2 gap-3 mt-2">
//             <p
//               className="flex flex-col bg-neutral-100 w-full h-20 animate-pulse rounded-xl p-4 gap-4"
//             >
//             </p>
//             <p
//               className="flex flex-col bg-neutral-100 w-full h-20 animate-pulse rounded-xl p-4 gap-4"
//             >
//             </p>
//           </div>
//           :
//           <div className="grid grid-cols-1  gap-3 mt-2">
//             {sitterPackage && sitterPackage.map((item, index) => {
//               const isSelected = selectedService === item;
//               return (
//                 <div
//                   key={index}
//                   onClick={() => handleSelectPackage(item)}
//                   className={`
//                 p-3 py-3 rounded-lg cursor-pointer transition-all duration-200
//                 flex justify-between items-center
//                 border shadow-sm
//                 ${isSelected
//                       ? "border-[#E2136E] "
//                       : "border-gray-200 shadow-[0_8px_15px_rgba(0,0,0,0.02)]"
//                     }
//               `}
//                 >
//                   {/* LEFT SIDE */}
//                   <div className="flex gap-2 items-center">
//                     <div
//                       className={`
//                     p-2 rounded-md
//                     ${isSelected ? "bg-[#E2136E] bg-opacity-90" : "bg-[#E2136E]/10"}
//                   `}
//                     >
//                       <MdAccessTimeFilled
//                         size={22}
//                         className={isSelected ? "text-white" : "text-[#E2136E]"}
//                       />
//                     </div>

//                     <div>
//                       <p className="flex items-center">
//                         <span className="font-semibold text-sm">
//                           {item.dutyTime} Hours
//                         </span>

//                         <span className="ml-2 text-xs text-gray-400 font-medium">
//                           {item.patientType || "Normal"}
//                         </span>
//                       </p>

//                       <p className="text-xs text-gray-400">
//                         {item.hasSession ? "Per Session" : "Daily"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* RIGHT SIDE */}
//                   <div className="text-right">
//                     <p
//                       className={`font-semibold text-sm ${isSelected ? "text-[#E2136E]" : "text-gray-700"
//                         }`}
//                     >
//                       {t("moneyCount", { count: item.price })}
//                     </p>

//                     {item.withFood && (
//                       <p className="text-xs text-gray-400">(With Food)</p>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         }

//       </div>
//       <div className="p-4 px-6 shadow-[-3px_3px_17.5px_1px_#10285130] rounded-md mt-3">
//         <p className="text-[17px] font-[550] pt-4">{t("PatientFormInfo")}</p>
//         <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 mt-3">
//           {/* fullName */}
//           <div className="">
//             <label className="block text-sm mb-1 font-medium text-gray-700" htmlFor="fullName">{t("patientName")}</label>
//             <input
//               type="text"
//               className=" px-2 py-[7px] text-sm w-full border rounded-md overflow-hidden outline-none"
//               placeholder={t("enterPatientName")}
//               value={userInfo?.fullName}
//               name="fullName"
//               onChange={handleChange}
//             />
//           </div>

//           {/* phoneNumber */}
//           <div>
//             <label className="block text-sm mb-1 font-medium text-gray-700">
//               {t("phoneNumber")}
//             </label>
//             <PhoneInput
//               country={"bd"}
//               disableCountryCode={true}
//               onChange={handlePhoneChange}
//               value={`${userInfo.dialCode}${userInfo.phone}` || ""}
//               inputStyle={{ width: "100%" }}
//             />
//           </div>

//           {/* gender */}
//           <div>
//             <label htmlFor="gender" className="block text-sm mb-1 font-medium text-gray-700">
//               {t("gender")}
//             </label>
//             <select
//               name="gender"
//               value={userInfo?.gender}
//               onChange={handleChange}
//               className="px-2 py-2 text-sm w-full overflow-hidden outline-none border rounded flex items-center"
//             >

//               <option value="male">{t("male")}</option>
//               <option value="female">{t("female")}</option>
//               <option value="other">{t("others")}</option>
//             </select>
//           </div>

//           {/* age */}
//           <div>
//             <label htmlFor="age" className="block text-sm mb-1 font-medium text-gray-700">
//               {t("age")} <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               id="age"
//               name="age"
//               placeholder={t("agePlaceholder")}
//               className=" px-2 py-[7px] text-sm w-full overflow-hidden outline-none border rounded-md"
//               value={userInfo.age}
//               onChange={handleChange}
//             />
//           </div>

//           {/* weight */}
//           <div>
//             <label htmlFor="weight" className="block text-sm mb-1 font-medium text-gray-700">
//               {t("weight")}
//             </label>
//             <input
//               type="text"
//               id="weight"
//               name="weight"
//               placeholder={t("weightPlaceholder")}
//               className=" px-2 py-[7px] text-sm w-full overflow-hidden outline-none border rounded-md"
//               value={userInfo.weight}
//               onChange={handleChange}
//             />

//           </div>

//           {/* ChoseDate */}
//           <div>
//             <label
//               htmlFor="ChoseDate"
//               className=" block text-sm mb-1 font-medium text-gray-700"
//             >
//               {t("caregiver.selecteDate")}
//             </label>
//             <DateRangePicker
//               value={dateRange}
//               onChange={(range) => {
//                 handleDateRange(range)
//               }}
//               format="yyyy-MM-dd"
//               className="w-full"
//               disabledDate={(date) => {
//                 const today = new Date();
//                 today.setHours(0, 0, 0, 0);

//                 return date.getTime() < today.getTime();
//               }}
//             />
//           </div>

//           {/* ChoseTime */}
//           <div>
//             <label
//               htmlFor="ChoseTime"
//               className=" block text-sm mb-1 font-medium text-gray-700"
//             >
//               {t("caregiver.selectTime")}
//             </label>
//             <DatePicker
//               format="HH:mm:ss"
//               editable={false}
//               className="w-full"
//               onChange={(value) => {
//                 setUserInfo((prev) => ({
//                   ...prev,
//                   startTime: value ? value.toString() : "",
//                 }));
//               }}
//             />
//           </div>

//           {/* address */}
//           <div>
//             <label
//               htmlFor="address"
//               className="block text-sm mb-1 font-medium text-gray-700"
//             >
//               {t("address")}
//             </label>

//             <div className="flex px-2 items-center w-full border rounded-md overflow-hidden">
//               <CiLocationOn size={23} />
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 placeholder={t("addressPlaceholder")}
//                 className=" px-2 py-[7px] text-sm w-full overflow-hidden outline-none"
//                 value={userInfo.address}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="col-span-2 pt-2">

//             <div className="flex items-center justify-between">
//               <label
//                 htmlFor="payment"
//                 className=" block text-sm mb-2 font-medium text-gray-700"
//               >
//                 {t("AmountPayable")}
//               </label>
//               {/* <p className=" px-2 py-[7px] bg text-sm border rounded-md overflow-hidden text-pink-500 font-medium">
//                 {t("moneyCount", { count: Number(paymentAmount) || 0 })}
//               </p> */}
//             </div>
//             <div className=" border p-2.5 rounded-md">
//               <div className="flex items-center justify-between p-1">
//                 <span className="text-sm text-gray-500">
//                   {t("caregiver.packagePrice")}
//                 </span>
//                 <span className="font-medium text-pink-500 text-sm">
//                   {t("moneyCount", { count: selectedService?.price || 0 })}
//                 </span>
//               </div>
//               <hr className="my-2 border" />

//               <div className="flex items-center justify-between p-1">
//                 <span className="text-sm text-gray-500">
//                   {t("caregiver.numberOfDays")}
//                 </span>
//                 <span className="font-medium text-pink-500 text-sm">
//                   {t("numberconvert", { count: dayCount || 0 })}
//                 </span>
//               </div>

//               <hr className="my-2 border" />

//               <div className=" flex items-center justify-between p-1">
//                 <span className="text-sm font-medium text-gray-600">
//                   {t("caregiver.totalAmount")}
//                 </span>

//                 <span className="text-base font-semibold text-pink-600">
//                   {t("moneyCount", {
//                     count: (selectedService?.price || 0) * dayCount
//                   })}
//                 </span>
//               </div>

//             </div>
//           </div>

//           {/* payment section  */}
//           <div className="col-span-2">
//             <h2 className="block text-sm mb-1 font-medium text-gray-700">
//               {t("paymentphy")}
//             </h2>
//             <div className="border rounded-lg  mb-3 mt-2 px-2 flex items-center justify-between ">
//               <div className="flex items-center  w-full ">
//                 <input
//                   type="radio"
//                   id="bkash"
//                   name="onlinepayment"
//                   value="bkash"
//                   className="accent-pink-500 cursor-pointer"
//                   checked={onlinePayment === "bkash"}
//                   onChange={handleOnlinePayment}
//                 />
//                 <label
//                   htmlFor="bkash"
//                   className="ml-2 py-3  text-xs font-medium text-[#16020B] cursor-pointer  w-full"
//                 >
//                   {t("bkash_payment")}
//                 </label>
//               </div>
//               <Image
//                 src="/services/Bkash.svg"
//                 alt="bKash logo"
//                 className="h-8 w-14"
//                 width={56}
//                 height={32}
//               />
//             </div>
//             <div className="border rounded-lg px-2 flex items-center justify-between pr-2">
//               <div className="flex items-center  w-full ">
//                 <input
//                   type="radio"
//                   id="card"
//                   name="onlinepayment"
//                   value="card"
//                   className="accent-pink-500 cursor-pointer"
//                   checked={onlinePayment === "card"}
//                   onChange={handleOnlinePayment}
//                 />
//                 <label
//                   htmlFor="card"
//                   className="ml-2 py-3  text-xs font-medium text-[#16020B] cursor-pointer  w-full"
//                 >
//                   {t("card_payment")}
//                 </label>
//               </div>
//               <div className="flex space-x-2">
//                 <Image
//                   src="/services/Card.svg"
//                   alt="MasterCard logo"
//                   className="h-8 w-24"
//                   width={70}
//                   height={42}
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end items-center mt-3">
//               <button onClick={handleSubmit} className="flex items-center space-x-2 px-4 py-1.5 rounded-md border-[#E2136E] bg-[#E2136E] text-white font-medium text-sm ">
//                 {t("submit")}
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>

//       <Modal
//         size="sm"
//         open={signInPage}
//         onClose={showModal}

//       >
//         <Modal.Header>
//           <Modal.Title></Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ minWidth: "30rem" }}>
//           {/* <AuthLib /> */}
//           <SignIn />
//         </Modal.Body>
//       </Modal>
//     </section>
//   );
// };

// export default BabySitter;
