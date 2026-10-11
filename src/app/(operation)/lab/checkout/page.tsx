import LabCheckout from "@/components/Lab/LabCheckout";
import React, { Suspense } from "react";
import Loading from "../loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LabCheckout />
    </Suspense>
  );
};

export default page;
