"use client";
import { EndPoint, Methods } from "@/api/config";
import { useSocket } from "@/context/SocketContext";
import {
  doctorIsAuthenticate,
  doctorSignout,
  getDoctorId,
} from "@/lib/authHandler";
import { apiCall } from "@/lib/axios-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar } from "rsuite";

interface doctorInfo {
  firstName?: string;
  image?: string;
  bmdc?: string;
  email?: string;
  lastName?: string;
  bmdcRegistered?: boolean;
  role: string;
}

const DocLeftSidebar = () => {
  const { handleSocketLogout } = useSocket();
  const router = useRouter();
  const [doctorInfo, setdoctorInfo] = useState<doctorInfo>({
    firstName: "",
    lastName: "",
    image: "",
    bmdc: "",
    email: "",
    bmdcRegistered: false,
    role: "",
  });

  const init = async () => {
    const doc_Id = await getDoctorId();
    const userAuthentication = await doctorIsAuthenticate();
    if (doc_Id && userAuthentication) {
      const { data } = await apiCall(
        Methods.GET,
        `${EndPoint.DOCTOR_FIND_BY_ID}/${doc_Id}`
      );
      setdoctorInfo(data);
    } else {
      router.push("/Auth/docLogin");
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user_id = localStorage.getItem("userID");
    if (user_id) {
      handleSocketLogout(user_id);
    }
    await doctorSignout()
      .then(() => {
        router.push("/Auth/docLogin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div className="px-2 sticky lg:top-16 2xl:top-32 flex-col rounded-lg lg:min-h-[80vh] shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)]">
      {/* Profile  */}
      <div className="flex items-center px-3 py-3 space-x-4 ">
        <Avatar
          src={
            doctorInfo?.image
              ? `${doctorInfo?.image}`
              : "/other/userprofile.svg"
          }
          circle
          size="md"
        />
        <div>
          <p>
            {doctorInfo?.firstName} {doctorInfo?.lastName}
          </p>
          <p className="lg:text-xs 2xl:text-sm text-gray-600">
            {doctorInfo?.bmdcRegistered
              ? `BMDC No: ${doctorInfo?.bmdc}`
              : `Email : ${doctorInfo?.email}`}
          </p>
        </div>
      </div>
      <div className="flex flex-col ">
        <Link href={"/doctoraccount"} className="px-3 py-3 border-y ">
          My Profile{" "}
        </Link>
        <Link
          href={"/doctoraccount/myappointment"}
          className="px-3 py-3 border-b "
        >
          My Appointments
        </Link>
        <Link
          href={"/doctoraccount/appoitmentshistory"}
          className="px-3 py-3 border-b "
        >
          Appointment History
        </Link>
        <Link
          href={"/doctoraccount/callhistory"}
          className="px-3 py-3 border-b "
        >
          Call History
        </Link>
        <Link
          href={"/doctoraccount/visitingHours"}
          className="px-3 py-3 border-b "
        >
          Visiting Hours
        </Link>
        {doctorInfo?.role === "inhouse_doctor" && (
          <Link
            href={"/doctoraccount/callList"}
            className="px-3 py-3 border-b "
          >
            All Doctor Call History
          </Link>
        )}
        {doctorInfo?.role === "inhouse_doctor" && (
          <Link
            href={"/doctoraccount/prescription"}
            className="px-3 py-3 border-b "
          >
            All Prescription
          </Link>
        )}
        {doctorInfo?.role === "inhouse_doctor" && (
          <Link
            href={"/doctoraccount/gdiplane"}
            className="px-3 py-3 border-b "
          >
            Green Delta IPanel
          </Link>
        )}
        {doctorInfo?.role === "inhouse_doctor" && (
          <Link
            href={"/doctoraccount/gears"}
            className="px-3 py-3 border-b "
          >
           Gears IPanel
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="flex justify-start px-3 py-3 border-b"
        >
          Log Out{" "}
        </button>
      </div>
    </div>
  );
};

export default DocLeftSidebar;
