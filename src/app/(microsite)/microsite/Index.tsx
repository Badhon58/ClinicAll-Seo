"use client";
import NavBar from "@/components/Microsite/NavBar";
import React, { Suspense } from "react";
import Footer from "@/components/Microsite/Footer";
import Loading from "@/app/loading";
import { usePathname } from "next/navigation";
import MicroLoading from "./MicroLoading";
const Index = ({
  token,
  children,
}: Readonly<{
  token: string | null;
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  const hideFooterPaths = [
    "/microsite/call-waiting",
    "/microsite/consultation",
  ];

  const show = !hideFooterPaths.includes(pathName);
  return (
    <Suspense fallback={<MicroLoading />}>
      {show && <NavBar token={token} />}
      {children}
      {show && <Footer />}
    </Suspense>
  );
};

export default Index;
