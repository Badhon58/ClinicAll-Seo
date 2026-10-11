import Removal from "@/components/Auth/Removal";
import React, { Suspense } from "react";
import Loading from "../loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Removal />
    </Suspense>
  );
};

export default page;
