import AllProduct from "@/components/MediMart/AllProduct";
import SingleProduct from "@/components/MediMart/SingleProduct";
import React, { Suspense } from "react";
import Loading from "../loading";
import CategorySearch from "@/components/MediMart/CategorySearch";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const allslug = (await params).slug;
  const productType = allslug[0];
  const productId = allslug[1];
  const productCatagory = allslug[2];

  return productId && productType ? (
    <Suspense fallback={<Loading />}>
      {/* <CategorySearch productType={productType} productId={productId}/> */}
      {productCatagory == "catagorylist" && (
        <CategorySearch productType={productType} productId={productId} />
      )}
      {productCatagory == null && (
        <SingleProduct productType={productType} productId={productId} />
      )}
    </Suspense>
  ) : (
    <Suspense fallback={<Loading />}>
      <AllProduct productType={productType} />
    </Suspense>
  );
}
