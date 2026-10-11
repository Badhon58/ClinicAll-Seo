"use client";
import { getDoctorId } from "@/lib/authHandler";
import React, { useEffect, useState } from "react";
import { Appointment } from "./interface";
import ScheduleList from "./ScheduleList";
import AddNewAppoitment from "./AddNewAppoitment";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, FormDataHeader, Methods } from "@/api/config";
import PageLoading from "../Seo/PageLoading";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/navigation";
import { DateRangePicker, Pagination, Toggle } from "rsuite";
import ToggleButton from "./ToggleButton";
import { FiExternalLink } from "react-icons/fi";
import moment from "moment";
import NotFound from "./NotFound";
import Loading from "@/app/loading";

const MyAppoitments = () => {
  const [upCommingAppoitments, setUpCommingAppoitments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [appointmentLoading, setAppointmentLoading] = useState(false)
  const { onlineUsers, makeCall } = useSocket();
  const router = useRouter();
  const [Checked, setIsChecked] = useState<boolean>(false);
  const [doctorId, setDoctorId] = useState<any>();
  const [doctorinfo, setDoctorinfo] = useState<any>();
  const [activePage, setActivePage] = React.useState(1);
  const [totalPage, setTotalPage] = useState(1)
  const [dateRange, setDateRange] = useState<[Date, Date] | null>([
    new Date(),
    new Date(),
  ]);

  const init = async () => {
    try {
      setLoading(true);
      const doc_Id = await getDoctorId();
      setDoctorId(doc_Id);
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.DOCTOR_UPCOMING_SCHEDULE_V2}/${doc_Id}?page=1
                &startDate=${moment().format("YYYY-MM-DD")}
                &endDate=${moment().format("YYYY-MM-DD")}`
      );
      // console.log(response);

      setUpCommingAppoitments(response.data.data);
      setTotalPage(response.data.total);

      const { data }: any = await apiCall(
        Methods.GET,
        `${EndPoint.DOCTOR_FIND_BY_ID}/${doc_Id}`
      );
      setIsChecked(data.isAvailable);
      setDoctorinfo(data);
      // setUpCommingAppoitments(sortedAppointments);
      // console.log("ONLINE USERS", onlineUsers);
      // console.log("Sorted Appointments", sortedAppointments);
      // set online
      // const updatedValue = sortedAppointments?.map((appointment: any) => {
      //   console.log("single appointment", appointment);
      //   const onlineUser = onlineUsers?.find(
      //     (user) => user.userId === appointment.user._id
      //   );
      //   console.log("UUUU", onlineUser);
      //   const isOnline = onlineUser ? true : false;
      //   const socketId = onlineUser ? onlineUser.socketId : null;
      //   return {
      //     ...appointment,
      //     isOnline,
      //     socketId,
      //   };
      // });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault()
      setAppointmentLoading(true)
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
        `${EndPoint.DOCTOR_UPCOMING_SCHEDULE_V2}/${doctorId}?${searchQuery.toString()}`
      );
      // console.log(response);

      setUpCommingAppoitments(response.data.data);
      setTotalPage(response.data.total);

    } catch (error) {
      console.log(error);
    } finally {
      setAppointmentLoading(false)
    }
  }

  const fetchAppoitment = async (page: number, range?: [Date, Date] | any) => {
    setAppointmentLoading(true);

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
        `${EndPoint.DOCTOR_UPCOMING_SCHEDULE_V2}/${doctorId}?${searchQuery.toString()}`
      );

      if (response.success) {
        setUpCommingAppoitments(response.data.data);
        setTotalPage(response.data.total);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAppointmentLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, [onlineUsers]);
  // useEffect(() => {
  //   init();
  // }, []);

  const handleMakeCall = (onlineUser: any, fcm_token?: any) => {
    // console.log("TTTT", onlineUser, fcm_token);
    makeCall(onlineUser, fcm_token);
    router.push("/consultation");
  };
  // Again Call to appoitment

  // console.log("Upcomming Appointments", upCommingAppoitments);
  return loading ? (
    <PageLoading />
  ) : (
    <section className="xl:container xl:mx-auto min-h-[80vh] shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] px-2.5 md:px-5 py-2 ">
      <div className="flex justify-between items-center">
        <p className="lg:mb-4 text-base lg:text-xl font-semibold 2xl:text-2xl">
          Upcomming Appointments
        </p>
        <ToggleButton
          data={doctorinfo?.role}
          doctorId={doctorId}
          Checked={Checked}
        />
      </div>
      <div className="flex items-center justify-between space-x-2 py-2">
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
        <AddNewAppoitment onAppointmentAdded={init} />
      </div>
      {appointmentLoading ? <Loading /> : upCommingAppoitments && upCommingAppoitments.length > 0 ? (
        <>
          {/* lgDevice */}
          <div className="mt-2 hidden md:block">
            <aside className="w-full bg-white">
              <div className="grid items-center justify-around md:grid-cols-6 bg-red-50 ">
                <p className="py-2 text-sm font-semibold text-center">
                  Patient Name
                </p>
                <p className="py-2 ml-3 text-sm font-semibold text-center 2xl:ml-7">
                  Mobile No
                </p>
                <p className="py-2 text-sm font-semibold text-center ">
                  Date & Time
                </p>

                <p className="py-2 text-sm font-semibold text-center ">
                  Write Prescription
                </p>
                <p className="py-2 text-sm font-semibold text-center">Status</p>
                <p className="py-2 text-sm font-semibold text-center">Call</p>
              </div>
            </aside>
            {upCommingAppoitments?.map((item, index) => {
              // if (item.paymentStatus === "pending") {
              //   return null;
              // }
              return (
                <aside key={index} className={``}>
                  <ScheduleList data={item} handleMakeCall={handleMakeCall} />
                </aside>
              );
            })}
          </div>
          {/* smDevice */}
          <div className="md:hidden  block">
            {upCommingAppoitments?.map((item, index) => {
              if (item.paymentStatus === "pending") {
                return null;
              }
              return (
                <div
                  className=" grid grid-cols-3 border-b border-black py-2 "
                  key={index}
                >
                  <aside className="col-span-1 grid grid-rows-6 bg-[#FFF4F4]">
                    <p className="py-3 text-xs flex items-center justify-center font-medium  text-[#16020B] border-t">
                      Patient Name
                    </p>
                    <p className="py-3 text-xs font-medium flex items-center justify-center  2xl:ml-7 text-[#16020B] border-y">
                      Mobile No
                    </p>
                    <p className="py-2 text-xs font-medium flex items-center justify-center text-[#16020B] ">
                      Date & Time
                    </p>
                    <p className="py-2 text-xs font-medium flex items-center justify-center text-[#16020B] border-y">
                      Prescription
                    </p>
                    <p className="py-2 text-xs font-medium flex items-center justify-center text-[#16020B] border-b">
                      STATUS
                    </p>
                    <p className="py-2 text-xs font-medium flex items-center justify-center text-[#16020B]">
                      Call
                    </p>
                  </aside>
                  <aside
                    className={`col-span-2 ${index % 2 == 0 ? "" : "bg-gray-50"
                      }`}
                  >
                    <ScheduleList data={item} handleMakeCall={handleMakeCall} />
                  </aside>
                </div>
              );
            })}
          </div>
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

export default MyAppoitments;
