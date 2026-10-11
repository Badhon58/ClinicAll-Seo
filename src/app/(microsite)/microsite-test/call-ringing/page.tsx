"use client";

import { EndPoint, Methods } from "@/api/config";
import { useSocket } from "@/context/SocketContext";
import { apiCall } from "@/lib/axios-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdCall, MdCallEnd } from "react-icons/md";

const CallRinging = () => {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId") || "";
  const userId = searchParams.get("userId") || "";
  const [ringing, setRinging] = useState("Calling...");
  const {
    ongoingCall,
    makeMicroAgoraCall,
    cancellCall,
    isRinging,
    isAnswered,
    isRejected,
    isEnded,
  } = useSocket();
  console.log("doctorId", doctorId);
  const ringingAudioRef = useRef<any>(null);
  const router = useRouter();

  const playRingingAudio = () => {
    if (!ringingAudioRef.current) {
      ringingAudioRef.current = new Audio("/Videocall/dial-tone.mp3");
      ringingAudioRef.current.loop = true;
    }
    const audio = ringingAudioRef.current;
    audio.currentTime = 0;
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      onCallEnd();
      router.replace("/microsite");
    }, 30000);
  };

  const stopRingingAudio = () => {
    if (ringingAudioRef.current) {
      ringingAudioRef.current.pause();
      ringingAudioRef.current.currentTime = 0;
      ringingAudioRef.current = null;
    }
  };

  const onCallEnd = () => {
    console.log("before cancell", ongoingCall);
    cancellCall();
    router.replace("/microsite");
  };
  useEffect(() => {
    // console.log("wwee", user);
    apiCall(Methods.POST, EndPoint.CALL_HISTORY_CREATE, {
      doctor: doctorId,
      user: userId,
    }).then((resp) => {
      if (resp.success) {
        // makeMicroAgoraCall(doctorId, resp.data._id);
        playRingingAudio();
      } else {
        return;
      }
    });

    return () => {
      stopRingingAudio();
    };
  }, []);

  useEffect(() => {
    if (isRinging) {
      setRinging("Ringing...");
    }
  }, [isRinging]);
  useEffect(() => {
    if (isAnswered) {
      router.push(`/consultation?channel=${ongoingCall?.agoraChannel}`);
    }
  }, [isAnswered]);

  useEffect(() => {
    if (isRejected || isEnded) {
      onCallEnd();
    }
  }, [isRejected, isEnded]);

  return (
    <div className="flex flex-col justify-evenly items-center h-[200px] shadow-md bg-red-100 rounded-md m-10">
      <div className="flex flex-col">
        <MdCall size={50} className="text-green-600" />
        <p>{ringing}</p>
      </div>
      <button
        className="bg-white px-4 py-2 rounded-md shadow-md"
        onClick={onCallEnd}
      >
        <MdCallEnd size={30} className="text-red-600" />
      </button>
    </div>
  );
};

export default CallRinging;
