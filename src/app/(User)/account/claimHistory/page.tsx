import React, { Suspense } from "react";
import Loading from "../loading";
import ClaimHistory from "@/components/UserAccount/ClaimHistory";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Claim History | My Account | Clinicall",
  description:
    "Track and manage your orders on CliniCall. View your purchase history, order status, and details all in one place.",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ClaimHistory />
    </Suspense>
  );
};

export default page;
