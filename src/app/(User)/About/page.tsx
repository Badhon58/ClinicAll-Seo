// "use client"
import { Suspense } from "react";
import Loading from "./loading";
import Services from "@/components/Home/Services";
// import dynamic from "next/dynamic";
import Hero from "./Hero";
import { Metadata } from "next";
import DoctorList from "@/components/Doctor/DoctorList";
import DoctorFAQ from "@/components/Doctor/DoctorFAQ";
// const Hero = dynamic(() => import("./Hero"), {
//   ssr: false,
// });

export const metadata: Metadata = {
  title: "Online Doctor Consultation in Bangladesh | CliniCall",
  description:
    "Consult qualified doctors online in Bangladesh with CliniCall. Explore healthcare services, find experienced doctors, and book convenient online consultations.",
  keywords: [
    "online doctor consultation Bangladesh",
    "online doctor BD",
    "best doctors in Bangladesh",
    "telemedicine Bangladesh",
    "CliniCall",
  ],
  alternates: {
    canonical: "https://theclinicall.com/",
  },
  openGraph: {
    title: "Online Doctor Consultation in Bangladesh | CliniCall",
    description:
      "Find experienced doctors and access convenient online healthcare services with CliniCall in Bangladesh.",
    url: "https://theclinicall.com/",
    siteName: "CliniCall",
    type: "website",
    locale: "en_BD",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Doctor Consultation in Bangladesh | CliniCall",
    description:
      "Find experienced doctors and book online consultations with CliniCall.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* <DoctorList /> */}
      <Services />
      <Hero />
      <DoctorFAQ />
    </Suspense>

  );
};

export default page;
