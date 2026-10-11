import React, { Suspense } from "react";
import Loading from "./loading";
import NewPackage from "@/components/Package/NewPackage";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* <AllPackage /> */}
      <div className="min-h-[80vh]">
        <NewPackage />
      </div>
    </Suspense>
  );
};

export default page;
