import Claim from "@/components/UserAccount/Claim";
import React, { Suspense } from "react";
import Loading from "../loading";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Claim | My Account | Clinicall",
  description:
    "Claim your benefits on CliniCall. Submit & track your claims easily for online consultations, medicine purchases, and healthcare services.",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Claim />
    </Suspense>
  );
};

export default page;
