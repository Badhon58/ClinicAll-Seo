import ReportUpload from "@/components/UserAccount/ReportUpload";
import React, { Suspense } from "react";
import Loading from "../../receipt/loading";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Report | My Account | Clinicall",
  description:
    "View your previous appointments on CliniCall. Access your consultation history and manage follow-ups easily in one place",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ReportUpload />
    </Suspense>
  );
};

export default page;
