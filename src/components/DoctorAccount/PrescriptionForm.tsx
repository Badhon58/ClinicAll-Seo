"use client";
import React, { useState } from "react";
import { Appointment, RxInterface } from "./interface";
import { toast } from "react-toastify";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, JsonHeader, Methods } from "@/api/config";
import { Modal } from "rsuite";
import Image from "next/image";
import moment from "moment";
import "./Style.css";

interface patientInfo {
  fullName?: string;
  age?: string;
  gender?: string;
  weight?: string;
}

export default function PrescriptionForm({
  data,
  setShowModel,
}: {
  data: Appointment;
  setShowModel: any;
}) {
  const [loading, setLoading] = useState(false);
  const [chiefComplaints, setchiefComplaints] = useState<string[]>([]);
  const [recommendedTest, setRecommendedTest] = useState<string[]>([]);
  const [advice, setAdvice] = useState<string[]>([]);
  const [history, setHistory] = useState<string>("");
  const [probableDiagnosis, setProbableDiagnosis] = useState("");
  const [followUpWithin, setFollowupwithIn] = useState<string>("");
  const [referral, setReferral] = useState<string>("");
  const [rx, setRx] = useState<RxInterface[]>([
    {
      doseForm: "",
      rx: "",
      doseTime: "",
      doseWithMeal: "",
      containueUntil: "",
      note: "",
    },
  ]);
  const [selectedOption, setSelectedOption] = useState<string>("sms");
  const [prescriptionModel, setPrescriptionModel] = useState(false);
  const [userInfo, setuserInfo] = useState<patientInfo>({
    fullName: data.fullName,
    age: data.age,
    gender: data.gender || "male",
    weight: data.weight,
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const { name, value } = e.target;
    // setuserInfo?((prev) => [...prev, [name]:value]);
    setuserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddComplaint = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: string
  ) => {
    const target = e.target as HTMLInputElement;
    if (type == "complement") {
      if (e.key === "Enter" && target.value.trim()) {
        const newComplaint = target.value.trim();
        setchiefComplaints((prev) => [...prev, newComplaint]);
        target.value = "";
        e.preventDefault();
      }
    } else if (type === "labtest") {
      if (e.key === "Enter" && target.value.trim()) {
        const labtest = target.value.trim();
        setRecommendedTest((prev) => [...prev, labtest]);
        target.value = "";
        e.preventDefault();
      }
    } else if (type === "advices") {
      if (e.key === "Enter" && target.value.trim()) {
        const labtest = target.value.trim();
        setAdvice((prev) => [...prev, labtest]);
        target.value = "";
        e.preventDefault();
      }
    }
  };

  // Remove from state
  const handleRemoveComplaint = (
    e: React.MouseEvent<HTMLButtonElement>,
    complaint: string
  ) => {
    e.preventDefault();
    setchiefComplaints((prev) => prev.filter((item) => item !== complaint));
  };

  const handleRemoveLab = (
    e: React.MouseEvent<HTMLButtonElement>,
    complaint: string
  ) => {
    e.preventDefault();
    setRecommendedTest((prev) => prev.filter((item) => item !== complaint));
  };

  const handleRemoveAdvice = (
    e: React.MouseEvent<HTMLButtonElement>,
    complaint: string
  ) => {
    e.preventDefault();
    setAdvice((prev) => prev.filter((item) => item !== complaint));
  };

  const handleHistory = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setHistory(e.target.value);
  };

  const handleProbableDiagnosis = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setProbableDiagnosis(e.target.value);
  };

  const AddNewRx = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRx([
      ...rx,
      {
        doseForm: "",
        rx: "",
        doseTime: "",
        doseWithMeal: "",
        containueUntil: "",
        note: "",
      },
    ]);
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const deleteVal = [...rx];
    deleteVal.splice(index, 1);
    setRx(deleteVal);
  };

  const handleRxChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    const onChangeValue = [...rx];
    onChangeValue[index][name as keyof RxInterface] = value;
    setRx(onChangeValue);
  };

  //Prescription Submit
  const prescriptionsubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formatprescription = {
        chiefComplaints: [...chiefComplaints],
        recommendedTest: [...recommendedTest],
        advice: [...advice],
        rx: rx,
        history: history,
        probableDiagnosis: probableDiagnosis,
        // followupwithIn: followUpWithin,
        followUpWithin,
        referral: referral,
        fullName: userInfo?.fullName,
        age: userInfo?.age,
        weight: userInfo?.weight,
        gender: userInfo?.gender,
      };

      const generatePrescription = {
        status: "done",
        prescription_data: formatprescription,
        prescription: "",
        deliveryMedium: selectedOption,
      };
      // console.log(generatePrescription);`

      // return;
      const response = await apiCall(
        Methods.PATCH,
        `${EndPoint.DOCTOR_SCHEDULE_UPDATE}/${data._id}`,
        generatePrescription,
        JsonHeader
      );
      // console.log(response);

      if (response?.success) {
        setRx([]);
        setAdvice([]);
        setRecommendedTest([]);
        setchiefComplaints([]);
        setHistory("");
        setFollowupwithIn("");
        setReferral("");
        setProbableDiagnosis("");
        toast.success(response?.message);
        setShowModel(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.warning(response?.message);
      }
      // console.log(generatePrescription);
    } catch (error) {
      console.error("Error submitting prescription:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //Reset Prescription
  const resetPrescription = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRx([]);
    setAdvice([]);
    setRecommendedTest([]);
    setchiefComplaints([]);
    setHistory("");
    setFollowupwithIn("");
    setReferral("");
  };
  
  const handleOpenModel: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPrescriptionModel(!prescriptionModel);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      {/* Prescription Write  */}
      <div className="border-gray-500 border-y-2 py-2">
        <p className="text-base font-semibold">Patients Info : </p>
        <div className="grid grid-cols-4 gap-4 py-1">
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded outline-none "
              placeholder="Enter Full Name"
              value={userInfo?.fullName}
              name="fullName"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="Age">
              Age <span className="text-xs">(Years)</span>{" "}
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded outline-none no-spin"
              placeholder="Age: (e.g. 25) Years"
              value={userInfo?.age}
              name="age"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              value={userInfo?.gender}
              onChange={handleChange}
              className="w-full px-2 py-2.5 border  rounded outline-none "
            >
              <option disabled>Select a Gender</option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"others"}>Others</option>
            </select>
          </div>
          <div>
            <label htmlFor="weight">
              Weight <span className="text-xs">(Kg)</span>
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded outline-none no-spin"
              placeholder="weight: (e.g. 75) kg"
              value={userInfo?.weight}
              name="weight"
              onChange={handleChange}
            />
          </div>
        </div>{" "}
      </div>
      {/* Prescription Header  */}
      <div className="flex flex-col md:flex-row min-h-[52vh] ">
        <aside className="flex-[1.8] border-r-2 border-gray-600 ">
          <div className="mt-1 min-h-20">
            <p className="text-base font-medium ">1. Chief Complaints</p>
            <div className="p-1 border mt-0.5 rounded border-gray-400 mr-3 flex flex-wrap gap-3 items-center">
              {chiefComplaints.map((item, index) => (
                <p className="flex justify-between bg-gray-200" key={index}>
                  <span className=" rounded px-1 py-0.5">{item} </span>
                  <button
                    className="px-2 text-xl text-white bg-red-500 "
                    onClick={(e) => handleRemoveComplaint(e, item)}
                  >
                    x
                  </button>
                </p>
              ))}
              <input
                type="text"
                className="ml-2 outline-none"
                placeholder="Add Complaints"
                onKeyDown={(e) => handleAddComplaint(e, "complement")}
              />
            </div>
          </div>

          <div className="mt-1 min-h-20">
            <p className="text-base font-medium ">2. History</p>
            <textarea
              className="outline-none  w-[97%] p-1 border rounded border-gray-400 appearance-none"
              placeholder="Patient Past History"
              onChange={handleHistory}
              value={history}
              rows={3}
            />
          </div>
          <div className="mt-1 min-h-20">
            <p className="text-base font-medium ">3. Probable Diagnosis</p>
            <textarea
              className="outline-none  w-[97%] p-1 border rounded border-gray-400 appearance-none"
              placeholder="Probable Diagnosis"
              onChange={handleProbableDiagnosis}
              value={probableDiagnosis}
              rows={3}
            />
          </div>
          <div className="mt-1 min-h-20">
            <p className="text-base font-medium ">4. Recommended Tests</p>
            <div className="p-1 border mt-0.5 rounded border-gray-400 mr-3 flex flex-wrap gap-3 items-center">
              {recommendedTest.map((item, index) => (
                <p className="flex justify-between bg-gray-200" key={index}>
                  <span className=" rounded px-1 py-0.5">{item} </span>
                  <button
                    className="px-2 text-xl text-white bg-red-500 "
                    onClick={(e) => handleRemoveLab(e, item)}
                  >
                    x
                  </button>
                </p>
              ))}
              <input
                type="text"
                className="ml-2 outline-none"
                placeholder="Add Recommended Tests"
                onKeyDown={(e) => handleAddComplaint(e, "labtest")}
              />
            </div>
          </div>
          <div className="mt-1 min-h-20">
            <p className="text-base font-medium ">5. Advise</p>
            <div className="flex flex-wrap items-center gap-3 p-1 mr-3 border border-gray-400 rounded">
              {advice.map((item, index) => (
                <p className="flex justify-between bg-gray-200" key={index}>
                  <span className=" rounded px-1 py-0.5">{item} </span>
                  <button
                    className="px-2 text-xl text-white bg-red-500 "
                    onClick={(e) => handleRemoveAdvice(e, item)}
                  >
                    x
                  </button>
                </p>
              ))}
              <input
                type="text"
                className="ml-2 outline-none"
                placeholder="Add Advices"
                onKeyDown={(e) => handleAddComplaint(e, "advices")}
              />
            </div>
          </div>
        </aside>
        <aside className="flex-[3.2] flex-col  justify-between p-3">
          <p className="text-base font-medium ">Rx:</p>
          {rx.map((item, index) => (
            <div
              className={`flex gap-2 py-3 ${
                index > 0 && " border-t-2 border-gray-600"
              }`}
              key={index}
            >
              <div className="flex flex-col w-full space-y-2 ">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      list="doseformation"
                      className="w-full p-1 pl-2 border rounded outline-none no-arrow"
                      id="doseForm"
                      onChange={(e) => handleRxChange(e, index)}
                      placeholder="Enter Dose Form"
                      value={item.doseForm}
                      name="doseForm"
                      required
                    />
                    <datalist id="doseformation">
                      <option>Tab</option>
                      <option>Cap</option>
                      <option>Syp</option>
                      <option>Supp</option>
                      <option>Inj</option>
                      <option>Inf</option>
                      <option>Cream</option>
                      <option>Ointment</option>
                      <option>Gel</option>
                      <option>Spray</option>
                      <option>Drop</option>
                      <option>Powder</option>
                      <option>Shampoo</option>
                      <option>Soap</option>
                      <option>Lotion</option>
                      <option>ORS</option>
                    </datalist>
                  </div>

                  {/* -------------- */}
                  <input
                    type="text"
                    placeholder={`Rx ${index + 1}`}
                    className="w-full p-1 pl-2 border rounded outline-none"
                    value={item.rx}
                    name="rx"
                    onChange={(e) => handleRxChange(e, index)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <div>
                    <input
                      type="text"
                      list="dose"
                      className="w-full p-1 pl-2 border rounded outline-none no-arrow"
                      name="doseTime"
                      id="doseTime"
                      value={item.doseTime}
                      onChange={(e) => handleRxChange(e, index)}
                      placeholder="Enter Time Schedule"
                    />
                    <datalist id="dose">
                      <option>১+১+১</option>
                      <option>১+০+১</option>
                      <option>১+০+০ </option>
                      <option>০+০+১ </option>
                      <option>০+১+০ </option>
                      <option>১+১+১+১ </option>
                    </datalist>
                  </div>
                  <select
                    name="doseWithMeal"
                    id="doseWithMeal"
                    className="w-full p-1 pl-2 border rounded outline-none"
                    value={item.doseWithMeal}
                    onChange={(e) => handleRxChange(e, index)}
                  >
                    <option disabled value={""}>
                      খাবার সম্পর্কিত নির্দেশনা
                    </option>
                    <option value="খাবারের পরে">
                      খাবারের পরে (After Meal)
                    </option>
                    <option value="খাবারের আগে">
                      খাবারের আগে (Before Meal)
                    </option>
                  </select>

                  <input
                    type="text"
                    placeholder={`Continue Until`}
                    className="w-full p-1 pl-2 border rounded outline-none no-spin"
                    value={item.containueUntil}
                    name="containueUntil"
                    onChange={(e) => handleRxChange(e, index)}
                    required
                  />
                </div>
                <textarea
                  placeholder="Other"
                  rows={3}
                  className="w-full p-2 border outline-none"
                  name="note"
                  value={item.note}
                  onChange={(e) => handleRxChange(e, index)}
                />
              </div>
              <div>
                <button
                  onClick={(e) => handleDelete(e, index)}
                  className="bg-[#EB148C] px-3 py-1 rounded font-semibold text-white"
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-[#EB148C] px-2 py-1 rounded-sm text-white font-medium my-2"
            onClick={AddNewRx}
          >
            + Add Rx
          </button>

          <div className="flex flex-col my-3">
            <label htmlFor="" className="text-lg font-medium">
              {" "}
              পরবর্তী সাক্ষাত
            </label>
            <input
              type="text"
              className="border outline-none lg:w-5/12 px-2 p-0.5 rounded-md no-spin"
              placeholder="Follow Up After"
              name="followupwithIn"
              value={followUpWithin}
              onChange={(e) => {
                e.preventDefault();
                setFollowupwithIn(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="" className="text-lg font-medium">
              {" "}
              Referral
            </label>
            <input
              type="text"
              className="border outline-none lg:w-5/12 px-2 p-0.5 rounded-md"
              placeholder="Referral"
              name="referral"
              value={referral}
              onChange={(e) => {
                e.preventDefault();
                setReferral(e.target.value);
              }}
            />
          </div>
        </aside>
      </div>
      {/* Prescription Button  */}
      <div className="flex justify-end gap-3">
        <button
          onClick={resetPrescription}
          className="bg-[#EB148C] text-white rounded px-3 py-2"
        >
          Reset
        </button>
        <button
          onClick={handleOpenModel}
          className="bg-[#EB148C] text-white rounded px-3 py-2"
        >
          Continue
        </button>
      </div>
      {/* Prescription Model Open */}
      <Modal open={prescriptionModel} onClose={handleOpenModel} size={"full"}>
        <Modal.Header>
          <div className="flex justify-center items-center">
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
                {data.doctor?.firstName} {data?.doctor?.lastName} (
                {data?.doctor?.degree})
              </p>
              <p>BMDC Number : {data?.doctor?.bmdc}</p>
            </div>
            <p className="font-medium">
              Date : {moment().format("DD/MM/YYYY")}
            </p>
          </div>
          <div className="flex justify-between py-2 mt-2 border-gray-500 border-y-2">
            <p>
              <span className="text-base font-medium">Patient Name : </span>
              {userInfo?.fullName}
            </p>
            <p>
              <span className="text-base font-medium">Age : </span>
              {userInfo?.age ? userInfo?.age : "N/A"}
            </p>
            <p>
              <span className="text-base font-medium">Gender : </span>
              <span className="capitalize">{userInfo?.gender}</span>
            </p>
            <p>
              <span className="text-base font-medium">Weight : </span>
              <span className="capitalize">{userInfo?.weight}</span>
            </p>
          </div>
          <div className="flex flex-col lg:flex-row min-h-[50vh]">
            <aside className="flex flex-col lg:flex-[2] border-r border-black p-2">
              <p className="text-base font-[550]">1. Chief Complaints</p>
              <div className="pl-4">
                {chiefComplaints && chiefComplaints.length > 0 ? (
                  chiefComplaints.map((item, index) => (
                    <p className="text-base font-[450]" key={index}>
                      {index + 1}. &nbsp; {item}
                    </p>
                  ))
                ) : (
                  <p className="text-base font-[450]">N/A</p>
                )}
              </div>
              <p className="text-base font-[550] mt-2">
                2. Patient Past History
              </p>
              <p className="pl-4"> {history ? `${history}` : " N/A"}</p>
              <p className="text-base font-[550] mt-2">3. Probable Diagnosis</p>
              <p className="pl-4">
                {" "}
                {probableDiagnosis ? `${probableDiagnosis}` : " N/A"}
              </p>
              <p className="text-base font-[550] mt-2">4. Recommended Tests</p>
              <div className="pl-4">
                {recommendedTest && recommendedTest.length > 0 ? (
                  recommendedTest.map((item, index) => (
                    <p className="text-base font-[450]" key={index}>
                      {index + 1}. &nbsp; {item}
                    </p>
                  ))
                ) : (
                  <p className="text-base font-[450]">N/A</p>
                )}
              </div>
              <p className="text-base font-[550] mt-2"> 5. Advise</p>
              <div className="pl-4">
                {advice && advice.length > 0 ? (
                  advice.map((item, index) => (
                    <p className="text-base font-[450]" key={index}>
                      {index + 1}. &nbsp; {item}
                    </p>
                  ))
                ) : (
                  <p className="text-base font-[450]">N/A</p>
                )}
              </div>
            </aside>
            <aside className="flex flex-col lg:flex-[4] p-3 border-l border-black">
              <p className="text-lg font-medium">Rx :</p>
              {rx.length > 0 &&
                rx.map((item, index) => (
                  <div
                    className="flex flex-col w-full pl-5 mt-1 space-y-2"
                    key={index}
                  >
                    <p className="text-lg font-medium">
                      {item.doseForm} : {item.rx}
                    </p>
                    <div className="flex justify-between font-[450] ">
                      <p className="text-lg">{item.doseTime}</p>
                      <p className="capitalize">{item.doseWithMeal}</p>
                      <p> চলবে : {item.containueUntil}</p>
                    </div>
                    <p>Other : {item.note}</p>
                    <hr className="border-b border-gray-500 " />
                  </div>
                ))}
              {followUpWithin && (
                <p className="px-2 pt-3 mt-2 text-lg">
                  <span className="font-medium ">পরবর্তী সাক্ষাত : </span>
                  {followUpWithin}
                </p>
              )}

              {referral.length > 0 && (
                <p className="px-2 text-lg ">
                  <span className="font-medium "> Referral : </span>
                  {referral}
                </p>
              )}
            </aside>
          </div>
          <div className="py-2 text-justify border-black border-y">
            <strong> Disclaimer :</strong> This prescription is based on a
            telemedicine consultation provided by a licensed doctor via
            CliniCall Limited. It is intended solely for the patient. Misuse or
            sharing with others is strictly prohibited. For emergencies or
            adverse reactions, seek immediate medical attention.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center justify-between ">
            <div className="flex items-center justify-center space-x-2">
              {/* SMS and Email Radio */}
              <div className=" flex items-center justify-center space-x-2">
                <input
                  type="radio"
                  name="message"
                  id="radioDefault02"
                  value="sms"
                  checked={selectedOption === "sms"}
                  onChange={handleCheckboxChange}
                  className="cursor-pointer accent-pink-500"
                />
                <label
                  className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
                  htmlFor="radioDefault02"
                >
                  SMS & Email
                </label>
              </div>
              {/* Only Email */}
              <div className=" flex items-center justify-center space-x-2">
                <input
                  type="radio"
                  name="message"
                  id="radioDefault01"
                  value="email"
                  checked={selectedOption === "email"}
                  onChange={handleCheckboxChange}
                  className="cursor-pointer accent-pink-500"
                />
                <label
                  className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
                  htmlFor="radioDefault01"
                >
                  Email
                </label>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setPrescriptionModel(!prescriptionModel);
                }}
                className="bg-[#EB148C] text-white rounded px-3 py-2"
              >
                Cancel
              </button>
              <button
                onClick={prescriptionsubmit}
                disabled={loading}
                className="bg-[#EB148C] text-white rounded px-3 py-2"
              >
                {loading ? "Loading..." : " Submit"}
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
