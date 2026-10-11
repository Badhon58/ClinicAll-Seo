"use client";
import React, { Suspense } from "react";
import Loading from "@/app/loading";
import { usePathname } from "next/navigation";
import NavBar from "@/components/MicrositeTest/NavBar";
import Footer from "@/components/MicrositeTest/Footer";
const Index = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  const hideFooterPaths = [
    "/microsite-test/call-waiting",
    "/microsite-test/consultation",
  ];

  const show = !hideFooterPaths.includes(pathName);
  return (
    <Suspense fallback={<Loading />}>
      {show && <NavBar />}
      {children}
      {show && <Footer />}
    </Suspense>
  );
};

export default Index;
