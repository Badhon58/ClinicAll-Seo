import Services from "@/components/CareGiver/Services";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={"Loading.."}>
      <Services />
    </Suspense>
  );
};

export default page;
