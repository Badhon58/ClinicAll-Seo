import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer/Footer";
import LabSeo from "@/components/Seo/LabSeo";
export const metadata: Metadata = {
  title: "Lab Test: Quick, Easy, and Hassle-Free with CliniCall",
  description: "Book lab tests online with CliniCall. Get accurate & reliable diagnostics and home sample collection from trusted labs in Bangladesh.",
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
      <LabSeo />
    </Suspense>
  );
}
