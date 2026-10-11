import React, { Suspense } from "react";
import Loading from "../loading";
import PrevAppintment from "@/components/UserAccount/PrevAppintment";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Previous Appointment | My Account | Clinicall",
  description:
    "View your previous appointments on CliniCall. Access your consultation history and manage follow-ups easily in one place",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PrevAppintment />
    </Suspense>
  );
};

export default page;
