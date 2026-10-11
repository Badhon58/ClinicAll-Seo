"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { useSearchParams } from "next/navigation";
// import ListOnlineUser from "../common/ListOnlineUser";
import CallNotification from "../common/CallNotification";

const VideoCall = () => {
  const [peer, setPeer] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [stream, setStream] = useState<any>(null);
  const userVideo = useRef<any>(null);
  const partnerVideo = useRef<any>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const userId: any = searchParams.get("user");
    setUserId(userId);

    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((localStream: any) => {
    //     setStream(localStream);
    //     if (userVideo.current) {
    //       userVideo.current.srcObject = localStream;
    //     }
    //   })
    //   .catch((err) => console.error("Error getting media stream", err));

    // const peerInstance: any = new Peer({
    //   host: "http://192.168.10.234:6000",
    //   port: 9000,
    //   path: "/peerjs",
    // });
    // peerInstance.on("open", (id: any) => {
    //   console.log("My peer ID:", id);
    // });
    // peerInstance.on("make-call", (call: any) => {
    //   call.answer(stream);
    //   call.on("stream", (remoteStream: any) => {
    //     if (partnerVideo.current) {
    //       partnerVideo.current.srcObject = remoteStream;
    //     }
    //   });
    // });

    // setPeer(peerInstance);
    // return () => peerInstance.destroy();
  }, []);

  // const startCall = (peerId: string) => {
  //   console.log("peerId", peerId);
  //   if (peer && stream) {
  //     const call = peer.call(peerId, stream);
  //     call.on("stream", (remoteStream: any) => {
  //       if (partnerVideo.current) {
  //         partnerVideo.current.srcObject = remoteStream;
  //       }
  //     });
  //   } else {
  //     console.error("Peer or stream is not available");
  //   }
  // };

  return (
    <section className="min-h-[70vh] xl:container xl:mx-auto mt-3 lg:mt-5 xl:mt-7  bg-[#FFF4F4] p-5 rounded-lg">
      {/* <main className="flex justify-between min-h-full "> */}
      <div className="flex justify-around">
        <div>
          <div className="flex items-center space-x-2">
            <Image
              src={"/Videocall/people.svg"}
              alt="Invite people image"
              width={20}
              height={20}
            />
            <p className="text-base font-normal text-[#798998]">
              Available Users
            </p>
            <span className="px-2 py-1.5 bg-[#BCC1CB] text-white rounded-lg font-medium">
              02
            </span>
          </div>
        </div>
        <div>
          {/* <video
            className="rounded"
            ref={userVideo}
            autoPlay
            muted
            style={{ width: "800px", height: "300px" }}
          /> */}
          {/* <video ref={partnerVideo} autoPlay style={{ width: "200px" }} /> */}
        </div>
      </div>

      {/* <button className="flex items-center space-x-2 px-4 py-1.5 rounded-md bg-[#BCC1CB] text-white font-medium text-sm ">
          <Image
            src={"/Videocall/AddButton.svg"}
            alt="Invite people image"
            width={20}
            height={20}
            className="font-medium"
          />
          <span>Add test image</span>
        </button> */}
      {/* </main> */}
    </section>
  );
};

export default VideoCall;
