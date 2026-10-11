"use client";
import React, { useState } from "react";
import Image from "next/image";
import moment from "moment";
import PrescriptionForm from "./PrescriptionForm";
import { Modal } from "rsuite";
import { IoCallSharp } from "react-icons/io5";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
const ScheduleList = ({
  data,
  handleMakeCall,
}: {
  data: any;
  handleMakeCall: (onlineUser: any, fcm_token?: any) => void;
}) => {
  const [showModel, setShowModel] = useState(false);

  const prescriptionModel: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModel(!showModel);
  };
  // console.log("DData", data);
  return (
    <>
      <div className="grid border-b grid-rows-5 md:grid-rows-none md:grid-cols-6   border-x border-t md:border-t-0 ">
        <Link
          href={`patientInfo/${data?.user?._id}`}
          className="flex items-center space-x-3 hover:underline cursor-pointer justify-center text-[15px] px-0.5 text-center capitalize break-all hover:text-blue-500">
          <span>{data?.fullName}</span>
        </Link>
        <p className="flex items-center justify-center text-center md:border-x border-y md:border-y-0 text-[15px] break-all">
          {data?.phone}
        </p>
        <p className="flex flex-col items-center justify-center break-all">
          <span className="text-xs">
            {moment(data?.date).format("Do MMMM YYYY")}
          </span>
          <span className="text-sm">{data?.time}</span>
        </p>
        {/* <div className="flex items-center justify-center py-2 border-x"> */}
        <button
          onClick={() => setShowModel(true)}
          className={`  md:border-x border-y md:border-y-0  p-0.5`}>
          <span className=" h-full w-full bg-[#ffe2e5]  flex items-center justify-center rounded text-[#f64e60] font-medium py-[6px] md:py-2.5 lg:py-3">
            Write
          </span>
        </button>
        {/* </div> */}
        <p
          className={`flex items-center justify-center m-0.5 rounded capitalize bg-[#ffe2e5] text-[#f64e60]  font-medium`}>
          {data?.status}
        </p>
        <button
          // disabled={!data.isOnline}
          disabled
          onClick={() => handleMakeCall(data?.user?._id, data?.user?.fcmToken)}
          className="flex flex-col items-center justify-center py-2.5 lg:py-3 lg:border-l border-t lg:border-t-0 cursor-pointer">
          <IoCallSharp className="text-[#EB148C]" />
        </button>
      </div>
      <Modal open={showModel} onClose={prescriptionModel} size={"full"}>
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
          <div className="flex items-center justify-between ">
            <div>
              <p className="text-lg font-medium">
                {data?.doctor?.firstName} {data?.doctor?.lastName} (
                {data?.doctor?.degree})
              </p>
              <p>BMDC Number : {data?.doctor?.bmdc}</p>
            </div>
            <p className="font-medium">
              Date : {moment().format("DD/MM/YYYY")}
            </p>
          </div>

          <PrescriptionForm data={data} setShowModel={setShowModel} />
        </Modal.Body>
        {/* <Modal.Footer>

        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ScheduleList;
