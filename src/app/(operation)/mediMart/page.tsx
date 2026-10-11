import LeftSidebar from "@/components/MediMart/LeftSidebar";
import MadiServices from "@/components/MediMart/MediServices";
import RightSidebar from "@/components/MediMart/RightSidebar";
import React, { Suspense } from "react";
import Loading from "./loading";
import "./Style.css";
import ParentsCatagory from "@/components/MediMart/ParentsCatagory";
const Page = () => {
  return (
    <section className="overflow-hidden relative">
      <Suspense fallback={"Loading..."}>
        <div className="relative hidden xl:flex ">
          <span className="mediMart-bg -z-50" />
          <span className="mediMart-bg-1 -z-50" />
          <span className="mediMart-bg-2 -z-50" />
          <span className="hidden mediMart-bg-5 -z-50 2xl:flex " />
          <span className="hidden mediMart-bg-6 -z-50 2xl:flex " />
        </div>
      </Suspense>
      <div className="px-2 pt-3 lg:pt-5 2xl:pt-8 xl:container xl:mx-auto">
        <aside className="flex lg:gap-7 xl:gap-10 2xl:gap-12 xl:px-3 2xl:px-0">
          <Suspense fallback={"Loading..."}>
            <LeftSidebar />
          </Suspense>
          <Suspense fallback={"Loading..."}>
            <RightSidebar />
          </Suspense>
        </aside>
        <Suspense fallback={"Loading..."}>
          <MadiServices />
          <ParentsCatagory />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
