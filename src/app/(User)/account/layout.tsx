import Navbar from "@/components/Navbar/Navbar";
import React, { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer/Footer";
import LeftSideBar from "@/components/UserAccount/LeftSideBar";
import { Metadata } from "next";



const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <div className="xl:container xl:mx-auto flex  lg:space-x-3 2xl:space-x-6 2xl:mt-7 xl:mt-5 lg:mt-4 lg:px-3 xl:px-4 md:mt-3 2xl:px-10 ">
        <section className="hidden lg:block lg:flex-1 ">
          <LeftSideBar />
        </section>
        <section className="flex-1 lg:flex-[3] lg:mb-10">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </section>
      </div>
      <Footer />
    </Suspense>
  );
};

export default layout;
