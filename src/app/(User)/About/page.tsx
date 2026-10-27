// "use client"
import { Suspense } from "react";
import Loading from "./loading";
import Services from "@/components/Home/Services";
// import dynamic from "next/dynamic";
import Hero from "./Hero";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Us Page Test 10 | CliniCall",
  description:
    "Find the best doctors in Bangladesh on CliniCall. Browse our doctor list and get expert online consultations.",
  keywords: [
    "doctors in Bangladesh",
    "best doctors in Bangladesh",
    "online doctor consultation",
    "specialist doctors",
    "CliniCall",
  ],
  openGraph: {
    title: "BD Doctor List | CliniCall",
    description:
      "Find the best doctors in Bangladesh on CliniCall. Browse our doctor list and book an online consultation with trusted specialists.",
    type: "website",
    siteName: "CliniCall",
  },
};

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* <DoctorList /> */}
      <Services />
      <Hero />
    </Suspense>

  );
};

export default page;
