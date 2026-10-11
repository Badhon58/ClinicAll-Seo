"use client";
import { useAppSelector } from "@/redux/Hooks";
import React, { useEffect, useState } from "react";
import { NewProduct } from "./Interface";
import Link from "next/link";
import MediCart from "./MediCart";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
// import Empty from "@/lib/Empty";
// import { useRouter } from "next/navigation";

const CategorySearch = ({
  productType,
  productId,
}: {
  productType: string;
  productId: string;
}) => {
  const [allProduct, setAllProduct] = useState<NewProduct[]>();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  // const router = useRouter();
  const init = async () => {
    try {
      setLoading(true);
      if (page == 1) {
        const response = await apiCall(
          Methods.GET,
          `${
            EndPoint.MEDICINE_GETALL
          }?page=${page}&parent_category_name=${decodeURIComponent(
            productType
          )}&category_name=${decodeURIComponent(productId)}`
        );
        setAllProduct(response.data.medInfo);
      } else {
        const response = await apiCall(
          Methods.GET,
          `${
            EndPoint.MEDICINE_GETALL
          }?page=${page}&parent_category_name=${decodeURIComponent(
            productType
          )}&category_name=${decodeURIComponent(productId)}`
        );
        setAllProduct((prev) => [...(prev || []), ...response.data.medInfo]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 600 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return loading ? (
    <div className="min-h-[60vh]">Loading...</div>
  ) : (
    <section className="xl:container xl:mx-auto 2xl:mt-9 xl:mt-4 lg:mt-4 mt-1.5 px-3 2xl:px-0 min-h-[70vh]">
      <p className="2xl:text-3xl xl:text-2xl text-lg font-bold text-[#3A3A3C]">
        {decodeURIComponent(productId)}
      </p>
      <main className="grid grid-cols-2 gap-2 mt-2 xl:mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:gap-3 xl:gap-5 2xl:gap-6 ">
        {allProduct && allProduct.length > 0 ? (
          allProduct?.map((item, index) => (
            <Link key={index} href={`/mediMart/medicine/${item.product_slug}`}>
              <MediCart product={item} />
            </Link>
          ))
        ) : (
          <p>No Product Is Current Available</p>
        )}
      </main>
    </section>
  );
};

export default CategorySearch;
