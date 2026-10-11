import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "@/components/Footer/Footer";
import Loading from "./loading";
export const metadata: Metadata = {
  title: "Privacy Policy | Clinicall",
  description: "Read CliniCall's Privacy Policy to learn how we protect your data and ensure secure online healthcare services in Bangladesh.",
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
