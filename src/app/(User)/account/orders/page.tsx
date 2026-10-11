import React, { Suspense } from "react";
import Loading from "../loading";
import OrderHistory from "@/components/UserAccount/OrderHistory";
import { Metadata } from "next";
//
export const metadata: Metadata = {
  title: "My Order List | My Account | Clinicall",
  description:
    "Track and manage your orders on CliniCall. View your purchase history, order status, and details all in one place..",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <OrderHistory />
    </Suspense>
  );
};

export default page;
