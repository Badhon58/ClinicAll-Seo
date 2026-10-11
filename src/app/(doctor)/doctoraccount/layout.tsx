import Navbar from "@/components/Navbar/Navbar";
import React, { ReactNode, Suspense } from "react";
import Footer from "@/components/Footer/Footer";
import Loading from "./loading";
import DocLeftSidebar from "@/components/DoctorAccount/DocLeftSidebar";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <section className="xl:container xl:mx-auto flex  lg:space-x-3 2xl:space-x-6 2xl:mt-7 xl:mt-5 lg:mt-4 lg:px-3 xl:px-4 md:mt-3 2xl:px-10 ">
        <aside className="hidden lg:block lg:flex-1  ">
          <DocLeftSidebar />
        </aside>
        <aside className="flex-1 lg:flex-[3] lg:mb-10">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </aside>
      </section>
      <Footer />
    </Suspense>
  );
};

export default layout;
