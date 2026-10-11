import React, { Suspense } from "react";
import Loading from "./loading";
import CheckOut from "@/components/MediMart/CheckOut";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CheckOut />
    </Suspense>
  );
};

export default page;
