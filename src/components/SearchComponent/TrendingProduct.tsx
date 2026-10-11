import React from "react";
import { NewProduct } from "../MediMart/Interface";
import ProductCart from "./ProductCart";
import Link from "next/link";

const TrendingProduct = ({
  searchKey,
  setDropDown,
  product,
  setSearchTerm,
}: {
  searchKey: string;
  setDropDown: any;
  product: NewProduct[];
  setSearchTerm: any;
}) => {
  return (
    product &&
    product.length > 0 && (
      <div className=" 2xl:min-h-[35vh]  md:p-3 ">
        <p className="p-2 text-lg font-medium">
          {searchKey.length <= 0 ? "Trending Medicine" : "All Medicine"}
        </p>
        <div className="overflow-y-auto grid  gap-3  border md:p-3 rounded-md">
          {product?.map((item, index) => (
            <div key={index} className="grid grid-cols-11 p-1 md:p-3 rounded-md shadow-[0px_0px_10px_0px_rgba(0,_0,_0,_0.1)] hover:bg-gray-50 ">
              <ProductCart
                item={item}
                setDropDown={setDropDown}
                setSearchTerm={setSearchTerm}
              />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default TrendingProduct;
