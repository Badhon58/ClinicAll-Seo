import UserProfile from "@/components/Microsite/UserProfile";
import PageLoading from "@/components/Seo/PageLoading";
// import UserProfile from "@/components/UserAccount/UserProfile";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <UserProfile />
    </Suspense>
  );
};

export default page;
