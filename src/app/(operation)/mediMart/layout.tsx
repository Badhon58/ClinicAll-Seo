import Navbar from "@/components/Navbar/Navbar";
import React, { ReactNode, Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer/Footer";
import MediMartSeo from "@/components/Seo/MediMartSeo";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Best Online Medicine Home Delivery BD | Clinicall",
  description:
    "Shop medicines and healthcare essentials online at CliniCall MediMart. Safe, affordable, and convenient delivery across Bangladesh.",
};
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      {children}
      <Footer />
      <MediMartSeo />
    </Suspense>
  );
};

export default layout;
