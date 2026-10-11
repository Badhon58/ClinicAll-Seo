import PageLoading from "@/components/Seo/PageLoading";
import PrevAppintment from "@/components/UserAccount/PrevAppintment";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <PrevAppintment />
    </Suspense>
  );
};

export default page;
