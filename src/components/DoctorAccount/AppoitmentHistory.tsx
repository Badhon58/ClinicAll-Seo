"use client";
import React, { useEffect, useState, useRef } from "react";
import { Appointment } from "./interface";
import { getDoctorId } from "@/lib/authHandler";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { PrescriptionPrint } from "../common/PrescriptionPrint";
import PageLoading from "../Seo/PageLoading";
import { toast } from "react-toastify";
import { DateRangePicker, Modal, Pagination } from "rsuite";
import Link from "next/link";
import NotFound from "./NotFound";
import Loading from "@/app/loading";

const AppoitmentHistory = () => {
  const [AppoitmentHistorys, setAppoitmentHistory] = useState<Appointment[]>();
  const [selectedAppoitment, setSelectedAppoitment] = useState<any>({});
  const [showRxModal, setShowRxModal] = useState(false);
  const [sendBy, setSendBy] = useState("sms");
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false)
  const [sending, setSending] = useState(false);
  const { DOCTOR_RESEND_PRESCRIPTION } = EndPoint;
  const [activePage, setActivePage] = React.useState(1);
  const [totalPage, setTotalPage] = useState(1)
  const [dateRange, setDateRange] = useState<[Date, Date] | null>([
    new Date(),
    new Date(),
  ]);
  const [doctorId, setDoctorId] = useState<any>();

  const init = async () => {
    const doc_Id = await getDoctorId();
    setDoctorId(doc_Id)
    try {
      setLoading(true);
      const searchQuery = new URLSearchParams()
      searchQuery.append('page', "1")
      searchQuery.append("startDate", moment().format("YYYY-MM-DD"))
      searchQuery.append("endDate", moment().format("YYYY-MM-DD"))
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.DOCTOR_SCHEDULE_HISTORY_V2}/${doc_Id}?${searchQuery.toString()}`
      );
      setAppoitmentHistory(response.data.data);
      setTotalPage(response.data.total);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint: any = useReactToPrint({
    contentRef,
    documentTitle: "Clinicall_Prescription",
  });

  const handleView = (item: any) => {
    setSelectedAppoitment(item);
    setShowRxModal(true);
    // console.log("Item", item);
  };

  const hideRxModal = () => {
    setShowRxModal(false);
  };

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
    await apiCall(Methods.POST, DOCTOR_RESEND_PRESCRIPTION, payload)
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

  const handleSearchButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault()
      setHistoryLoading(true)
      const firstDate = dateRange?.[0]
        ? moment(dateRange[0]).format("YYYY-MM-DD")
        : null;

      const lastDate = dateRange?.[1]
        ? moment(dateRange[1]).format("YYYY-MM-DD")
        : null;

      const searchQuery = new URLSearchParams()
      searchQuery.append("page", "1")
      if (firstDate) {
        searchQuery.append("startDate", firstDate)
      }
      if (lastDate) {
        searchQuery.append("endDate", lastDate)
      }
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.DOCTOR_SCHEDULE_HISTORY_V2}/${doctorId}?${searchQuery.toString()}`
      );
      setAppoitmentHistory(response.data.data);
      setTotalPage(response.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setHistoryLoading(false)
    }
  }

  useEffect(() => {
    init();
  }, []);

  const fetchAppoitment = async (page: number, range?: [Date, Date] | any) => {
    setHistoryLoading(true);

    try {
      const firstDate = range?.[0]
        ? moment(range[0]).format("YYYY-MM-DD")
        : null;

      const lastDate = range?.[1]
        ? moment(range[1]).format("YYYY-MM-DD")
        : null;

      const searchQuery = new URLSearchParams();

      searchQuery.append("page", String(page));

      if (firstDate) searchQuery.append("startDate", firstDate);
      if (lastDate) searchQuery.append("endDate", lastDate);

      const response = await apiCall(
        Methods.GET,
        `${EndPoint.DOCTOR_SCHEDULE_HISTORY_V2}/${doctorId}?${searchQuery.toString()}`
      );

      if (response.success) {
        setAppoitmentHistory(response.data.data);
        setTotalPage(response.data.total);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setHistoryLoading(false);
    }
  };

  return loading ? (
    <PageLoading />
  ) : (
    <section className="xl:container  xl:mx-auto min-h-[80vh] shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)]  px-5 py-2 ">
      <div className="p-3 flex items-center justify-between">
        <p className="text-xl font-semibold 2xl:text-2xl">
          Appointments History
        </p>
        <div className="flex items-center justify-center space-x-2">
          <DateRangePicker
            value={dateRange}
            onChange={(range) => {
              setDateRange(range);
            }}
            format="yyyy-MM-dd"
          />
          <button onClick={handleSearchButton} className="flex items-center space-x-2 px-4 py-1.5 rounded-md border-[#E2136E] bg-[#E2136E] text-white font-medium text-sm ">Search</button>
        </div>
      </div>
      {historyLoading ? <Loading /> : AppoitmentHistorys && AppoitmentHistorys?.length > 0 ? (
        <>
          {/* lg Device  */}
          <div className="hidden md:block">
            <div className="grid sm:grid-cols-5  w-full bg-[#FFF4F4] mt-2.5">
              <p className="py-2 text-xs flex items-center justify-center font-semibold  text-[#16020B]">
                Patient Name
              </p>
              <p className="py-2 ml-3 text-xs font-semibold flex items-center justify-center  2xl:ml-7 text-[#16020B]">
                Mobile No
              </p>
              <p className="py-2 text-xs font-semibold flex items-center justify-center text-[#16020B] ">
                Date & Time
              </p>
              <p className="py-2 text-xs font-semibold flex items-center justify-center text-[#16020B]">
                Prescription
              </p>
              <p className="py-2 text-xs font-semibold flex items-center justify-center text-[#16020B]">
                STATUS
              </p>
            </div>
            {AppoitmentHistorys?.map((item, index) => (
              <div key={index} className="border-b border-x">
                <div className="grid w-full sm:grid-cols-5">
                  <Link
                    href={`patientInfo/${item?.user?._id}`}
                    className="flex items-center hover:underline cursor-pointer justify-center text-[15px] px-0.5 text-center capitalize break-all">
                    {item?.fullName}
                  </Link>
                  <p className=" ml-3 text-sm text-[#6B7588] font-medium grid border-x place-items-center 2xl:ml-7">
                    {item?.phone}
                  </p>
                  <p className=" text-xs text-[#6B7588] font-medium grid place-items-center  p-2 ">
                    <span>{moment(item?.date).format("Do MMMM YYYY")}</span>
                    <span>{item?.time}</span>
                  </p>
                  <div className="flex items-center justify-center  border-x">
                    <button
                      onClick={() => handleView(item)}
                      className="text-sm w-full h-full text-[#5f8d4e] bg-[#f4fff3] font-medium  flex items-center justify-center p-2 rounded-md">
                      View Prescription
                    </button>
                    {/* <div className="hidden">
                      <PrescriptionPrint innerRef={contentRef} data={item} />
                    </div> */}
                  </div>
                  <p className="grid capitalize text-base font-medium text-white bg-green-400 place-items-center ">
                    {item?.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* md Device  */}
          <div className="block md:hidden ">
            {AppoitmentHistorys?.map((item, index) => {
              if (item.paymentStatus === "pending") {
                return null;
              }
              return (
                <div
                  key={index}
                  className="grid grid-cols-3 border-b border-black py-2">
                  <aside className="grid col-span-1 grid-rows-5 bg-[#FFF4F4] border-l">
                    <p className="text-xs flex items-center justify-center  font-semibold  text-[#16020B] border-t">
                      Patient Name
                    </p>
                    <p className=" text-xs font-semibold flex items-center justify-center  text-[#16020B] border-y">
                      Mobile No
                    </p>
                    <p className=" text-xs font-semibold flex items-center justify-center text-[#16020B] ">
                      Date & Time
                    </p>
                    <p className="text-xs font-semibold flex items-center justify-center text-[#16020B] border-y">
                      Prescription
                    </p>
                    <p className=" text-xs font-semibold flex items-center justify-center text-[#16020B] border-b">
                      STATUS
                    </p>
                  </aside>
                  <aside className="grid col-span-2 grid-rows-5">
                    <p className=" text-sm  grid place-items-center text-[#6B7588] font-medium capitalize border">
                      {item?.fullName}
                    </p>
                    <p className=" text-sm text-[#6B7588] font-medium grid border-x place-items-center">
                      {item?.phone}
                    </p>
                    <p className=" text-xs text-[#6B7588] font-medium grid place-items-center  p-2 border">
                      <span>{moment(item?.date).format("Do MMMM YYYY")}</span>
                      <span>{item?.time}</span>
                    </p>
                    <div className="flex items-center justify-center  border-x">
                      <button
                        onClick={() => handleView(item)}
                        className="text-sm w-full h-full text-[#5f8d4e] bg-[#f4fff3] font-medium  flex items-center justify-center p-2 rounded-md">
                        View Prescription
                      </button>
                      {/* <div className="hidden">
                        <PrescriptionPrint innerRef={contentRef} data={item} />
                      </div> */}
                    </div>
                    <p className="grid capitalize text-base font-medium text-white bg-green-400 place-items-center ">
                      {item?.status}
                    </p>
                  </aside>
                </div>
              );
            })}
          </div>
          <Modal open={showRxModal} onClose={hideRxModal} size={"lg"}>
            <Modal.Header></Modal.Header>
            <Modal.Body>
              <PrescriptionPrint
                innerRef={contentRef}
                data={selectedAppoitment}
              />
            </Modal.Body>
            <Modal.Footer>
              <div className="flex justify-between items-center mx-6">
                <button
                  onClick={handlePrint}
                  className="bg-green-400 px-3 py-2 text-lg text-white rounded">
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
                      htmlFor="radioDefault01">
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
                      htmlFor="radioDefault02">
                      Email
                    </label>
                  </div>
                  <button
                    disabled={sending}
                    onClick={handleResend}
                    className="bg-green-400 px-3 py-2 text-lg text-white rounded">
                    {sending ? "Sending..." : "Resend Rx"}
                  </button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <NotFound />
        </div>
      )}

      {totalPage > 50 && <div className="mt-3 border p-2 rounded-md flex items-end justify-center">
        <Pagination
          total={totalPage}
          limit={50}
          activePage={activePage}
          onChangePage={(page) => {
            setActivePage(page);
            fetchAppoitment(page, dateRange);
          }}
        />
      </div>}
    </section>
  );
};

export default AppoitmentHistory;
