import OrderId from "@/components/UserAccount/OrderId";
import React, { Suspense } from "react";
import Loading from "../loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <OrderId />
    </Suspense>
  );
};

export default page;
