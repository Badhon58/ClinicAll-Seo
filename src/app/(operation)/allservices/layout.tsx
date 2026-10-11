import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
export const metadata: Metadata = {
  title: "Clinicall Services",
  description:
    "Discover all CliniCall services! Get online doctor consultations, lab tests, medicine delivery, and health packages in Bangladesh.",
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
