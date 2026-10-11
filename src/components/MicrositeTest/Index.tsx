import Loading from "@/app/loading";
import React, { Suspense } from "react";
// import NavBar from "./NavBar";
// import HeroSection from "./HeroSection";
import CallDoctor from "./CallDoctor";
import Package from "./Package";

const Index = ({ name }: { name?: string }) => {
  return (
    <Suspense fallback={<Loading />}>
      <CallDoctor />
      {/* <HeroSection /> */}
      <Package />
    </Suspense>
  );
};

export default Index;
