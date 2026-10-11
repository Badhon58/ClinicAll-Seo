"use client";

import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import { Basics } from "./Basics";
import { useEffect, useState } from "react";

export const VideoCall2 = ({ channel }: { channel: string }) => {
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    if (typeof window != "undefined") {
      const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      setClient(agoraClient);
    }
  }, []);

  //   const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  return (
    typeof window != "undefined" &&
    client && (
      <AgoraRTCProvider client={client}>
        <Basics channel={channel} client={client} />
      </AgoraRTCProvider>
    )
  );
};

export default VideoCall2;
