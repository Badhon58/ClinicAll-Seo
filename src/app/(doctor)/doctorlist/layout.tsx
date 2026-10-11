import Navbar from "@/components/Navbar/Navbar";
import React, { ReactNode, Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer/Footer";
import DoctorSeo from "@/components/Seo/DoctorSeo";
import { Metadata } from "next";
//
export const metadata: Metadata = {
  title: "BD Doctor List | Clinicall",
  description:
    " Find the best doctors in BD on CliniCall. Browse our doctor list and get expert consultations online. We offer fast, easy, & reliable care.",
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar />
        {children}
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Footer />
        <DoctorSeo />
      </Suspense>
    </>
  );
};

export default layout;
