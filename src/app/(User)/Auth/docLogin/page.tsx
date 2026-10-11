import DoctorLogin from "@/components/Auth/DoctorLogin";
import React, { Suspense } from "react";
import Loading from "../loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <DoctorLogin />
    </Suspense>
  );
};

export default page;
