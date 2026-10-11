import Checkout from "@/components/Microsite/Checkout";
// import NavBar from "@/components/Microsite/NavBar";
import PageLoading from "@/components/Seo/PageLoading";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      {/* <NavBar /> */}
      <Checkout />
    </Suspense>
  );
};

export default page;
