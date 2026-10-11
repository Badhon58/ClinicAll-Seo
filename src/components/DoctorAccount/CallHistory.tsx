"use client";
import { EndPoint, Methods } from "@/api/config";
import { getDoctorId } from "@/lib/authHandler";
import { apiCall } from "@/lib/axios-client";
import React, { useEffect, useState } from "react";
import PageLoading from "../Seo/PageLoading";
import { callInterface } from "./interface";
import moment from "moment";
import { DateRangePicker, Modal, Pagination } from "rsuite";
import { MdEdit } from "react-icons/md";

const CallHistory = () => {
  const [loading, setLoading] = useState(false);
  const [allCallHistory, setAllCallHistory] = useState<any>();
  const [range, setRange] = useState<[Date, Date] | null>(null);
  const startTime = moment().format("YYYY-MM-DD");
  const [activePage, setActivePage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [firstDate, setFirstDate] = useState<string | null>(
    moment().format("YYYY-MM-DD")
  );
  const [lastDate, setLastDate] = useState<string | null>(
    moment().format("YYYY-MM-DD")
  );
  const [doctorId, setDoctorId] = useState<any>();
  const [editData, setEditData] = useState<callInterface>();
  const [editModel, setEditModel] = useState(false);
  const [Note, setNote] = useState<string>("");
  const [noteLoading, setNoteLoading] = useState(false);
  // const [status, setStatus] = useState<string>("");
  const init = async () => {
    try {
      setLoading(true);
      const doc_Id = await getDoctorId();
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.CALL_HISTORY_GET}?doctorId=${doc_Id}&startDate=${startTime}&endDate=${startTime}`
      );
      // console.log(response.data);
      setDoctorId(doc_Id);
      setAllCallHistory(response.data);
      setTotal(response.data.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = async (value: [Date, Date] | null) => {
    console.log("Hellooooo");
    try {
      setLoading(true);
      setRange(value);
      // const doc_Id = await getDoctorId();
      if (value) {
        // console.log("Start Date:", value[0]);
        // console.log("End Date:", value[1]);

        const startTimes = moment(value[0]).format("YYYY-MM-DD");
        const endTime = moment(value[1]).format("YYYY-MM-DD");
        setFirstDate(startTimes);
        setLastDate(endTime);
        const response = await apiCall(
          Methods.GET,
          `${
            EndPoint.CALL_HISTORY_GET
          }?startDate=${startTimes}&endDate=${endTime}&doctorId=${doctorId}&page=${1}`
        );
        // console.log("Sdsdqdad", data);

        setAllCallHistory(response.data);
        setTotal(response.data.count);
        setActivePage(1);
      } else {
        const response = await apiCall(
          Methods.GET,
          `${
            EndPoint.CALL_HISTORY_GET
          }?startDate=${startTime}&endDate=${startTime}&doctorId=${doctorId}&page=${1}`
        );
        setFirstDate(startTime);
        setLastDate(startTime);

        setAllCallHistory(response.data);
        setTotal(response.data.count);
        setActivePage(1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onPageSearch = async (page: number) => {
    setLoading(true);
    try {
      setActivePage(page);
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.CALL_HISTORY_GET}?startDate=${firstDate}&endDate=${lastDate}&page=${page}&doctorId=${doctorId}`
      );
      setAllCallHistory(response.data);
      setTotal(response.data.count);
    } catch (error) {
      console.error("Error fetching page data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    item: any
  ) => {
    try {
      e.preventDefault();
      // console.log(item);
      setEditData(item);
      setEditModel(!editModel);
      setNote(item.note);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNoteSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setNoteLoading(true);
      e.preventDefault();
      let finalData = {
        note: Note,
      };
      const response = await apiCall(
        Methods.PATCH,
        `${EndPoint.CALL_UPDATE}/${editData?._id}`,
        finalData
      );
      if (response.success) {
        const response = await apiCall(
          Methods.GET,
          `${
            EndPoint.CALL_HISTORY_GET
          }?startDate=${firstDate}&endDate=${lastDate}&doctorId=${doctorId}&page=${1}`
        );
        setAllCallHistory(response.data);
        setTotal(response.data.count);
        setActivePage(1);
        setEditModel(!editModel);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setNoteLoading(false);
    }
  };

  const handleClose = (e: any) => {
    setEditModel(!editModel);
  };

  useEffect(() => {
    init();
  }, []);
  return loading ? (
    <PageLoading />
  ) : (
    <section className="xl:container xl:mx-auto min-h-[80vh] shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] px-2.5 md:px-5 py-2 ">
      <div className="p-3 flex items-center space-x-3">
        <p className="text-xl font-semibold 2xl:text-2xl">Call History</p>
        <div>
          <DateRangePicker
            format="MM/dd/yyyy"
            character=" – "
            value={range}
            onChange={handleChange}
            placeholder="Select date range"
          />
        </div>
      </div>
      <div className="grid items-center justify-around md:grid-cols-8 bg-red-50 border ">
        <p className="py-3 text-sm font-semibold text-center">Doctor</p>
        <p className="py-3  text-sm font-semibold text-center  border-x">
          User
        </p>

        <p className="py-3  text-sm font-semibold text-center ">Mobile No</p>
        <p className="py-3 text-sm font-semibold text-center border-x">
          Call Status
        </p>
        <p className="py-3 text-sm font-semibold text-center ">Time</p>
        <p className="py-3 text-sm font-semibold text-center border-x">Date</p>
        <p className="py-3 text-sm font-semibold text-center border-l">
          Duration
        </p>
        <p className="py-3 text-sm font-semibold text-center border-l">Edit</p>
        {/* <p className="py-3 text-sm font-semibold text-center">Rating</p> */}
      </div>
      {allCallHistory && allCallHistory?.callHistory?.length > 0
        ? allCallHistory?.callHistory?.map((item: any, index: any) => {
            let status = "Failed";
            let textColor = "text-red-700";
            let bgColor = "bg-red-100"; // Light red background for Failed

            if (item.callReached) {
              status = "Dropped";
              textColor = "text-amber-700";
              bgColor = "bg-amber-100"; // Light amber/yellow background
            }
            if (item.callReceived) {
              status = "Completed";
              textColor = "text-green-700";
              bgColor = "bg-green-100"; // Light green background
            }
            if (item.callRejected) {
              status = "Rejected";
              textColor = "text-red-800";
              bgColor = "bg-red-200"; // Slightly darker red background
            }
            if (item.callCancelled) {
              status = "Cancelled";
              textColor = "text-gray-700";
              bgColor = "bg-gray-100"; // Light gray background
            }
            return (
              <div className=" grid grid-cols-8 border-b border-x" key={index}>
                <p className="py-3 text-xs flex items-center justify-center font-medium  text-[#16020B]">
                  {item?.doctor?.firstName} {item?.doctor?.lastName}
                </p>
                <p className="py-3 text-xs border-x font-medium flex flex-col items-center justify-center  text-[#16020B] ">
                  <span>
                    {item?.user?.firstName} {item?.user?.lastName}
                  </span>
                  {item?.user?.organization && (
                    <span className="bg-green-200 p-1 rounded-sm  w-full text-center">
                      {item?.user?.organization
                        ? item?.user?.organization
                        : "General Patient"}
                    </span>
                  )}
                </p>

                <p className="py-3 text-xs font-medium flex items-center justify-center  text-[#16020B] ">
                  {item?.user?.phone}
                </p>
                <p
                  className={`text-xs p-1 font-medium flex flex-col items-center justify-center border-x`}
                >
                  {item.note ? (
                    <span className={`p-1 h-1/2 w-full text-center`}>
                      {item.note}
                    </span>
                  ) : (
                    <span
                      className={` p-1 h-1/2 w-full text-center ${textColor} ${bgColor}`}
                    >
                      {status}
                    </span>
                  )}
                </p>
                <p className="py-2 text-xs font-medium flex items-center justify-center text-[#16020B] ">
                  {moment(item?.createdAt).format("hh:mm:ss A")}
                </p>
                <p className="py-2 text-xs font-medium flex items-center justify-center text-[#16020B] border-x">
                  {moment(item?.createdAt).format("YYYY-MM-DD")}
                </p>
                <p className="py-2 text-xs font-medium flex items-center justify-center text-[#16020B]">
                  {moment.utc(item.duration * 1000).format("HH : mm : ss")}
                </p>
                <button
                  onClick={(e) => handleEdit(e, item)}
                  className="py-2 text-xs font-medium border-x flex items-center justify-center text-[#16020B]"
                >
                  <MdEdit size={25} />
                </button>
              </div>
            );
          })
        : "There Are No Calls Today."}
      {allCallHistory && allCallHistory?.callHistory?.length > 0 && (
        <div className="flex items-center justify-center mt-3 ">
          <Pagination
            prev
            next
            size="lg"
            total={total}
            limit={50}
            activePage={activePage}
            onChangePage={onPageSearch}
            ellipsis
            boundaryLinks
            maxButtons={10}
          />
        </div>
      )}
      <Modal open={editModel} onClose={handleClose}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          {editData ? (
            <div>
              <label htmlFor="" className="py-2.5 font-medium text-lg">
                Doctor Info
              </label>
              <div className="border rounded-md p-3 ">
                <div className="flex w-full space-x-3">
                  <div className=" w-full">
                    <label htmlFor="">First Name </label>
                    <p className="p-2 border rounded-md w-full">
                      {editData?.doctor?.firstName}
                    </p>
                  </div>
                  <div className=" w-full">
                    <label htmlFor="">Last Name </label>
                    <p className="p-2 border rounded-md w-full">
                      {editData?.doctor?.lastName}
                    </p>
                  </div>
                </div>
              </div>
              <label htmlFor="" className=" font-medium text-lg pt-5 ">
                Patient Info
              </label>
              <div className="border rounded-md p-3 ">
                <div className="grid grid-cols-2 gap-3">
                  <div className=" w-full">
                    <label htmlFor="">First Name</label>
                    <p className="p-2 border rounded-md">
                      {editData.user.firstName}
                    </p>
                  </div>

                  <div className=" w-full">
                    <label htmlFor="">Last Name</label>
                    <p className="p-2 border rounded-md">
                      {editData.user.firstName}
                    </p>
                  </div>

                  <div className=" w-full">
                    <label htmlFor="">Phone </label>
                    <p className="p-2 border rounded-md w-full">
                      {editData.user.dialCode} {editData.user.phone}
                    </p>
                  </div>

                  <div className=" w-full">
                    <label htmlFor="">Organization</label>
                    <p className="p-2 border rounded-md w-full">
                      {editData.user.organization}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="note">Note: </label>
                    <select
                      className="w-full p-2 outline-none border rounded-md"
                      name="note"
                      value={Note}
                      onChange={(e) => setNote(e.target.value)}
                    >
                      <option value="">Select Note</option>
                      <option value="Consulted">Consulted</option>
                      <option value="Not Received">Not Received</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end mt-2">
                  <button
                    onClick={handleNoteSubmit}
                    disabled={noteLoading}
                    className="flex items-center space-x-2 px-4 py-1.5 rounded-md border-[#E2136E] bg-[#E2136E] text-white font-medium text-sm "
                  >
                    {noteLoading ? "Loading.." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            "Try Again"
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </section>
  );
};

export default CallHistory;
