import AllLabTest from "@/components/Lab/AllLabTest";
import React, { Suspense } from "react";
import Loading from "./loading";
import Packages from "@/components/Home/Packages";
import LabBlog from "@/components/Lab/LabBlog";
import Download from "@/components/Home/Download";
import Banner from "@/components/Lab/Banner";
import LabAmount from "@/components/Lab/LabAmount";
import Partner from "@/components/Home/Partner";
import HealthCheckUpPackage from "@/components/Lab/HealthCheckUpPackage";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Banner />
      <LabAmount />
      <AllLabTest />
      <HealthCheckUpPackage />
      {/* <Packages /> */}
      <LabBlog />
      <Partner />
      <Download />
    </Suspense>
  );
};

export default page;
