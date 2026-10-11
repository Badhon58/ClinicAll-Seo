import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer/Footer";
export const metadata: Metadata = {
  title: "Clinicall About",
  description: "Learn about CliniCall, Bangladesh's leading telemedicine platform. Providing trusted online doctor consultations and healthcare services.",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <Suspense fallback={<Loading />}>
      <Navbar />
      {children}
      <Footer />
    </Suspense>
  );
}
