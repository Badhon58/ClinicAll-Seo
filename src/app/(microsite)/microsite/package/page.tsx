import Package from "@/components/Microsite/Package";
import PageLoading from "@/components/Seo/PageLoading";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Package />
    </Suspense>
  );
};

export default page;
