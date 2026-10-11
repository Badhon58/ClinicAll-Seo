import React, { Suspense } from "react";
import Loading from "../loading";
import HealthCard from "@/components/UserAccount/HealthCard";
import { Metadata } from "next";
//
export const metadata: Metadata = {
  title: "Health Card | My Account | Clinicall",
  description:
    "Get your CliniCall Health Card for exclusive benefits, discounts, and seamless access to online healthcare services in Bangladesh.",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <HealthCard />
    </Suspense>
  );
};

export default page;
