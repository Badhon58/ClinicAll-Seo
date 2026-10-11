import Navbar from "@/components/Navbar/Navbar";
import React, { ReactNode, Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "News | Clinicall",
  description:
    "Stay updated with the latest news, announcements, and media coverage about CliniCall – Bangladesh's leading telemedicine platform.",
};
const layout = ({ children }: { children: ReactNode }) => {
  return (
      <Suspense fallback={<Loading />}>
        <Navbar />
        {children}
        <Footer />
      </Suspense>
  );
};

export default layout;
