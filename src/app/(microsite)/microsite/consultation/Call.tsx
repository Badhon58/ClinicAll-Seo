"use client";

import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import { useEffect, useState } from "react";
import { Window } from "./Window";

export const Call = ({
  channel,
  isVideo,
}: {
  channel: string;
  isVideo: boolean;
}) => {
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
        <Window
          channel={channel}
          client={client}
          isVideo={isVideo.toString()}
        />
      </AgoraRTCProvider>
    )
  );
};

export default Call;
