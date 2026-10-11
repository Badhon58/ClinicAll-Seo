"use client";
import { useEffect, useState } from "react";
import { Button } from "rsuite";

const RingToneConcent = () => {
  const [isAudioAllowed, setIsAudioAllowed] = useState(false);

  useEffect(() => {
    window.addEventListener("click", () => enableAudio());
    window.addEventListener("keydown", () => enableAudio());
    //     window.addEventListener("mousemove", () => enableAudio());
    window.addEventListener("touchstart", () => enableAudio());
  }, []);

  const enableAudio = () => {
    setIsAudioAllowed(true);
  };
  if (!isAudioAllowed) {
    return (
      <div className="fixed bg-slate-500 bg-opacity-70 w-screen h-screen top-0 left-0 flex items-center justify-center z-35">
        <div className="bg-white min-w-[400px] min-h-[100px] flex flex-col items-center justify-center rounded p-4">
          Allow incomming ringtone?
          <Button appearance="ghost" onClick={() => enableAudio()}>
            Allow
          </Button>
        </div>
      </div>
    );
  }
};

export default RingToneConcent;
