import Prescription from "@/components/DoctorAccount/Prescription";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Prescription />
    </Suspense>
  );
};

export default page;
