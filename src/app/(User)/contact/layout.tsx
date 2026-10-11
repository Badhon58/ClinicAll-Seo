import Navbar from "@/components/Navbar/Navbar";
import React, { ReactNode, Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Us | Clinicall",
  description:
    "Get in touch with CliniCall! Contact us for support, inquiries, or partnership opportunities. We're here to help with your healthcare needs.",
};
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar />
      </Suspense>
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default layout;
