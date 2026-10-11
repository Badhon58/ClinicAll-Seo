import PackageCheckout from "@/components/Package/PackageCheckout";
import React, { Suspense } from "react";
import Loading from "../loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-[80vh]">
        <PackageCheckout />
      </div>
    </Suspense>
  );
};

export default page;
