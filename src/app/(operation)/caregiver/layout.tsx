import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer/Footer";
export const metadata: Metadata = {
  title: "Caregiver",
  description: "Caregivver Page",
};

export default function labTestlayout({
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
