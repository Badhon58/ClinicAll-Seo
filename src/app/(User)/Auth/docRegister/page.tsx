import DoctorRegister from "@/components/Auth/DoctorRegister";
import React, { Suspense } from "react";
import Loading from "../loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <DoctorRegister />;
    </Suspense>
  );
};

export default page;
