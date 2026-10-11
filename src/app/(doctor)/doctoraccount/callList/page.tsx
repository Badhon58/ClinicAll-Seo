import AllDoctorCallList from "@/components/DoctorAccount/AllDoctorCallList";
import React, { Suspense } from "react";
import Loading from "../loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AllDoctorCallList />
    </Suspense>
  );
};

export default page;
