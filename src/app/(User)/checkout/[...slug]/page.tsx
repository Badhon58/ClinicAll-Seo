import SingleCheckout from "@/components/MediMart/SingleCheckout";
import React, { Suspense } from "react";
import Loading from "../loading";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const allslug = (await params).slug;
  const productType = allslug[0];
  const productId = allslug[1];
  return (
    <Suspense fallback={<Loading />}>
      <SingleCheckout productType={productType} productId={productId} />
    </Suspense>
  );
}
