import Navbar from "@/components/Navbar/Navbar";
import React, { ReactNode, Suspense } from "react";
import Footer from "@/components/Footer/Footer";
import { Metadata } from "next";
import Loading from "./loading";
export const metadata: Metadata = {
  title: "Lab Test Discount Center",
  description:
    "Save more with CliniCall discounts! Get the best deals on online doctor consultations, medicines, and healthcare services in Bangladesh.",
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
