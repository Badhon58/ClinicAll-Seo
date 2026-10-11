import React, { Suspense } from "react";
import Loading from "../loading";
// import VisitingHour from "@/components/DoctorAccount/VisitingHour";
import { Metadata } from "next";
import VisitingHours from "@/components/DoctorAccount/VisitingHours";
export const metadata: Metadata = {
  title: "Visiting Hours | Doctor",
  description: "Visiting Hours By Doctor",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* <VisitingHour /> */}
      <VisitingHours />
    </Suspense>
  );
};

export default page;
