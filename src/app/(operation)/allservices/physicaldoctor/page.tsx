import React, { Suspense } from "react";
import Loading from "../loading";
import Physicaldoctor from "@/components/CareGiver/PhysicalDoctor/Physicaldoctor";
import Header from "../Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physical Doctor",
  description:
    "Discover all CliniCall services! Get online doctor consultations, lab tests, medicine delivery, and health packages in Bangladesh.",
};

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <section className="min-h-[80vh] xl:mx-auto xl:container p-2  px-4">
        <Header title={"physicaldoctor"} />
        <div className="pt-2">
          <Physicaldoctor />
        </div>
      </section>
    </Suspense>
  );
};

export default page;
