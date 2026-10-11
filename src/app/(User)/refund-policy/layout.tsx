import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "@/components/Footer/Footer";
import Loading from "./loading";
export const metadata: Metadata = {
  title: "Refund Policy | Clinicall",
  description:
    "Read CliniCall's Refund Policy to learn about our terms for cancellations, refunds, and returns on healthcare services and purchases.",
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
