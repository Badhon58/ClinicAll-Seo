import PageLoading from "@/components/Seo/PageLoading";
import ReportUpload from "@/components/UserAccount/ReportUpload";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <div className="mt-3">
        <ReportUpload/>
      </div>
    </Suspense>
  );
};

export default page;
