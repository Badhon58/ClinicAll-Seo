import Navbar from "@/components/Navbar/Navbar";
import React, { ReactNode, Suspense } from "react";
import Footer from "@/components/Footer/Footer";
import Loading from "./loading";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Find by Specialized Doctors | Clinicall",
  description:
    "Consult top specialists online at CliniCall. Get expert medical advice and treatment from the best doctors in Bangladesh.",
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
