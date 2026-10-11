import React from "react";
import "./style.css";
import Image from "next/image";
import { MdCallEnd, MdEmojiEmotions, MdFullscreen } from "react-icons/md";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaUser,
  FaUserDoctor,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa6";
import { IoMdSend, IoMdSettings } from "react-icons/io";
import { useSocket } from "@/context/SocketContext";
import VideoContainer from "./VideoContainer";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
const image1 =
  "bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-06012025T171435-mask-group.svg')] rounded-lg";
const image2 =
  "md:bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-23122024T172655-1440x620-web-banner-1.svg')] rounded-lg";

const message = [
  {
    user1: true,
    user2: false,
    text: "BadhonBiswaskjshdlasdhlahdlaksh dlkashdlashdlasdklhsaldjasdlsjksjhkaakhdlkashdlasdklashdlkashdalksdhalhdlahsdlha",
    user1icon: <FaUser size={20} />,
    user2icon2: <FaUserDoctor size={20} />,
  },
  {
    user1: false,
    user2: false,
    text: "Badhon Biswas",
    user1icon: <FaUser size={20} />,
    user2icon2: <FaUserDoctor size={20} />,
  },
  {
    user1: true,
    user2: false,
    text: "Badhon Biswas",
    user1icon: <FaUser size={20} />,
    user2icon2: <FaUserDoctor size={20} />,
  },
  {
    user1: true,
    user2: false,
    text: "BadhonBiswaskjshdlasdhlahdlaksh dlkashdlashdlasdklhsaldjasdlsjksjhkaakhdlkashdlasdklashdlkashdalksdhalhdlahsdlha",
    user1icon: <FaUser size={20} />,
    user2icon2: <FaUserDoctor size={20} />,
  },
  {
    user1: false,
    user2: false,
    text: "Badhon Biswas",
    user1icon: <FaUser size={20} />,
    user2icon2: <FaUserDoctor size={20} />,
  },
  {
    user1: true,
    user2: false,
    text: "Badhon Biswas",
    user1icon: <FaUser size={20} />,
    user2icon2: <FaUserDoctor size={20} />,
  },
  {
    user1: true,
    user2: false,
    text: "BadhonBiswaskjshdlasdhlahdlaksh dlkashdlashdlasdklhsaldjasdlsjksjhkaakhdlkashdlasdklashdlkashdalksdhalhdlahsdlha",
    user1icon: <FaUser size={20} />,
    user2icon2: <FaUserDoctor size={20} />,
  },
  {
    user1: false,
    user2: false,
    text: "Badhon Biswas",
    user1icon: <FaUser size={20} />,
    user2icon2: <FaUserDoctor size={20} />,
  },
  {
    user1: true,
    user2: false,
    text: "Badhon Biswas",
    user1icon: <FaUser size={20} />,
    user2icon2: <FaUserDoctor size={20} />,
  },
  {
    user1: true,
    user2: false,
    text: "BadhonBiswaskjshdlasdhlahdlaksh dlkashdlashdlasdklhsaldjasdlsjksjhkaakhdlkashdlasdklashdlkashdalksdhalhdlahsdlha",
    user1icon: <FaUser size={20} />,
    user2icon2: <FaUserDoctor size={20} />,
  },
  {
    user1: false,
    user2: false,
    text: "Badhon Biswas",
    user1icon: <FaUser size={20} />,
    user2icon2: <FaUserDoctor size={20} />,
  },
  {
    user1: true,
    user2: false,
    text: "Badhon Biswas",
    user1icon: <FaUser size={20} />,
    user2icon2: <FaUserDoctor size={20} />,
  },
];

const VideoCall = () => {
  const {
    socketRef,
    userVideoRef,
    remoteVideoRef,
    localStream,
    remoteStream,
    // peer,
    // peerConnection,
    isCallEnded,
    ongoingCall,
    makeCall,
    answerCall,
    endCall,
    // handleHangup,
    isCallActive,
    isCaller,
    incomingCall,
  } = useSocket();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVidOn, setIsVidOn] = useState(true);

  useEffect(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      setIsVidOn(videoTrack.enabled);

      const audioTrack = localStream.getAudioTracks()[0];
      setIsMicOn(audioTrack.enabled);
    }
  }, [localStream]);

  //   Toggle Camera
  const toggleCamera = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVidOn(videoTrack.enabled);

      const audioTrack = localStream.getAudioTracks()[0];
      // audioTrack.enabled = !audioTrack.enabled;

      socketRef.current.emit("kernel-status-change", {
        targetedId: ongoingCall?.participants.caller,
        isCameraOff: !videoTrack.enabled,
        isMute: !audioTrack.enabled,
        isFrontCameraSelected: true,
        id: ongoingCall?.id,
      });
    }
  }, [localStream]);

  //   Toggle Mic
  const toggleMic = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);

      const videoTrack = localStream.getVideoTracks()[0];
      // videoTrack.enabled = !videoTrack.enabled;

      socketRef.current.emit("kernel-status-change", {
        targetedId: ongoingCall?.participants.caller,
        isCameraOff: !videoTrack.enabled,
        isMute: !audioTrack.enabled,
        isFrontCameraSelected: true,
        id: ongoingCall?.id,
      });
    }
  }, [localStream]);

  const goFullScreen = () => {
    if (remoteVideoRef.current) {
      if (remoteVideoRef.current.requestFullscreen) {
        remoteVideoRef.current.requestFullscreen();
      } else if ((remoteVideoRef.current as any).webkitRequestFullscreen) {
        (remoteVideoRef.current as any).webkitRequestFullscreen(); // Safari
      } else if ((remoteVideoRef.current as any).mozRequestFullScreen) {
        (remoteVideoRef.current as any).mozRequestFullScreen(); // Firefox
      } else if ((remoteVideoRef.current as any).msRequestFullscreen) {
        (remoteVideoRef.current as any).msRequestFullscreen(); // IE/Edge
      }
    }
  };

  const handleHangUp = () => {
    const userRole = localStorage.getItem("role");
    const userID = localStorage.getItem("userID");
    if (userRole != undefined && userRole == "inhouse_doctor") {
      apiCall(Methods.PATCH, EndPoint.DOCTOR_UPDATE_BY_ID + "/" + userID, {
        isAvailable: true,
      })
        .then((resp: any) => {
          console.log(resp);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    endCall();
  };
  // const locvideoRef = useRef<HTMLVideoElement>(null);
  // const rmtvideoRef = useRef<HTMLVideoElement>(null);

  // useEffect(() => {
  //   if (locvideoRef.current && localStream) {
  //     locvideoRef.current.srcObject = localStream;
  //   }

  //   if (rmtvideoRef.current && remoteStream) {
  //     rmtvideoRef.current.srcObject = remoteStream;
  //   }
  // }, [localStream, remoteStream]);

  // const isOnCall = ongoingCall && remoteStream ? true : false;
  // const isOnCall = true;
  if (isCallEnded) {
    return <div className="mt-5 text-rose-500 text-center"> Call Ended</div>;
  }

  return (
    <div className=" xl:container xl:mx-auto pt-3 lg:pt-5 2xl:pt-8 px-2 lg:px-8 2xl:px-0  gap-7">
      <section className="bg-[#FFF4F4] rounded-md">
        <div className="bg-white rounded-md relative">
          <div className="absolute top-0 min-h-[50vh] w-full lg:min-h-[75vh] bg-cover bg-center backdrop-blur-md "></div>
          <div className={` videocallstyle ${image2} ${image1} `}>
            <video
              className="rounded w-full min-h-[50vh] lg:min-h-[75vh] mirror z-0 "
              ref={remoteVideoRef}
              autoPlay
              playsInline
              muted={false}
            />
          </div>
          <div className=" z-20 absolute bottom-20 lg:bottom-2 right-2 w-[213px] h-[141px] rounded-md">
            <video
              className={`${
                remoteVideoRef.current
                  ? " w-[200px] h-auto"
                  : "w-[800px] h-[350px]"
              } absolute bottom-4 right-4 rounded-lg overflow-hidden mirror`}
              ref={userVideoRef}
              autoPlay
              playsInline
              muted={true}
            />
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2  w-full flex justify-center space-x-4 z-10">
            <button
              onClick={goFullScreen}
              className="px-3 py-2 lg:px-4 lg:py-3 bg-white rounded-full"
            >
              <MdFullscreen className="lg:text-2xl text-lg" />
            </button>
            <button
              onClick={toggleMic}
              className="px-3 py-2 lg:px-4 lg:py-3 bg-white rounded-full"
            >
              {isMicOn ? (
                <FaMicrophone className="lg:text-2xl text-lg" />
              ) : (
                <FaMicrophoneSlash className="lg:text-2xl text-lg" />
              )}
            </button>
            <button
              onClick={() => handleHangUp()}
              className="px-3 py-2 lg:px-4 lg:py-3 bg-[#E51515] rounded-xl"
            >
              <MdCallEnd className="lg:text-2xl text-xl text-white" size={32} />
            </button>
            <button
              onClick={toggleCamera}
              className="px-3 py-2 lg:px-4 lg:py-3 bg-white rounded-full"
            >
              {isVidOn ? (
                <FaVideo className="lg:text-2xl text-lg " />
              ) : (
                <FaVideoSlash className="lg:text-2xl text-lg " />
              )}
            </button>
            <button
              onClick={() => {
                console.log("Ongoing ", ongoingCall);
              }}
              className="px-3 py-2 lg:px-4 lg:py-3 bg-white rounded-full"
            >
              <IoMdSettings className="lg:text-2xl text-lg" />
            </button>
          </div>
        </div>
      </section>
      {/* <section className="flex-1 bg-[#FFF4F4] rounded-md min-h-[80vh] max-h-[71vh] flex flex-col gap-4 min-w-[290px] lg:min-w-[300px]  relative">
        <div className="flex flex-col gap-2 overflow-y-auto p-3 mb-12">
          {message.map((item, index) => {
            return (
              <div key={index} className="w-full ">
                {item.user1 ? (
                  <div className="flex justify-start items-start space-x-3 ">
                    <p className="p-2 rounded-full bg-white">
                      {item.user1icon}
                    </p>
                    <span className="p-3 bg-white rounded-md flex break-all">
                      {item.text}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-end items-center space-x-3">
                    <span className=" p-3 bg-white rounded-md break-all">
                      {item.text}
                    </span>
                    <p className="p-2 rounded-full bg-white">
                      {item.user2icon2}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-0 w-full  border flex items-center bg-white rounded-sm">
          <button className="pl-1.5">
            <MdEmojiEmotions size={24} className="text-[#798998]" />
          </button>
          <div className="bg-white rounded-sm flex items-center w-full">
            <input
              type="text"
              className=" w-full outline-none py-2 px-1"
              placeholder="Text Here"
            />
            <button className="bg-[#BCC1CB] py-2 px-2 ">
              <IoMdSend size={24} className="text-white" />
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default VideoCall;
