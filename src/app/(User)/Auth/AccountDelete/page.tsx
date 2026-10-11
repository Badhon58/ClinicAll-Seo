import React, { Suspense } from "react";
import Loading from "../loading";
import Removal from "@/components/Auth/Removal";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      {" "}
      <Removal />
    </Suspense>
  );
};

export default page;
