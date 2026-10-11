"use client";
import { EndPoint, Methods } from "@/api/config";
import { useSocket } from "@/context/SocketContext";
import { apiCall } from "@/lib/axios-client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdCall, MdCallEnd } from "react-icons/md";

const CallNotification = () => {
  const { ongoingCall, answerAgoraCall, rejectCall } = useSocket();
  const audioRef = useRef<any>(null);
  const [bookPackageId, setBookPackageId] = useState("");

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  let userRole = null;
  let userID = null;

  if (typeof window !== "undefined") {
    userRole = localStorage.getItem("role");
    userID = localStorage.getItem("userID");
  }

  const playAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/Videocall/ringtone2.mp3");
    }
    audioRef.current.play();
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  const handleJoin = () => {
    if (ongoingCall) {
      console.log("When join call clear timeout-1", timeoutRef.current);
      if (timeoutRef.current) {
        console.log("When join call clear timeout-2", timeoutRef.current);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      /* Update call history */
      apiCall(
        Methods.PATCH,
        EndPoint.CALL_HISTORY_UPDATE + "/" + ongoingCall.id,
        {
          callReceived: true,
        }
      )
        .then((resp: any) => {
          console.log("history update resp", resp);
        })
        .catch((error: any) => {
          console.log("History create error", error);
        });
      /* Create Appointment */
      // const date = new Date();
      // const formattedDate = date.toISOString().split("T")[0];
      // const formattedTime = date.toLocaleTimeString("en-US", {
      //   hour: "2-digit",
      //   minute: "2-digit",
      //   hour12: true, // Ensures AM/PM format
      // });

      // const appointmentData = {
      //   date: formattedDate,
      //   time: formattedTime,
      //   fullName: ongoingCall.participants.callerName,
      //   phone: ongoingCall.participants.callerPhone,
      //   doctor: userID,
      //   user: ongoingCall.participants.caller,
      //   isForFreeCall: true,
      //   bookPackageId: bookPackageId,
      // };

      // console.log("appointmentData", appointmentData);

      // apiCall(Methods.POST, EndPoint.DOCTOR_BOOK_APPOINTMENT, appointmentData)
      //   .then((resp: any) => {
      //     console.log("Booking resp", resp);
      //   })
      //   .catch((error: any) => {
      //     console.log("Error", error);
      //   });

      // console.log("Appointment Data", appointmentData);
      /* update doctor to unavailable */
      if (userRole != undefined && userRole == "inhouse_doctor") {
        apiCall(Methods.PATCH, EndPoint.DOCTOR_UPDATE_BY_ID + "/" + userID, {
          isAvailable: false,
        })
          .then((resp: any) => {
            console.log(resp);
          })
          .catch((err: any) => {
            console.log(err);
          });
      }

      answerAgoraCall(ongoingCall);
      // if (timeoutRef.current) {
      //   clearTimeout(timeoutRef.current);
      //   timeoutRef.current = null;
      // }
      // router.push("/consultation");
    }
  };

  const handleRejectCall = () => {
    console.log("Handle end call");
    stopAudio();
    // handleHangup({
    //   ongoingCall: ongoingCall ? ongoingCall : undefined,
    //   isEmitHangup: true,
    // });
    rejectCall();
    console.log("When end call clear timeout-3", timeoutRef.current);
    // Clear the timeout when the call is ended
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // useEffect(() => {

  // }, [])

  useEffect(() => {
    console.log("Caller Id9090", ongoingCall);
    if (ongoingCall?.participants.caller) {
      apiCall(
        Methods.GET,
        EndPoint.GET_BOOK_PACKAGE_BY_UID +
          "/" +
          ongoingCall?.participants.caller
      )
        .then((resp: any) => {
          console.log("Resp22", resp);
          setBookPackageId(resp.data._id);
        })
        .catch((error: any) => {
          console.log("Eror", error);
        });
    }

    if (ongoingCall?.isRinging) {
      playAudio();
    } else {
      stopAudio();
    }

    return () => {
      stopAudio();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [ongoingCall]);

  // useEffect(() => {
  //   // if (ongoingCall) {
  //   //   timeoutRef.current = setTimeout(() => {
  //   //     handleEndCall();
  //   //   }, 30000);
  //   // }

  //   return () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //       timeoutRef.current = null;
  //     }
  //   };
  // }, [ongoingCall]);

  if (!ongoingCall?.isRinging) return null;
  console.log("Ongoing call", ongoingCall);
  return (
    <div className="fixed bg-slate-500 bg-opacity-70 w-screen h-screen top-0 left-0 flex items-center justify-center z-40">
      <div className="bg-white min-w-[400px] min-h-[100px] flex flex-col items-center justify-center rounded p-4">
        <div className="flex flex-col items-center">
          <div>
            <Image
              className="rounded-full ring-4 ring-pink-600 h-32 w-32 object-cover"
              src={
                ongoingCall.participants.callerImage &&
                ongoingCall.participants.callerImage !== "null"
                  ? ongoingCall.participants.callerImage
                  : "/Videocall/demo_user.png"
              }
              alt="Caller"
              width={150}
              height={150}
            />
          </div>
          <h3 className="mt-3">
            {ongoingCall?.participants?.callerName
              ? ongoingCall?.participants?.callerName
              : "No Name"}
          </h3>
          <p>
            {userRole != undefined &&
              userRole == "inhouse_doctor" &&
              "+" + ongoingCall?.participants?.callerPhone}
          </p>
          <p>
            {userRole != undefined &&
              userRole == "inhouse_doctor" &&
              (ongoingCall?.participants?.callerOrganization || "")}
          </p>
        </div>
        <p className="text-sm mb-2">
          Incoming {ongoingCall.isVideoCall == 1 ? "Video" : "Audio"} Call
        </p>
        <div className="flex gap-8">
          <button
            onClick={() => handleJoin()}
            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"
          >
            <MdCall size={24} />
          </button>

          <button
            onClick={() => handleRejectCall()}
            className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white"
          >
            <MdCallEnd size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallNotification;
