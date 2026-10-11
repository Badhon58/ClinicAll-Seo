import Navbar from "@/components/Navbar/Navbar";
import React, { ReactNode, Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer/Footer";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
      {/* <Navbar /> */}
      {children}
      {/* <Footer /> */}
    </Suspense>
  );
};

export default layout;
