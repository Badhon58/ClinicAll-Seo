import Navbar from "@/components/Navbar/Navbar";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer/Footer";
export const metadata: Metadata = {
  title: "Blog | Clinicall",
  description:
    "Stay informed with CliniCall's health blog. Read expert tips, medical advice, and the latest healthcare updates in Bangladesh.",
};
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {" "}
      <Suspense fallback={<Loading />}>
        <Navbar />
      </Suspense>
      {children}
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default layout;
