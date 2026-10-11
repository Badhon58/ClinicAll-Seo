"use client";
import { EndPoint, Methods } from "@/api/config";
import { useSocket } from "@/context/SocketContext";
import { apiCall } from "@/lib/axios-client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { MdCall, MdCallEnd } from "react-icons/md";

const CallWaiting = () => {
  const waitingAudioRef = useRef<any>(null);
  const searchParams = useSearchParams();
  const timeOutRef = useRef<any>(null);
  const router = useRouter();
  const {
    makeMicroAgoraCall,
    availableDrInfo,
    setAvailableDrInfo,
    addToQueue,
    removeFromQueue,
  } = useSocket();

  const callId = searchParams.get("callId");
  const userId = searchParams.get("userId");
  const isVideo = searchParams.get("isVideo");

  // console.log("callId", callId, userId, isVideo);

  const playWaitingAudio = () => {
    if (!waitingAudioRef.current) {
      waitingAudioRef.current = new Audio("/Videocall/waiting.mp3");
      waitingAudioRef.current.loop = true;
    }

    const audio = waitingAudioRef.current;
    audio.currentTime = 0;
    audio.play();

    timeOutRef.current = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      router.replace("/microsite");
    }, 30000);
  };

  const stopWaitingAudio = () => {
    if (waitingAudioRef.current) {
      waitingAudioRef.current.pause();
      waitingAudioRef.current.currentTime = 0;
      waitingAudioRef.current = null;
    }
  };
  const onCallEnd = () => {
    router.replace("/microsite");
  };
  useEffect(() => {
    addToQueue(userId);
    playWaitingAudio();

    return () => {
      stopWaitingAudio();
      removeFromQueue(userId);
    };
  }, []);

  useEffect(() => {
    // console.log("Dr Info: ", availableDrInfo);
    if (availableDrInfo) {
      apiCall(Methods.PATCH, EndPoint.CALL_HISTORY_UPDATE + "/" + callId, {
        doctor: availableDrInfo._id,
        // user: userId,
      }).then((resp) => {
        if (resp.success) {
          console.log("Drrrrrrrrrrrrrrrr", availableDrInfo);
          // setAvailableDrInfo(availableDrInfo);
          Promise
            .resolve
            // makeMicroAgoraCall(
            //   availableDrInfo._id,
            //   resp.data._id,
            //   isVideo == "true" ? true : false
            // )
            ()
            .then((resp) => {
              console.log("ress", resp);
              if (timeOutRef.current) {
                clearTimeout(timeOutRef.current);
                timeOutRef.current = null;
              }
              if (waitingAudioRef.current) {
                waitingAudioRef.current.pause();
                waitingAudioRef.current.currentTime = 0;
              }
              router.push(
                `/microsite/consultation?channel=${resp}&isVideo=${isVideo}`
              );
            });
        } else {
          return;
        }
      });
    }

    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
        timeOutRef.current = null;
      }
      if (waitingAudioRef.current) {
        waitingAudioRef.current.pause();
        waitingAudioRef.current.currentTime = 0;
      }
      // setAvailableDrInfo(null);
    };
  }, [availableDrInfo]);

  return (
    <section className="min-h-[85vh] flex flex-col justify-around items-center w-full bg-pink-500 bg-opacity-10">
      <p className="text-lg font-medium">Waiting....</p>
      <div className="relative">
        <Image
          src={"/MediServices/Doctor.svg"}
          alt="Doctor Image"
          width={400}
          height={400}
          className="size-32 relative"
        />
        <span className="absolute top-0 -z-10 size-32 rounded-full bg-pink-400 opacity-75 animate-[ping_2s_ease-in-out_infinite]"></span>
      </div>
      <button
        onClick={onCallEnd}
        className="px-14 rounded-md py-2 bg-[#E51515] text-white text-base"
      >
        End Call
      </button>
    </section>
  );
};

export default CallWaiting;
