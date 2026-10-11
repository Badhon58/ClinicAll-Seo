import React, { Suspense } from "react";
import Loading from "../loading";
import PatientPage from "@/components/DoctorAccount/PatientPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const slugstring = (await params).id;
  return (
    <Suspense fallback={<Loading />}>
      <PatientPage id={slugstring} />
    </Suspense>
  );
}
