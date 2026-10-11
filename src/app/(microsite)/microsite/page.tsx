import Index from "@/components/Microsite/Index";
import PageLoading from "@/components/Seo/PageLoading";
import { headers } from "next/headers";
import React, { Suspense } from "react";

const page = async () => {
  const reqHeaders = await headers();
  const token = reqHeaders.get("user-token") || null;
  //  const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjE3NTQ2Mjk3NzgiLCJpYXQiOjE3NjYzNzg2NTIsImV4cCI6MTc2NjQyNjM5OX0.4LwX6ntENN2CelfsmLZemzNKs1LSObJJ083qO2dKDCc";

  // const token = "";
  return (
    <Suspense fallback="Loading">
      <Index token={token!} />
    </Suspense>
  );
};

export default page;
