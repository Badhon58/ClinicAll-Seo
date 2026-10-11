import React, { Suspense } from "react";
import Loading from "../loading";
import DoctorForgotPassword from "@/components/Auth/DoctorForgotPassword";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <DoctorForgotPassword />
    </Suspense>
  );
};

export default page;
