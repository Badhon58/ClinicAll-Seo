import LoginUser from "@/components/Auth/LoginUser";
import React, { Suspense } from "react";
import Loading from "../loading";
import SignIn from "@/components/Auth/SignIn";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* <LoginUser /> */}
      <SignIn />
    </Suspense>
  );
};

export default page;
