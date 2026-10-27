// "use client"
import { Suspense } from "react";
import Loading from "./loading";
import Services from "@/components/Home/Services";
// import dynamic from "next/dynamic";
import Hero from "./Hero";
import DoctorList from "@/components/Doctor/DoctorList";
import DoctorFAQ from "@/components/Doctor/DoctorFAQ";
import type { Metadata } from 'next'


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Clinicall About',
    description: "Learn about CliniCall, Bangladesh's leading telemedicine platform. Providing trusted online doctor consultations and healthcare services.",
  }
}

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
