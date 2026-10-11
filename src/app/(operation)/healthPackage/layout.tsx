import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer/Footer";
import HealthSeo from "@/components/Seo/HealthSeo";
export const metadata: Metadata = {
  title: "Health Insurance in Bangladesh, Discover Affordable Health Packages with Extra Benefits",
  description: "Explore CliniCall health packages for complete care. Get affordable checkups, lab tests, and consultations in Bangladesh.",
};

export default function HealthPackage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
      <Footer />
      <HealthSeo />
    </>
  );
}
