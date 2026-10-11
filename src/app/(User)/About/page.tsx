"use client"
import { Suspense } from "react";
import Loading from "./loading";
import Services from "@/components/Home/Services";
import dynamic from "next/dynamic";
const Hero = dynamic(() => import("./Hero"), {
  ssr: false,
});

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="lg:-mt-4">
        <Services />
      </div>
      <Hero />
    </Suspense>
  );
};

export default page;
