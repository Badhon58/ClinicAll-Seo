import React from "react";
import Call from "./Call";

const page = async ({ searchParams }: any) => {
  const { channel, isVideo } = await searchParams;
  // console.log("CHHannel:", channel);
  return (
    <div className="min-h-[90vh]">
      <Call channel={channel} isVideo={isVideo} />
    </div>
  );
};

export default page;
