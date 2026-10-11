import React, { Suspense } from "react";
import Loading from "./loading";
import LoginUser from "@/components/Auth/LoginUser";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LoginUser />
    </Suspense>
  );
};

export default page;
