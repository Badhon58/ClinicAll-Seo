
import UserProfile from "@/components/MicrositeTest/UserProfile";
import PageLoading from "@/components/Seo/PageLoading";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      {/* <UserProfile /> */}
      <UserProfile />
    </Suspense>
  );
};

export default page;
