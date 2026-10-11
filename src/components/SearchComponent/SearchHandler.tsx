"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TrendingProduct from "./TrendingProduct";
import TrendingLab from "./TrendingLab";
import TrendingDoctor from "./TrendingDoctor";
import TrendingPackage from "./TrendingPackage";
import { search } from "./interface";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import Loading from "@/app/loading";

const SearchHandler = ({
  setDropDown,
  setSearchTerm,
}: {
  setDropDown: any;
  setSearchTerm: any;
}) => {
  const search = useSearchParams();
  const [loading, setLoading] = useState(false);
  const key = search.get("key") || "";
  const [searchResult, setSearchResult] = useState<search>();
  const pathname = usePathname();
  const init = async () => {
    try {
      const location = localStorage.getItem("location") || "insidedhaka";
      let url = "&provider=Thyrocare";
      if (location === "outsidedhaka") {
        url = "&provider=Probe";
      }
      setLoading(true);
      const { data } = await apiCall(
        Methods.GET,
        `${EndPoint.GLOBALSEARCH}${key}${url}&showHome=true`
      );
      // console.log(`${EndPoint.GLOBALSEARCH}${key}${url}&showhome=true`);

      setSearchResult(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, [key]);

  const renderComponentsBasedOnPath = () => {
    if (pathname.startsWith("/healthPackage")) {
      return (
        <>
          {searchResult?.healthPackages &&
            searchResult?.healthPackages.length > 0 && (
              <TrendingPackage
                searchKey={key}
                packages={searchResult?.healthPackages!}
                setDropDown={setDropDown}
                setSearchTerm={setSearchTerm}
              />
            )}
          {searchResult?.medicines && searchResult?.medicines?.length > 0 && (
            <TrendingProduct
              searchKey={key}
              product={searchResult.medicines}
              setDropDown={setDropDown}
              setSearchTerm={setSearchTerm}
            />
          )}
          {searchResult?.doctors && searchResult?.doctors?.length > 0 && (
            <TrendingDoctor
              allDoctor={searchResult?.doctors!}
              searchKey={key}
              setDropDown={setDropDown}
              setSearchTerm={setSearchTerm}
            />
          )}
          {searchResult?.labTests && searchResult?.labTests?.length > 0 && (
            <TrendingLab
              allLabtest={searchResult?.labTests!}
              setDropDown={setDropDown}
              setSearchTerm={setSearchTerm}
            />
          )}
        </>
      );
    } else if (pathname.startsWith("/mediMart")) {
      return (
        <>
          {searchResult?.medicines && searchResult?.medicines?.length > 0 && (
            <TrendingProduct
              searchKey={key}
              setDropDown={setDropDown}
              product={searchResult.medicines}
              setSearchTerm={setSearchTerm}
            />
          )}
          {searchResult?.healthPackages &&
            searchResult?.healthPackages.length > 0 && (
              <TrendingPackage
                searchKey={key}
                packages={searchResult?.healthPackages!}
                setDropDown={setDropDown}
                setSearchTerm={setSearchTerm}
              />
            )}
          {searchResult?.doctors && searchResult?.doctors?.length > 0 && (
            <TrendingDoctor
              allDoctor={searchResult?.doctors!}
              searchKey={key}
              setDropDown={setDropDown}
              setSearchTerm={setSearchTerm}
            />
          )}
          {searchResult?.labTests && searchResult?.labTests?.length > 0 && (
            <TrendingLab
              allLabtest={searchResult?.labTests!}
              setDropDown={setDropDown}
              setSearchTerm={setSearchTerm}
            />
          )}
        </>
      );
    } else if (pathname.startsWith("/lab")) {
      return (
        <>
          {searchResult?.labTests && searchResult?.labTests?.length > 0 && (
            <TrendingLab
              allLabtest={searchResult?.labTests!}
              setDropDown={setDropDown}
              setSearchTerm={setSearchTerm}
            />
          )}
          {searchResult?.healthPackages &&
            searchResult?.healthPackages.length > 0 && (
              <TrendingPackage
                searchKey={key}
                packages={searchResult?.healthPackages!}
                setDropDown={setDropDown}
                setSearchTerm={setSearchTerm}
              />
            )}
          {searchResult?.medicines && searchResult?.medicines?.length > 0 && (
            <TrendingProduct
              searchKey={key}
              setDropDown={setDropDown}
              product={searchResult.medicines}
              setSearchTerm={setSearchTerm}
            />
          )}
          {searchResult?.doctors && searchResult?.doctors?.length > 0 && (
            <TrendingDoctor
              allDoctor={searchResult?.doctors!}
              searchKey={key}
              setDropDown={setDropDown}
              setSearchTerm={setSearchTerm}
            />
          )}
        </>
      );
    } else if (pathname.startsWith("/doctorlist")) {
      return (
        <>
          {searchResult?.doctors && searchResult?.doctors?.length > 0 && (
            <TrendingDoctor
              allDoctor={searchResult?.doctors!}
              searchKey={key}
              setDropDown={setDropDown}
              setSearchTerm={setSearchTerm}
            />
          )}
          {searchResult?.healthPackages &&
            searchResult?.healthPackages.length > 0 && (
              <TrendingPackage
                searchKey={key}
                packages={searchResult?.healthPackages!}
                setDropDown={setDropDown}
                setSearchTerm={setSearchTerm}
              />
            )}
          {searchResult?.medicines && searchResult?.medicines?.length > 0 && (
            <TrendingProduct
              searchKey={key}
              setDropDown={setDropDown}
              product={searchResult.medicines}
              setSearchTerm={setSearchTerm}
            />
          )}
          {searchResult?.labTests && searchResult?.labTests?.length > 0 && (
            <TrendingLab
              allLabtest={searchResult?.labTests!}
              setDropDown={setDropDown}
              setSearchTerm={setSearchTerm}
            />
          )}
        </>
      );
    } else {
      return (
        <>
          {searchResult?.healthPackages &&
            searchResult?.healthPackages.length > 0 && (
              <TrendingPackage
                searchKey={key}
                packages={searchResult?.healthPackages!}
                setDropDown={setDropDown}
                setSearchTerm={setSearchTerm}
              />
            )}
          {searchResult?.medicines && searchResult?.medicines?.length > 0 && (
            <TrendingProduct
              searchKey={key}
              setDropDown={setDropDown}
              product={searchResult.medicines}
              setSearchTerm={setSearchTerm}
            />
          )}
          {searchResult?.doctors && searchResult?.doctors?.length > 0 && (
            <TrendingDoctor
              allDoctor={searchResult?.doctors!}
              searchKey={key}
              setDropDown={setDropDown}
              setSearchTerm={setSearchTerm}
            />
          )}
          {searchResult?.labTests && searchResult?.labTests?.length > 0 && (
            <TrendingLab
              allLabtest={searchResult?.labTests!}
              setDropDown={setDropDown}
              setSearchTerm={setSearchTerm}
            />
          )}
        </>
      );
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <section className="p-3 xl:container max-w-sm lg:max-w-4xl 2xl:max-w-4xl mx-auto min-h-[80vh]  ">
      <div className="mx-auto ">
        {key.length > 0 && (
          <p className="text-lg font-normal">
            Showing all results for <span className="font-medium">{key}</span>
          </p>
        )}
        <div className="grid gap-1 ">{renderComponentsBasedOnPath()}</div>
      </div>
    </section>
  );
};

export default SearchHandler;
