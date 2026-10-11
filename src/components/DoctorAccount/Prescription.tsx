"use client";
import { EndPoint, Methods } from "@/api/config";
import { getDoctorId } from "@/lib/authHandler";
import { apiCall } from "@/lib/axios-client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { DateRangePicker, Pagination } from "rsuite";
import { Appointment } from "./interface";
import { useRouter } from "next/navigation";
import PrescriptionSchedule from "./PrescriptionSchedule";
const Prescription = () => {
  const [allprescription, setAllprescription] = useState<Appointment[]>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const [time, setTime] = useState<[Date, Date] | null>(null);
  const today = moment().format("YYYY-MM-DD");
  const router = useRouter();
  const init = async () => {
    try {
      setLoading(true);
      const doc_Id = await getDoctorId();

      const { data } = await apiCall(
        Methods.GET,
        `${EndPoint.DOCTOR_FIND_BY_ID}/${doc_Id}`
      );
      if (data.role === "inhouse_doctor") {
        const response = await apiCall(
          Methods.GET,
          EndPoint.DOCTOR_APPOINTMENT_GET_ALL +
            `?isInhouse=true&page=${pages}&startDate=${today}&endDate=${today}`
        );
        setTotalCount(response.data.count);
        setAllprescription(response.data.appointmentList);
      } else {
        router.back();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = async (value: [Date, Date] | null) => {
    try {
      setLoading(true);
      if (value) {
        const [startDate, endDate] = value;
        setTime(value);

        const { data } = await apiCall(
          Methods.GET,
          EndPoint.DOCTOR_APPOINTMENT_GET_ALL +
            `?isInhouse=true&page=${pages}&startDate=${startDate}&endDate=${endDate}`
        );

        setTotalCount(data.count);
        setAllprescription(data.appointmentList);
      } else {
        console.log("No date selected");
        setTime(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (page: number) => {
    try {
      setLoading(true);
      setPages(page);
      if (!time) {
        const { data } = await apiCall(
          Methods.GET,
          EndPoint.DOCTOR_APPOINTMENT_GET_ALL +
            `?isInhouse=true&page=${page}&startDate=${today}&endDate=${today}`
        );
        setTotalCount(data.count);
        setAllprescription(data.appointmentList);
      } else {
        const [startDate, endDate] = time;
        const { data } = await apiCall(
          Methods.GET,
          EndPoint.DOCTOR_APPOINTMENT_GET_ALL +
            `?isInhouse=true&page=${page}&startDate=${startDate}&endDate=${endDate}`
        );
        setTotalCount(data.count);
        setAllprescription(data.appointmentList);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <section className="xl:container xl:mx-auto min-h-[80vh] shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] px-2.5 md:px-5 py-2 ">
      <div className="flex  space-x-3 items-center">
        <p className="text-base lg:text-xl font-semibold 2xl:text-2xl">
          All Doctor Prescription
        </p>
        <div>
          <DateRangePicker
            placeholder="Select date range"
            value={time}
            onChange={handleDateChange}
            style={{ width: 280 }}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col space-y-3 items-baseline mt-4">
          <div className="w-[50%] bg-gray-100 rounded-t-lg h-7 "></div>
          <div className="w-[60%] h-7 ms-6 bg-gray-100 rounded-t-lg "></div>
          <div className="w-[80%] bg-gray-100 rounded-t-lg h-7 ms-6 "></div>
          <div className="w-[60%] h-7 ms-6 bg-gray-100 rounded-t-lg "></div>
          <div className="w-[60%] h-7 ms-6 bg-gray-100 rounded-t-lg "></div>
          <div className="w-[80%] bg-gray-100 rounded-t-lg h-7 ms-6 "></div>
          <div className="w-[60%] h-7 ms-6 bg-gray-100 rounded-t-lg "></div>
        </div>
      ) : (
        <>
          {" "}
          <aside className="w-full bg-white mt-3">
            <div className="grid items-center justify-around md:grid-cols-5 bg-red-50 p-3 ">
              <p className="text-sm font-semibold text-center">Doctor Name</p>
              <p className="text-sm font-semibold text-center">Patient Name</p>
              <p className="text-sm font-semibold text-center border-black">
                Mobile No
              </p>
              <p className=" text-sm font-semibold text-center ">Date & Time</p>

              <p className="text-sm font-semibold text-center border-black">
                Prescription
              </p>
            </div>
          </aside>
          <aside>
            {allprescription && allprescription.length == 0
              ? "No Appointment available in this date"
              : allprescription?.map((item, index) => {
                  return (
                    <div key={index}>
                      <PrescriptionSchedule item={item} />
                    </div>
                  );
                })}
          </aside>
          <div className="flex items-center justify-center mt-3">
            <Pagination
              total={totalCount}
              limit={20}
              activePage={pages}
              onChangePage={handlePageChange}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Prescription;
