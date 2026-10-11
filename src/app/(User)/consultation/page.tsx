// import CallNotification from "@/components/common/CallNotification";
// import ListOnlineUser from "@/components/common/ListOnlineUser";
// import VideoCall from "@/components/common/VideoCall";
import VideoCall2 from "@/components/common/VideoCall2";
import React from "react";

const page = async ({ searchParams }: any) => {
  const { channel } = await searchParams;
  console.log("CHHannel:", channel);
  return (
    <div className="min-h-screen">
      {/* <VideoCall /> */}
      <VideoCall2 channel={channel} />
    </div>
  );
};

export default page;
