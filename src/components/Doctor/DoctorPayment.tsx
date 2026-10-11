"use client";
import { getUserID, isAuthenticate } from "@/lib/authHandler";
import React, { useEffect, useState } from "react";
import { Appointment, Appointment2, DoctorProfile } from "./Interface";
import DoctorListProfile from "./DoctorListProfile";
import { toast } from "react-toastify";
import { convertTimeToBangla } from "@/lib/ConvertBanglatoEnglsh";
import { DoctorPay } from "@/lib/DoctorPay";
import moment from "moment";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, JsonHeader, Methods } from "@/api/config";
import PageLoading from "@/components/Seo/PageLoading";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Modal } from "rsuite";
// import AuthLib from "../common/AuthLib";
import SignIn from "../Auth/SignIn";
interface DoctorPaymentProps {
  _doc_id_: string;
  _date_: string;
  _time_: string;
}
const DoctorPayment: React.FC<DoctorPaymentProps> = ({
  _doc_id_,
  _date_,
  _time_,
}) => {
  const [loading, setLoading] = useState(true);
  const [SingleDoctor, setSingleDoctor] = useState<DoctorProfile>();
  const [selectDate, setSelectDate] = useState<string>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [docAppoitment, setDocAppoitment] = useState<Appointment2>({
    user: "",
    doctor: _doc_id_,
    firstName: "",
    lastName: "",
    email: "",
    gender: "male",
    phone: "",
    age: "",
    weight: "",
    dialCode: "",
  });
  const [savebutton, setSavebutton] = useState(false);
  const [ValidForm, setValidForm] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [payment, setPayment] = useState("bkash");
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [signInPage, setSignInPage] = useState(false);
  const [backdrop, setBackdrop] = useState<string | any>("static");
  const formattedDate = selectDate
    ? new Date(selectDate).toLocaleDateString(i18n.language, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  const expectedTimeMessage = selectedTime
    ? i18n.language === "bn"
      ? convertTimeToBangla(selectedTime)
      : selectedTime
    : i18n.language === "bn"
    ? t("noScheduledTime")
    : t("notScheduled");

  const init = async () => {
    try {
      setLoading(true);

      // Fetch doctor data if `_doc_id_` is available
      if (_doc_id_) {
        await fetchDoctorData(_doc_id_);
      }

      // Check if the user is authenticated
      const userauth = await isAuthenticate();
      const userId = await getUserID();

      // Fetch user data if authenticated and userId is available
      if (userauth && userId) {
        await fetchUserData(userId);
      } else {
        setSignInPage(!signInPage);
      }

      // Set the selected date and time
      setSelectDate(decodeURIComponent(_date_));
      setSelectedTime(decodeURIComponent(_time_));
    } catch (error) {
      console.error("Error in init function:", error);
      // Optionally, set an error state or show a notification to the user
    } finally {
      setLoading(false);
    }
  };

  // Helper function to fetch doctor data
  const fetchDoctorData = async (doctorId: any) => {
    const response: any = await apiCall(
      Methods.GET,
      `${EndPoint.DOCTOR_FIND_BY_ID}/${doctorId}`
    );
    setSingleDoctor(response.data);
  };

  // Helper function to fetch user data
  const fetchUserData = async (userId: any) => {
    const { data: userData } = await apiCall(
      Methods.GET,
      `${EndPoint.SINGLE_USER}/${userId}`
    );
    // console.log(userData);

    setDocAppoitment((prev) => ({
      ...prev,
      ...userData,
      user: userId,
    }));
  };

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    setDocAppoitment((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSavebutton(false);
    setValidForm(false);
  };

  const handleBookSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const userauth = await isAuthenticate();
      const userId = await getUserID();
      if (!userId && !userauth) {
        setSignInPage(!signInPage);
        return;
      }
      if (ValidForm) {
        setBtnLoading(true);
        const uid = await getUserID();
        const value: Appointment = {
          date: selectDate,
          // date: selectDate,
          time: selectedTime,
          fullName: `${docAppoitment.firstName} ${docAppoitment.lastName}`,
          gender: docAppoitment.gender || "male",
          age: docAppoitment.age,
          phone: docAppoitment.phone,
          email: docAppoitment.email,
          doctor: _doc_id_,
          weight: docAppoitment.weight,
        };
        if (uid) {
          value.user = uid;
        }
        // return
        if (payment === "bkash") {
          const response = await apiCall(
            Methods.POST,
            EndPoint.DOCTOR_BOOK_APPOINTMENT,
            value,
            JsonHeader
          );
          // console.log(response);

          // return
          if (response && response.success) {
            const bkpaymentvalue = {
              callBackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/receipt`,
              amount: response.data.paymentFee.toString(),
              invoiceNumber: response.data.invoiceNumber,
            };
            // console.log(bkpaymentvalue);
            const bkresponse = await apiCall(
              Methods.POST,
              `${EndPoint.BKASHPAYMENTCREATE}`,
              bkpaymentvalue,
              JsonHeader
            );
            // console.log(bkresponse);

            // return;
            if (bkresponse && bkresponse.success) {
              // dispatch(clearCart());
              router.push(bkresponse.data.bkashURL);
            }
            return true;
            // console.log(response);
          }
        } else if (payment === "card") {
          const response = await apiCall(
            Methods.POST,
            EndPoint.DOCTOR_BOOK_APPOINTMENT,
            value,
            JsonHeader
          );
          // console.log(response);
          // return;
          if (response.success) {
            await DoctorPay(response.data);
          } else {
            toast.error(response.message);
          }
        }
        // console.log(value);
      } else {
        toast.error("Please Saved the Form");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const firstName = docAppoitment.firstName || "";
    const lastName = docAppoitment.lastName || "";
    const email = docAppoitment.email || "";
    const phone = docAppoitment.phone || "";
    const age = docAppoitment.age || "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!firstName?.trim()) {
      toast.error("First name is required");
      return false;
    } else if (!lastName?.trim()) {
      toast.error("Last Name is Require");
    }
    // else if()
    else if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    } else if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number");
      return false;
    } else if (!age) {
      toast.error("Please enter a valid Age ");
      return false;
    } else {
      toast.success("Form Update Successful");
      setSavebutton(true);
    }
    setValidForm(true);
    return true;
  };

  const handleOnlineSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment(e.target.value);
  };

  const showModal: any = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userauth = await isAuthenticate();
    const userId = await getUserID();
    if (userauth && userId) {
      setSignInPage(false);
    } else {
      setSignInPage(true);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return loading ? (
    <PageLoading />
  ) : (
    <div className="xl:container xl:mx-auto  mt-2 lg:mt-4 xl:mt-6 2xl:mt-10 ">
      <section className="grid lg:grid-cols-2 2xl:gap-20 lg:gap-10 2xl:px-10 lg:px-5">
        <aside>
          <div className="shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] bg-white flex px-6 py-5 rounded-2xl">
            {SingleDoctor && <DoctorListProfile data={SingleDoctor} />}
          </div>
          <div className="bg-white rounded-lg w-full mt-4 shadow-[0px_10px_40px_0px_rgba(0,0,0,0.08)] p-10">
            <div className="grid grid-cols-2 gap-5 mb-4">
              {/* first name  */}
              <div>
                <label className="block mb-2 text-gray-700">
                  {" "}
                  {t("firstName")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  // placeholder="Enter your Name"
                  placeholder={t("enterFirstName")}
                  className="w-full p-2 border rounded outline-pink-500 "
                  name="firstName"
                  onChange={handleChange}
                  value={docAppoitment.firstName}
                  required
                />
              </div>
              {/* last Name  */}
              <div>
                <label className="block mb-2 text-gray-700">
                  {" "}
                  {t("lastName")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  // placeholder="Enter your Name"
                  placeholder={t("enterLastName")}
                  className="w-full p-2 border rounded outline-pink-500 "
                  name="lastName"
                  onChange={handleChange}
                  value={docAppoitment.lastName}
                  required
                />
              </div>
              {/* gender  */}
              <div>
                <label className="block mb-2 text-gray-700">
                  {t("gender")}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={docAppoitment.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded outline-pink-500"
                >
                  <option value="male">{t("male")}</option>
                  <option value="female">{t("female")}</option>
                  <option value="others">{t("others")}</option>
                </select>
              </div>
              {/* years  */}
              <div className="">
                <label className="block mb-2 text-gray-700">
                  {t("age")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder={t("agePlaceholder")}
                  className="w-full p-2 border border-gray-300 rounded no-spin outline-pink-500"
                  value={docAppoitment.age || ""}
                  onChange={handleChange}
                  name="age"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 mb-4">
              {/* Phone  */}
              <div className="">
                <label className="block mb-2 text-gray-700">
                  {t("phoneNumber")}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder={t("phonePlaceholder")}
                    className="w-full p-2 border border-gray-300 rounded-r outline-pink-500"
                    value={docAppoitment.phone}
                    onChange={handleChange}
                    name="phone"
                    required
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-4">
              {/* weight  */}
              <div className="">
                <label className="block mb-2 text-gray-700">
                  {t("weight")}
                </label>
                <div className="flex">
                  <input
                    type="number"
                    placeholder={t("weightPlaceholder")}
                    className="w-full p-2 border border-gray-300 rounded-r outline-pink-500 no-spin"
                    value={docAppoitment.weight || ""}
                    onChange={handleChange}
                    name="weight"
                    required
                  />
                </div>
              </div>
              {/* Email  */}
              <div className="">
                <label className="block mb-2 text-gray-700">
                  {t("email")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  // placeholder="Enter Your Email"
                  placeholder={t("emailPlaceholder")}
                  className="w-full p-2 border border-gray-300 rounded outline-pink-500"
                  value={docAppoitment.email}
                  onChange={handleChange}
                  name="email"
                  required
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-2  cursor-pointer"
                id="emailprescription"
              />
              <label
                className="text-gray-700  cursor-pointer"
                htmlFor="emailprescription"
              >
                {t("prescriptionCheckbox")}
              </label>
            </div>
            <button
              onClick={handleFormSubmit}
              disabled={savebutton}
              className={`w-full bg-[#EB148C] text-white p-2 rounded ${
                savebutton && "bg-opacity-60"
              }`}
            >
              {t("saveNext")}
            </button>
          </div>
        </aside>
        <aside className=" w-full  ">
          <div className="shadow-[0px_10px_40px_0px_rgba(0,0,0,0.08)] 2xl:px-16 xl:px-8 lg:px-5 2xl:py-6 xl:py-3 p-3">
            <div className="flex items-center justify-between pt-4 mb-2 lg:pt-4 xl:pt-6 ">
              <p className="text-base font-semibold text-[#3A3A3C]">
                {formattedDate
                  ? i18n.language === "bn"
                    ? `${t("scheduledOn")}: ${formattedDate}`
                    : `${t("scheduledOn")}: ${formattedDate}`
                  : t("dateNotAvailable")}
              </p>
            </div>

            <p className="text-base font-semibold text-[#3A3A3C]">
              {`${t("expectedTime")} : ${t(`${expectedTimeMessage}`)}`}
            </p>
            <div className="flex justify-between mt-5 border-t-2 border-gray-400 pt-3">
              <p className=" text-lg font-semibold text-[#1D2322]">
                {t("consultationFee")}
              </p>
              <p className="text-base font-semibold text-[#1D2322]">
                {t("moneyCount", {
                  count: SingleDoctor?.visitFee ?? 0,
                })}
              </p>
            </div>
            {/* select payment method  */}
            <div className="mt-2">
              <p className="text-base font-semibold text-[#3A3A3C]">
                {t("selectPaymentMethod")}
              </p>

              <label  htmlFor="bkash" className="border rounded-lg p-2 mb-3 mt-2 flex items-center justify-between">
                <div className="flex items-center w-full">
                  <input
                    type="radio"
                    name="payment"
                    className=" cursor-pointer accent-pink-500"
                    id="bkash"
                    value={"bkash"}
                    checked={payment == "bkash"}
                    onChange={handleOnlineSelect}
                  />
                  <span
                    className="ml-2 text-base font-medium text-[#16020B] cursor-pointer w-full"
                  >
                    {t("payment.bkash")}
                  </span>
                </div>
                <Image
                  src="/services/Bkash.svg"
                  alt="bKash logo"
                  className="h-8 w-14"
                  width={56}
                  height={32}
                />
              </label>

              <label
                htmlFor="card"
                className="border rounded-lg p-2  flex items-center justify-between"
              >
                <div className="flex items-center w-[80%]">
                  <input
                    type="radio"
                    name="payment"
                    className="cursor-pointer accent-pink-500"
                    id="card"
                    value={"card"}
                    checked={payment == "card"}
                    onChange={handleOnlineSelect}
                  />
                  <span className="ml-2 text-base font-medium text-[#16020B] cursor-pointer w-full">
                    {t("payment.card")}
                  </span>
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
            <button
              onClick={handleBookSubmit}
              disabled={!ValidForm}
              className={`bg-[#EB148C] py-2.5 rounded-md text-white w-full mt-2 lg:mt-3 xl:mt-4 2xl:mt-5 ${
                !ValidForm && "bg-opacity-50"
              } `}
            >
              {btnLoading
                ? t("payment.loading")
                : t("payment.continueToPayment")}
            </button>
          </div>
        </aside>
      </section>
      <Modal
        backdrop={backdrop}
        size="sm"
        open={signInPage}
        onClose={showModal}
        keyboard={false}
      >
        {/* <Modal.Header>
          <Modal.Title></Modal.Title>{" "}
        </Modal.Header> */}
        <Modal.Body>
          <SignIn />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DoctorPayment;
