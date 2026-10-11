import React, { Suspense } from "react";
import NewPackage from "../Package/NewPackage";
import Loading from "@/app/loading";

const Packages = () => {
  return (
    <div className="mt-5">
      <Suspense fallback={<Loading />}>
        <NewPackage />
      </Suspense>
    </div>
  );
};

export default Packages;
