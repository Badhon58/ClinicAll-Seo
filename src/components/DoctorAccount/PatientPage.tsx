"use client";
import { EndPoint, Methods } from "@/api/config";
import Loading from "@/app/loading";
import { apiCall } from "@/lib/axios-client";
import React, { useEffect, useState } from "react";
import { MedicalReport, patientInfo } from "./interface";
import Image from "next/image";
import moment from "moment";
import Prescription from "../UserAccount/Prescription";
import { IoMdEye } from "react-icons/io";
import { Modal } from "rsuite";
import "./Style.css";
import { FaCloudDownloadAlt } from "react-icons/fa";

const PatientPage = ({ id }: { id: string }) => {
  const [allappoitment, setAllappoitment] = useState<any>();
  const [userInfo, setUserInfo] = useState<patientInfo>();
  const [allReport, setAllReport] = useState<MedicalReport[]>();
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [imageShow, setImageShow] = useState(false);

  const init = async () => {
    try {
      setLoading(true);
      //   user Information
      const userInfo = await apiCall(
        Methods.GET,
        `${EndPoint.SINGLE_USER}/${id}`
      );
      setUserInfo(userInfo.data);

      //   user appoitment
      const user_appointment_history = await apiCall(
        Methods.GET,
        `${EndPoint.USER_APPOINTMENT_HISTORY}/${id}`
      );
      setAllappoitment(user_appointment_history.data);

      //   user report show GETREPORTBYID
      const user_report_history = await apiCall(
        Methods.GET,
        `${EndPoint.GETREPORTBYID}?userId=${id}&page=1`
      );
      setAllReport(user_report_history.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleShowLink = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    fileLink: string
  ) => {
    // e.preventDefault();
    setFileUrl(fileLink);
    setImageShow(!imageShow);
  };

  const handleCloseLink: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    setImageShow(!imageShow);
  };

  useEffect(() => {
    init();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <section className="xl:container  xl:mx-auto min-h-[80vh] shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)]  px-5 py-2 rounded-md">
      <p className="text-xl font-semibold 2xl:text-2xl p-3">Patient Details</p>

      {/* user Information  */}
      <div className="mt-3 grid grid-cols-6 items-center gap-5 h-full p-5 shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] rounded-lg">
        <div className="col-span-1 size-32">
          <Image
            src={userInfo?.image || "/other/userprofile.svg"}
            alt={userInfo?.firstName || "Patient Name"}
            width={200}
            height={200}
            className="w-full h-full object-cover rounded-2xl border"
          />
        </div>
        <div className="col-span-5 p-3 h-full">
          <p>Name : {userInfo?.firstName}</p>
          <p>Phone : {userInfo?.phone}</p>
          <p>Email : {userInfo?.email}</p>
          <p>Date of Birth : {userInfo?.dob}</p>
          <p>Organization : {userInfo?.organization}</p>
        </div>
      </div>

      {/* view Lab Report  */}
      <div className="mt-3 h-full p-5 shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] rounded-lg">
        <p className="text-xl font-semibold 2xl:text-2xl p-3">Report</p>

        <div className="grid lg:grid-cols-3 gap-3 mt-3">
          {allReport?.map((item, index) => {
            return (
              <div
                key={index}
                className=" text-gray-700 bg-white shadow-[0px_0px_10px_0px_rgba(0,_0,_0,_0.1)] bg-clip-border rounded-xl"
              >
                <div className="grid grid-cols-3 h-[200px] overflow-y-auto gap-1 mx-4 mt-4 text-gray-700 bg-white bg-clip-border rounded-xl">
                  {item?.reportFile?.map((fileUrl, index) => (
                    <div key={index} className="px-2">
                      <div className="relative group cursor-pointer">
                        <button
                          onClick={(e) => handleShowLink(e, fileUrl)}
                          className="eyebutton"
                        >
                          <IoMdEye size={20} className="text-white" />
                        </button>
                        <embed
                          src={fileUrl}
                          width={80}
                          height={80}
                          className="w-20 h-20 border rounded-md object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      {item.title}
                    </p>
                  </div>
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Appoitment History  */}
      <div className="mt-3 h-full p-5 shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] rounded-lg">
        <p className="text-xl font-semibold 2xl:text-2xl p-3">
          {" "}
          Appoitment History
        </p>
        <div className="grid grid-cols-6 bg-[#fff4f4]">
          <p className="py-2 px-4 text-center text-base font-medium">Doctor</p>
          <p className="py-2 px-4 text-center  text-base font-medium">
            Patient Info
          </p>
          <p className="py-2 px-4 text-center text-base font-medium">
            Date & Time
          </p>
          <p className="py-2 px-4 text-center text-base font-medium">
            Pescription
          </p>
          <p className="py-2  text-center text-base font-medium">
            Appoitment Status
          </p>
          <p className="py-2  text-center text-base font-medium">
            Report
          </p>
        </div>
        {allappoitment?.length > 0 &&
          allappoitment?.map((item: any, index: any) => (
            <div
              key={index}
              className="grid md:grid-cols-6  border-b border-x "
            >
              <p className="flex  justify-center items-center  text-sm font-medium text-[#6b7588]">
                {item?.doctor?.firstName} {item?.doctor?.lastName}
              </p>
              <p className="flex  justify-center items-center  text-sm font-medium text-[#6b7588] border-x">
                <span>{item?.fullName}</span>
                {/* <span className="text-xs"> {item.phone}</span> */}
              </p>
              <p className="flex justify-center flex-col items-center text-sm font-medium text-[#6b7588] py-2">
                <span>{moment(item?.date).format("Do MMMM YYYY")}</span>
                <span className="text-sm">{item?.time}</span>
              </p>
              <Prescription item={item} />
              <p className={`capitalize p-1.5 `}>
                <span
                  className={` flex justify-center items-center 
                 ${item.paymentStatus == "pending"
                      ? " bg-[#ffe2e5] text-[#f64e60] font-medium h-full w-full "
                      : " text-[#5f8d4e] bg-[#f4fff3] font-medium h-full w-full"
                    }`}
                >
                  {item?.paymentStatus}
                </span>
              </p>
              <div className="border-l">
                <div className="grid grid-cols-3 gap-2">
                  {item.documents && item.documents.map((item: string, index: number) => {
                    return (
                      <div key={index} className="relative group cursor-pointer">
                        <object
                          data={item}
                          className=" h-10 w-10 border rounded-md object-contain cursor-pointer"
                        />
                        <button
                          onClick={(e) => handleShowLink(e, item)}
                          className="eyebutton"
                        >
                          <IoMdEye size={20} className="text-white" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
      </div>
      <Modal
        open={imageShow}
        onClose={handleCloseLink}
        size={"lg"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body className="">
          <div className=" rounded-2xl w-full h-full ">
            <embed src={fileUrl} type="" width="600" height="600" />
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-xs text-gray-500">
              Note: If preview doesn’t work, open in a new tab.
            </p>

            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaCloudDownloadAlt size={20} />
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default PatientPage;
