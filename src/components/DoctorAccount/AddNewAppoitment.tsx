"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getDoctorId } from "@/lib/authHandler";
import { Appointment, DoctorProfile } from "../Doctor/Interface";
import moment from "moment";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, JsonHeader, Methods } from "@/api/config";
import { Modal } from "rsuite";
import { toast } from "react-toastify";
import { differenceInYears, format, parseISO } from "date-fns";
import { timeselectrange } from "./interface";
import { validatePhoneNumber } from "../Auth/AuthLib";
import { FaPlus } from "react-icons/fa6";
const AddNewAppoitment = ({
  onAppointmentAdded,
}: {
  onAppointmentAdded: any;
}) => {
  const [doctorinfo, setDoctorinfo] = useState<DoctorProfile>();
  const [docAppoitment, setDocAppoitment] = useState<Appointment>({
    user: "",
    doctor: "",
    fullName: "",
    email: "",
    gender: "male",
    phone: "",
    age: "",
    weight: "",
  });
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  // modal State
  const [phoneModel, setPhoneModel] = useState(false);
  const [model, setModel] = useState(false);
  // button Modal
  const [savebutton, setSavebutton] = useState(false);
  const [phoneNumberButton, setPhoneNumberButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookPackageId, setBookPackageId] = useState<string>("");
  const [packageType, setPackageType] = useState<number>();

  const init = async () => {
    try {
      setLoading(true);
      const doc_Id = await getDoctorId();
      const { data } = await apiCall(
        Methods.GET,
        `${EndPoint.DOCTOR_FIND_BY_ID}/${doc_Id}`
      );
      setDoctorinfo(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //For Mobile number
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setPhoneNumber(value);
  };
  // Mobile Phone modal OPEN
  const handlePhoneModel: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPhoneModel(!phoneModel);
  };
  //Api Call on PACKAGECHECKBYPHONE NUMBER
  const handleMobileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setPhoneNumberButton(true);
      // const cleanPhoneNumber = phoneNumber.startsWith("88")
      //   ? phoneNumber.slice(2)
      //   : phoneNumber.startsWith("0")
      //   ? phoneNumber.slice(1)
      //   : phoneNumber;

      // if (!validatePhoneNumber(phoneNumber)) {
      //   toast.error("Insert a valid mobile number", {
      //     position: "top-right",
      //     hideProgressBar: true,
      //     autoClose: 3000,
      //   });
      //   return;
      // }
      const phone = {
        phone: phoneNumber,
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.PACKAGECHECKBYNUMBER,
        phone,
        JsonHeader
      );
      // console.log(response.data);

      if (response.success) {
        toast.success("Package holder Prescription");
        const dobString = response?.data?.dob;
        const age = dobString
          ? differenceInYears(new Date(), parseISO(dobString)).toString()
          : undefined;
        // console.log(typeof age);

        setDocAppoitment({
          fullName: `${response?.data?.userId?.firstName} ${response?.data?.userId?.lastName} `,
          phone: response?.data?.userId?.phone,
          user: response?.data?.userId?.id,
          email: response?.data?.userId?.email ?? "",
          age: age!,
          gender: "male",
        });
        setBookPackageId(response?.data?._id);
        // console.log(response?.data);

        // setPackageType(response?.data?.price);
        setModel(!model);
      } else {
        if (response.data.hasFreeCall) {
          toast.warn("Free Prescription");
          const dobString = response?.data?.dob;
          const age = dobString
            ? differenceInYears(new Date(), parseISO(dobString)).toString()
            : undefined;
          // console.log(typeof age);

          setDocAppoitment({
            fullName: `${response?.data?.firstName} ${response?.data?.lastName} `,
            phone: response?.data?.phone,
            user: response?.data?.id,
            email: response?.data?.email ?? "",
            age: age!,
            gender: "male",
          });
          setBookPackageId(response?.data?._id);
          // console.log(response?.data);

          setPackageType(response?.data?.price);
          setModel(!model);
        } else {
          toast.error(response.message);
          return;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhoneNumberButton(false);
    }
  };

  //Form Check
  // Modal OPEN
  const handleModal: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModel(!model);
  };

  //Appoitment Check
  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    setDocAppoitment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //HandleFormSUBMIT
  const handleFormSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setSavebutton(true);
      const timerange = timeselectrange();
      const value = {
        date: format(new Date(), "yyyy-MM-dd"),
        time: timerange,
        fullName: docAppoitment.fullName,
        gender: docAppoitment.gender,
        age: docAppoitment.age,
        weight: `${docAppoitment.weight}`,
        phone: docAppoitment.phone,
        email: docAppoitment.email,
        doctor: doctorinfo?._id,
        user: docAppoitment.user,
        bookPackageId: bookPackageId,
        isForFreeCall: true,
      };
      const response = await apiCall(
        Methods.POST,
        EndPoint.DOCTOR_BOOK_APPOINTMENT,
        value,
        JsonHeader
      );
      if (response.success) {
        setModel(!model);
        setPhoneModel(!phoneModel);
        if (packageType === 19) {
          // await apiCall()
          // console.log(packageType);
          // console.log(bookPackageId);
          const value = {
            isActive: false,
          };
          // return
          const responseonpackage = await apiCall(
            Methods.PATCH,
            `${EndPoint.PACKAGEBOOKUPDATEID}/${bookPackageId}`,
            value,
            JsonHeader
          );

          if (responseonpackage.success) {
            onAppointmentAdded();
          }
        }
        // console.log(packageType);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSavebutton(false);
      onAppointmentAdded();
    }
  };

  useEffect(() => {
    init();
  }, []);

  return loading ? (
    <div className="">loading...</div>
  ) : (
    <div>
      {doctorinfo?.role === "inhouse_doctor" && (
        <button
          onClick={handlePhoneModel}
          className="flex items-center space-x-2 px-4 py-1.5 rounded-md border-[#E2136E] bg-[#E2136E] text-white font-medium text-sm "
        >
          <FaPlus size={17} />
          <span>Add New</span>
        </button>
      )}
      {/* For Mobile Number  */}

      <Modal open={phoneModel} onClose={handlePhoneModel} size={"sm"}>
        <Modal.Header>
          <div className="flex items-center justify-center">
            <Image
              src={"/other/logo.svg"}
              alt="Clicnicall Logo"
              width={150}
              height={70}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium">
                {doctorinfo?.firstName} {doctorinfo?.lastName} (
                {doctorinfo?.degree})
              </p>
              <p>BMDC Number : {doctorinfo?.bmdc}</p>
            </div>
            <p className="font-medium">
              Date : {moment().format("DD/MM/YYYY")}
            </p>
          </div>
          <hr className="mt-1 border-gray-600" />

          <div className="grid w-full grid-cols-1 mt-4">
            {/* Full Name  */}
            <form id="mobileForm" onSubmit={handleMobileSubmit}>
              <div className="p-5 mb-4 border rounded-lg ">
                <label className="block mb-2 text-gray-700">
                  {" "}
                  Mobile Number
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  // placeholder="Enter your Name"
                  placeholder="Enter Mobile Number"
                  className="w-full p-2 border rounded outline-pink-500 no-spin"
                  name="lastName"
                  onChange={handlePhoneNumberChange}
                  value={phoneNumber}
                  required
                />{" "}
              </div>
              <div className="flex items-center justify-end space-x-2">
                <button
                  className={` border text-[#EB148C] p-2 rounded w-[16%] font-medium mr-4 `}
                  onClick={handlePhoneModel}
                >
                  Close{" "}
                </button>
                <button
                  type="submit"
                  disabled={phoneNumberButton}
                  className={` bg-[#EB148C] text-white p-2 rounded w-[16%] ${
                    phoneNumberButton && "bg-opacity-60"
                  }`}
                >
                  {phoneNumberButton ? "Loading..." : "Check"}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>

        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>

      {/* For Write Prescription  */}
      <Modal open={model} onClose={handleModal} size={"lg"}>
        <Modal.Header>
          <div className="flex items-center justify-center">
            <Image
              src={"/other/logo.svg"}
              alt="Clicnicall Logo"
              width={150}
              height={70}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium">
                {doctorinfo?.firstName} {doctorinfo?.lastName} (
                {doctorinfo?.degree})
              </p>
              <p>BMDC Number : {doctorinfo?.bmdc}</p>
            </div>
            <p className="font-medium">
              Date : {moment().format("DD/MM/YYYY")}
            </p>
          </div>
          <hr className="mt-1 border-gray-600" />
          <form action="" onSubmit={handleFormSubmit}>
            <div className="w-full p-5 mt-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-5 mb-4">
                {/* Full Name  */}
                <div>
                  <label className="block mb-2 text-gray-700">
                    {" "}
                    Full Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    // placeholder="Enter your Name"
                    placeholder="Enter Full Name"
                    className="w-full p-2 border rounded outline-pink-500 "
                    name="fullName"
                    onChange={handleChange}
                    value={docAppoitment.fullName}
                    required
                  />
                </div>
                {/* gender  */}
                <div>
                  <label className="block mb-2 text-gray-700">
                    Gender
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={docAppoitment.gender}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded outline-pink-500"
                  >
                    {/* <option value="" disabled>
                      Select a gender
                    </option> */}
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                    <option value={"others"}>Others</option>
                  </select>
                </div>
                {/* years  */}
                {/* <div className="grid grid-cols-2 gap-5"></div> */}
                <div className="">
                  <label className="block mb-2 text-gray-700">
                    Age
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Age: (e.g. 25) Years/Month/Day"
                    className="w-full p-2 border border-gray-300 rounded no-spin outline-pink-500"
                    value={docAppoitment.age || ""}
                    onChange={handleChange}
                    name="age"
                    required
                  />
                </div>
                <div className="">
                  <label className="block mb-2 text-gray-700">
                    Weight <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      placeholder="weight: (e.g. 75) kg"
                      className="w-full p-2 border border-gray-300 rounded-r outline-pink-500 no-spin"
                      value={docAppoitment.weight || ""}
                      onChange={handleChange}
                      name="weight"
                      // required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mb-4">
                {/* Phone  */}
                <div className="">
                  <label className="block mb-2 text-gray-700">
                    Phone Number
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Phone Number (e.g. 012 34 56 78 90)"
                      className="w-full p-2 border border-gray-300 rounded-r outline-pink-500"
                      value={docAppoitment.phone}
                      onChange={handleChange}
                      name="phone"
                      required
                      disabled
                    />
                  </div>
                </div>
                {/* Email  */}
                <div className="">
                  <label className="block mb-2 text-gray-700">
                    Email
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <input
                    type="email"
                    // placeholder="Enter Your Email"
                    placeholder={"example@gmail.com"}
                    className="w-full p-2 border border-gray-300 rounded outline-pink-500"
                    value={docAppoitment.email}
                    onChange={handleChange}
                    name="email"
                    // required
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end mt-3 space-x-5">
              <button
                className={` border text-[#EB148C] p-2 rounded w-[16%] font-medium mr-4 `}
                onClick={handleModal}
              >
                Close{" "}
              </button>
              <button
                // onClick={handleFormSubmit}
                type="submit"
                disabled={savebutton}
                className={` bg-[#EB148C] text-white p-2 rounded w-[16%] ${
                  savebutton && "bg-opacity-60"
                }`}
              >
                {savebutton ? "Loading..." : "Create"}
              </button>
            </div>
          </form>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default AddNewAppoitment;
