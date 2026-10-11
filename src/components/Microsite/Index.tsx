import Loading from "@/app/loading";
import React, { Suspense } from "react";
// import NavBar from "./NavBar";
// import HeroSection from "./HeroSection";
import CallDoctor from "./CallDoctor";
import Package from "./Package";

const Index = ({ token }: { token: string }) => {
  console.log("Index component99");
  return (
    <Suspense fallback={"Index Loading..."}>
      <CallDoctor token={token} />
      {/* <HeroSection /> */}
      <Package />
    </Suspense>
  );
};

export default Index;
