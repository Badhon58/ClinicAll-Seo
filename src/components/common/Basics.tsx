"use client";
import "./style.css";
const image1 =
  "bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-06012025T171435-mask-group.svg')] rounded-lg";
const image2 =
  "md:bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-23122024T172655-1440x620-web-banner-1.svg')] rounded-lg";
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
import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
  IAgoraRTCClient,
} from "agora-rtc-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatDurationTime } from "@/lib/healper";
import { useRouter } from "next/navigation";

export const Basics = ({
  channel,
  client,
}: {
  channel: string;
  client: IAgoraRTCClient;
}) => {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected(); // Store the user's connection status
  const [appId, setAppId] = useState("97418b91448646b6b7a710005d6f6e68");
  const [timer, setTimer] = useState(0);

  const {
    ongoingCall,
    socketRef,
    endCall,
    cancellCall,
    micOn,
    setMic,
    cameraOn,
    setCamera,
    //     localMicrophoneTrack,
    //     localCameraTrack,
  } = useSocket();

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  useJoin({ appid: appId, channel: channel, token: null }, calling);
  usePublish([localMicrophoneTrack, localCameraTrack]);
  const remoteUsers = useRemoteUsers();

  useEffect(() => {
    let timeout: any;
    if (remoteUsers.length > 0) {
      timeout = setTimeout(() => {
        console.log("Timer Value:", timer);
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [timer, remoteUsers]);

  const onToggleCamera = () => {
    setCamera((a) => !a);
    socketRef.current.emit("kernel-status-change", {
      targetedId: ongoingCall?.participants.caller,
      isCameraOff: !cameraOn,
      isMute: !micOn,
      isFrontCameraSelected: true,
      id: ongoingCall?.id,
    });
  };

  const onToggleMic = () => {
    setMic((a) => !a);
    socketRef.current.emit("kernel-status-change", {
      targetedId: ongoingCall?.participants.caller,
      isCameraOff: !cameraOn,
      isMute: !micOn,
      isFrontCameraSelected: true,
      id: ongoingCall?.id,
    });
  };

  //   const goFullScreen = () => {
  //       if (remoteVideoRef.current) {
  //         if (remoteVideoRef.current.requestFullscreen) {
  //           remoteVideoRef.current.requestFullscreen();
  //         } else if ((remoteVideoRef.current as any).webkitRequestFullscreen) {
  //           (remoteVideoRef.current as any).webkitRequestFullscreen(); // Safari
  //         } else if ((remoteVideoRef.current as any).mozRequestFullScreen) {
  //           (remoteVideoRef.current as any).mozRequestFullScreen(); // Firefox
  //         } else if ((remoteVideoRef.current as any).msRequestFullscreen) {
  //           (remoteVideoRef.current as any).msRequestFullscreen(); // IE/Edge
  //         }
  //       }
  //     };

  const onEndCall = async () => {
    // console.log("Invoking End Callllaaaaaaaaaaaaallllllllllll");
    setCalling(false);
    if (remoteUsers.length > 0) {
      endCall();
    } else {
      cancellCall();
    }
    // console.log("Local Camera Track", localCameraTrack);
    if (localCameraTrack) {
      localCameraTrack.stop(); // turns off webcam light
      localCameraTrack.close(); // releases camera resource
    }

    if (localMicrophoneTrack) {
      localMicrophoneTrack.stop(); // turns off mic
      localMicrophoneTrack.close(); // releases mic
    }
    setCamera(false);
    // await client.unpublish([localMicrophoneTrack, localCameraTrack]);
    client.leave();
    location.replace("/doctoraccount/myappointment");
    // router.push("/doctoraccount/myappointment");
  };

  useEffect(() => {
    console.log("ongoingCall", ongoingCall);
    setMic(micOn);
    if (ongoingCall?.isVideoCall == 1) {
      setCamera(cameraOn);
    } else {
      setCamera(false);
    }
    // setCamera(cameraOn);
    setCalling(true);
  }, [channel, setMic, setCamera]);

  useEffect(() => {
    if (!ongoingCall) {
      onEndCall();
    }
  }, [ongoingCall]);

  // console.log("Remote Users", remoteUsers);
  // console.log("Timer Value: ", timer);
  return (
    <>
      <div>
        {isConnected ? (
          <div className=" xl:container xl:mx-auto pt-3 lg:pt-5 2xl:pt-8 px-2 lg:px-8 2xl:px-0  gap-7">
            <section className="bg-[#FFF4F4] rounded-md">
              <div className="bg-white rounded-md relative">
                <div className="absolute top-0 w-full min-h-[90vh] max-h-[95vh] bg-cover bg-center backdrop-blur-md "></div>
                <div className={`videocallstyle ${image2} ${image1} `}>
                  {remoteUsers.length > 0 ? (
                    remoteUsers.map((user) => (
                      <div key={user.uid}>
                        <RemoteUser
                          className="max-w-xs min-h-[50vh] mx-auto"
                          user={user}
                          style={{
                            height: "90vh",
                          }}
                        >
                          <samp>{formatDurationTime(timer)}</samp>
                        </RemoteUser>
                      </div>
                    ))
                  ) : (
                    <div>
                      <h2 className="text-4xl font-bold z-50">Calling...</h2>
                    </div>
                  )}
                </div>
                <div className="z-20 absolute bottom-20 lg:bottom-2 right-2 w-[213px] h-[141px] rounded-md">
                  <LocalUser
                    className="w-[200px] h-auto absolute bottom-4 right-4 rounded-lg overflow-hidden"
                    audioTrack={localMicrophoneTrack}
                    cameraOn={cameraOn}
                    micOn={micOn}
                    playAudio={false} // Plays the local user's audio track. You use this to test your microphone before joining a channel.
                    videoTrack={localCameraTrack}
                    //   style={{ width: "30%", height: 300 }}
                  >
                    {/* <samp>You</samp> */}
                  </LocalUser>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2  w-full flex justify-center space-x-4 z-10">
                  <button
                    onClick={() => {}}
                    className="px-3 py-2 lg:px-4 lg:py-3 bg-white rounded-full"
                  >
                    <MdFullscreen className="lg:text-2xl text-lg" />
                  </button>
                  <button
                    onClick={() => onToggleMic()}
                    className="px-3 py-2 lg:px-4 lg:py-3 bg-white rounded-full"
                  >
                    {micOn ? (
                      <FaMicrophone className="lg:text-2xl text-lg" />
                    ) : (
                      <FaMicrophoneSlash className="lg:text-2xl text-lg" />
                    )}
                  </button>
                  <button
                    onClick={() => onEndCall()}
                    className="px-3 py-2 lg:px-4 lg:py-3 bg-[#E51515] rounded-xl"
                  >
                    <MdCallEnd
                      className="lg:text-2xl text-xl text-white"
                      size={32}
                    />
                  </button>
                  <button
                    onClick={() => onToggleCamera()}
                    className="px-3 py-2 lg:px-4 lg:py-3 bg-white rounded-full"
                  >
                    {cameraOn ? (
                      <FaVideo className="lg:text-2xl text-lg " />
                    ) : (
                      <FaVideoSlash className="lg:text-2xl text-lg " />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      // console.log("Ongoing ", ongoingCall);
                    }}
                    className="px-3 py-2 lg:px-4 lg:py-3 bg-white rounded-full"
                  >
                    <IoMdSettings className="lg:text-2xl text-lg" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div>Connecting...</div>
        )}
      </div>
    </>
  );
};
