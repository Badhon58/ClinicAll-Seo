import UserForgetPassword from "@/components/Auth/UserForgetPassword";
import React, { Suspense } from "react";
import Loading from "../loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <UserForgetPassword />
    </Suspense>
  );
};

export default page;
