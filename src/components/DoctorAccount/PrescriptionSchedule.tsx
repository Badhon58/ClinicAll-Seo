"use client";
import React, { useRef, useState } from "react";
import { Appointment } from "./interface";
import Link from "next/link";
import moment from "moment";
import "./Style.css";
import { Modal } from "rsuite";
import { PrescriptionPrint } from "../common/PrescriptionPrint";
import { useReactToPrint } from "react-to-print";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { toast } from "react-toastify";

const PrescriptionSchedule = ({ item }: { item: Appointment }) => {
  const [selectedAppoitment, setSelectedAppoitment] = useState<any>({});
  const [showRxModal, setShowRxModal] = useState(false);
  const [sendBy, setSendBy] = useState("sms");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const handleView = (item: any) => {
    setSelectedAppoitment(item);
    setShowRxModal(true);
    // console.log("Item", item);
  };
  const hideRxModal = () => {
    setShowRxModal(false);
  };
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint: any = useReactToPrint({
    contentRef,
    documentTitle: item.fullName,
  });
  const handleCheckboxChange = (e: any) => {
    console.log(e.target.value);
    setSendBy(e.target.value);
  };

  const handleResend = async () => {
    setSending(true);
    const payload = {
      doctorName:
        selectedAppoitment.doctor.firstName +
        " " +
        selectedAppoitment.doctor.lastName,
      doctorDegree: selectedAppoitment.doctor.degree,
      doctorBMDCNo: selectedAppoitment.doctor.bmdc,
      patientPhone: selectedAppoitment.phone,
      patientEmail: selectedAppoitment.email,
      prescription_data: selectedAppoitment.prescription_data,
      deliveryMedium: sendBy,
    };
    await apiCall(Methods.POST, EndPoint.DOCTOR_RESEND_PRESCRIPTION, payload)
      .then((resp) => {
        // console.log("resp", resp);
        toast.success(resp.message, {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        console.log("Err", err);
        toast.error(err.message, {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
      })
      .finally(() => {
        setSending(false);
      });
    // console.log("Payload", payload);
  };

  return (
    <>
      <div>
        <div className="grid border-b md:grid-cols-5   border-x border-t md:border-t-0 ">
          <p
           
            className="flex items-center hover:underline break-words border-r cursor-pointer justify-center text-[15px] px-0.5 text-center capitalize break-all"
          >
            {item?.doctor?.firstName} {item.doctor?.lastName}
          </p>
          <Link
            href={`patientInfo/${item?.user?._id}`}
            className="flex items-center break-words hover:underline cursor-pointer justify-center text-[15px] px-0.5 text-center capitalize break-all"
          >
            {item?.fullName}
          </Link>
          <p className="flex items-center justify-center text-center md:border-x border-y md:border-y-0 text-[15px] break-all">
            {item?.phone}
          </p>
          <p className="flex flex-col items-center border-r justify-center break-all">
            <span className="text-xs">
              {moment(item?.date).format("Do MMMM YYYY")}
            </span>
            <span className="text-sm">{item?.time}</span>
          </p>
          <p
            className={`flex items-center justify-center m-0.5 rounded capitalize  font-medium`}
          >
            {item?.status === "done" ? (
              <button onClick={() => handleView(item)} className="success">
                View
              </button>
            ) : (
              <span className="pending">{item.status}</span>
            )}
          </p>
        </div>
      </div>
      <Modal open={showRxModal} onClose={hideRxModal} size={"lg"}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <PrescriptionPrint innerRef={contentRef} data={selectedAppoitment} />
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-between items-center mx-6">
            <button
              onClick={handlePrint}
              className="bg-green-400 px-3 py-2 text-lg text-white rounded"
            >
              Print
            </button>
            <div className="flex justify-between gap-6">
              <div className=" flex items-center justify-center space-x-2">
                <input
                  type="radio"
                  name="message"
                  id="radioDefault01"
                  defaultChecked
                  value="sms"
                  onChange={handleCheckboxChange}
                  className="cursor-pointer accent-pink-500"
                />
                <label
                  className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
                  htmlFor="radioDefault01"
                >
                  SMS & Email
                </label>
              </div>
              <div className=" flex items-center justify-center space-x-2">
                <input
                  type="radio"
                  name="message"
                  id="radioDefault02"
                  value="email"
                  onChange={handleCheckboxChange}
                  className="cursor-pointer accent-pink-500"
                />
                <label
                  className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
                  htmlFor="radioDefault02"
                >
                  Email
                </label>
              </div>
              <button
                disabled={sending}
                onClick={handleResend}
                className="bg-green-400 px-3 py-2 text-lg text-white rounded"
              >
                {sending ? "Sending..." : "Resend Rx"}
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PrescriptionSchedule;
