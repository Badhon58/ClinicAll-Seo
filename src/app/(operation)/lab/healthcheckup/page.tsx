import CheckOut from "@/components/Lab/healthCheckUp/CheckOut";
import React, { Suspense } from "react";
import Loading from "../loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CheckOut />
    </Suspense>
  );
};

export default page;
