import Navbar from "@/components/Navbar/Navbar";
import React, { ReactNode, Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer/Footer";
import MediMartSeo from "@/components/Seo/MediMartSeo";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar />
        {children}
      </Suspense>
      <Footer />
      <MediMartSeo />
    </>
  );
};

export default layout;
