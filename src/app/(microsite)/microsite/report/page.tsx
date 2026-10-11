import ReportUpload from "@/components/UserAccount/ReportUpload";
import React, { Suspense } from "react";
import MicroLoading from "../MicroLoading";

const page = () => {
  return (
    <Suspense fallback={<MicroLoading />}>
      <div className="mt-3">
        <ReportUpload/>
      </div>
    </Suspense>
  );
};

export default page;
