import PageLoading from "@/components/Seo/PageLoading";
import HealthCard from "@/components/UserAccount/HealthCard";
import UserProfile from "@/components/UserAccount/UserProfile";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <HealthCard />
    </Suspense>
  );
};

export default page;
