import Checkout from "@/components/MicrositeTest/Checkout";
import PageLoading from "@/components/Seo/PageLoading";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Checkout />
    </Suspense>
  );
};

export default page;
