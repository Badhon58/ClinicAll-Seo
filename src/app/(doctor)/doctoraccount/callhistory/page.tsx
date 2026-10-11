import CallHistory from "@/components/DoctorAccount/CallHistory";
import React, { Suspense } from "react";
import Loading from "../loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CallHistory />
    </Suspense>
  );
};

export default page;
