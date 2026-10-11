"use client";
import { useEffect, useRef } from "react";

interface IVideoContainer {
  stream: MediaStream | null;
  isLocalStream: boolean;
  isOnCall: boolean;
}

const VideoContainer = ({
  stream,
  isLocalStream,
  isOnCall,
}: IVideoContainer) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  // console.log("IS ON CALL", isOnCall);
  return (
    <video
      className={` ${
        isLocalStream
          ? "w-[200px] h-auto absolute border-rose-500 border-2 z-20"
          : "rounded border w-[800px] h-[350px]"
      } mirror`}
      ref={videoRef}
      autoPlay
      playsInline
      muted={isOnCall}
    ></video>
  );
};

export default VideoContainer;
