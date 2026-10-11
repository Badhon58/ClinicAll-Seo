import G_D_Iplane from "@/components/DoctorAccount/G_D_Iplane";
import PageLoading from "@/components/Seo/PageLoading";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <G_D_Iplane />
    </Suspense>
  );
};

export default page;
