import React, { Suspense } from "react";
import Loading from "./loading";
import UserProfile from "@/components/UserAccount/UserProfile";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "My Account | Clinicall",
  description:
    "Access your CliniCall account to manage appointments, orders, claims, and healthcare services easily in one place.",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile />
    </Suspense>
  );
};

export default page;
