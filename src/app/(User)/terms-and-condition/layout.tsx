import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "@/components/Footer/Footer";
import Loading from "./loading";
export const metadata: Metadata = {
  title: "Thanks",
  description: "Read CliniCall's Terms & Conditions. Learn about our policies on telemedicine services, online consultations, and purchases in Bangladesh.",
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
