// "use client";
// import React, { useCallback, useEffect, useState } from "react";
// import { NewProduct } from "./Interface";
// import Link from "next/link";
// import MediCart from "./MediCart";
// import { dummyImageUrls } from "@/lib/Medicinelib";
// import { apiCall } from "@/lib/axios-client";
// import { EndPoint, Methods } from "@/api/config";
// import { useTranslation } from "react-i18next";
// import PageLoading from "../Seo/PageLoading";

// const AllProduct = ({ productType }: { productType: string }) => {
//   const [allProduct, setAllProduct] = useState<NewProduct[]>();
//   const [loading, setLoading] = useState(true);
//   const [bottomLoading, setBottomLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const { t } = useTranslation();
//   const init = async () => {
//     try {
//       setLoading(true);
//       if (page == 1) {
//         const response = await apiCall(
//           Methods.GET,
//           `${EndPoint.MEDICINE_GETALL}?page=${page}&parent_category_name=${productType}`
//         );
//         const filteredData = response.data.medInfo.filter(
//           (item: NewProduct) => !dummyImageUrls.includes(item.images || "")
//         );
//         const dummyImages = response.data.medInfo.filter((item: NewProduct) =>
//           dummyImageUrls.includes(item.images || "")
//         );
//         const sortedData = [...filteredData];
//         setAllProduct(sortedData);
//       } else {
//         const response = await apiCall(
//           Methods.GET,
//           `${EndPoint.MEDICINE_GETALL}?page=${page}&parent_category_name=${productType}`
//         );
//         // setAllProduct(response.data.medInfo);
//         const filteredData = response.data.medInfo.filter(
//           (item: NewProduct) => !dummyImageUrls.includes(item.images || "")
//         );
//         const sortedData = [...filteredData];
//         // setAllProduct(sortedData);
//         setAllProduct((prev) => [...(prev || []), ...sortedData]);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMore = useCallback(async () => {
//     if (!hasMore || bottomLoading) return;

//     try {
//       setBottomLoading(true);
//       const nextPage = page + 1;
//       const response = await apiCall(
//         Methods.GET,
//         `${EndPoint.MEDICINE_GETALL}?page=${nextPage}&parent_category_name=${productType}`
//       );

//       const filteredData = response.data.medInfo.filter(
//         (item: NewProduct) => !dummyImageUrls.includes(item.images || "")
//       );

//       if (filteredData.length > 0) {
//         setAllProduct((prev: any) => [...prev, ...filteredData]);
//         setPage(nextPage);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setBottomLoading(false);
//     }
//   }, [page, hasMore, bottomLoading, productType]);

//   // Intersection Observer for infinite scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasMore && !bottomLoading) {
//           loadMore();
//         }
//       },
//       {
//         threshold: 0.1, // Trigger when 10% of the target is visible
//         rootMargin: "100px", // Load 100px before reaching the bottom
//       }
//     );

//     const sentinel = document.getElementById("scroll-sentinel");
//     if (sentinel) {
//       observer.observe(sentinel);
//     }

//     return () => {
//       if (sentinel) {
//         observer.unobserve(sentinel);
//       }
//     };
//   }, [loadMore, hasMore, bottomLoading]);

//   useEffect(() => {
//     init();
//   }, []);

//   return loading ? (
//     <PageLoading />
//   ) : (
//     <section className="xl:container xl:mx-auto 2xl:mt-9 xl:mt-4 lg:mt-4 mt-1.5 px-3 2xl:px-0 min-h-[80vh]">
//       <p className="2xl:text-3xl xl:text-2xl text-lg font-bold text-[#3A3A3C]">
//         {t("All Products")}
//       </p>
//       {productType === "offer" && <div className=" text-2xl">Comming Soon</div>}
//       <div className="grid grid-cols-2 gap-2 mt-2 xl:mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:gap-3 xl:gap-5 2xl:gap-6 ">
//         {allProduct &&
//           allProduct.map((data: NewProduct | any, index) => (
//             <Link key={index} href={`/mediMart/medicine/${data.product_slug}`}>
//               <MediCart product={data} />
//             </Link>
//           ))}
//       </div>
//       {bottomLoading && <PageLoading />}
//     </section>
//   );
// };

// export default AllProduct;

"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { NewProduct } from "./Interface";
import Link from "next/link";
import MediCart from "./MediCart";
import { dummyImageUrls } from "@/lib/Medicinelib";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { useTranslation } from "react-i18next";
import PageLoading from "../Seo/PageLoading";

const AllProduct = ({ productType }: { productType: string }) => {
  const [allProduct, setAllProduct] = useState<NewProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const { t } = useTranslation();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const init = async (reset = false) => {
    try {
      setLoading(true);
      if (reset) {
        setAllProduct([]);
        setPage(1);
        setHasMore(true);
      }

      const currentPage = reset ? 1 : page;
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.MEDICINE_GETALL}?page=${currentPage}&parent_category_name=${productType}`
      );

      const filteredData = response.data.medInfo.filter(
        (item: NewProduct) => !dummyImageUrls.includes(item.images || "")
      );

      if (reset) {
        setAllProduct(filteredData);
      } else {
        setAllProduct((prev) => [...prev, ...filteredData]);
      }

      // Check if there are more pages - adjust this based on your API response structure
      // You might need to check response.data.totalPages, response.data.hasNext, etc.
      setHasMore(response.data.medInfo.length > 0 && filteredData.length > 0);
    } catch (error) {
      console.log(error);
      setHasMore(false);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (!hasMore || bottomLoading || loading) return;

    try {
      setBottomLoading(true);
      const nextPage = page + 1;
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.MEDICINE_GETALL}?page=${nextPage}&parent_category_name=${productType}`
      );

      const filteredData = response.data.medInfo.filter(
        (item: NewProduct) => !dummyImageUrls.includes(item.images || "")
      );

      if (filteredData.length > 0) {
        setAllProduct((prev) => [...prev, ...filteredData]);
        setPage(nextPage);

        // Check if there are more pages
        setHasMore(response.data.medInfo.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
      setHasMore(false);
    } finally {
      setBottomLoading(false);
    }
  }, [page, hasMore, bottomLoading, productType, loading]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!sentinelRef.current || !hasMore || bottomLoading) return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !bottomLoading &&
          !loading
        ) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore, bottomLoading, loading]);

  // Initial load and reset when productType changes
  useEffect(() => {
    init(true);
  }, [productType]);

  // Handle manual load more as fallback
  const handleManualLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loadMore();
  };

  return (
    <section className="xl:container xl:mx-auto 2xl:mt-9 xl:mt-4 lg:mt-4 mt-1.5 px-3 2xl:px-0 min-h-[80vh]">
      <p className="2xl:text-3xl xl:text-2xl text-lg font-bold text-[#3A3A3C]">
        {t("All Products")}
      </p>

      {productType === "offer" && <div className="text-2xl">Coming Soon</div>}

      {loading && initialLoad ? (
        <PageLoading />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 mt-2 xl:mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:gap-3 xl:gap-5 2xl:gap-6">
            {allProduct.map((data: NewProduct, index) => (
              <Link
                key={`${data.product_slug}-${index}`}
                href={`/mediMart/medicine/${data.product_slug}`}
              >
                <MediCart product={data} />
              </Link>
            ))}
          </div>

          {/* Scroll Sentinel for infinite scroll */}
          <div ref={sentinelRef} id="scroll-sentinel" className="h-10" />

          {/* Bottom loading indicator */}
          {bottomLoading && (
            <div className="flex justify-center py-4">
              <PageLoading />
            </div>
          )}

          {/* No more products message */}
          {!hasMore && allProduct.length > 0 && (
            <div className="text-center py-4 text-gray-500">
              {t("No more products to load")}
            </div>
          )}

          {/* Manual load more button as fallback */}
          {hasMore && !bottomLoading && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleManualLoadMore}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {t("Load More")}
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && allProduct.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {t("No products found")}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default AllProduct;
