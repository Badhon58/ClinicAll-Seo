"use client";
import React from "react";
import { NewProduct } from "./Interface";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { addToCart } from "@/redux/Slices/CartSlicer";
import { useTranslation } from "react-i18next";

const MediCart = ({ product }: { product: NewProduct }) => {
  const dispatch = useAppDispatch();
  const productItem = useAppSelector((state) => state.CartSlicer.cartitems);
  const added = productItem.some(
    (addedproduct) => addedproduct._id == product?._id
  );
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const price =
      product.discount_percentage! >= 8
        ? (Number(product?.price ?? 0) * 0.95).toFixed(2)
        : Number(product?.price ?? 0);
    const newproduct = {
      ...product,
      price: price.toString(),
      mrp: product.price,
    };
    // console.log(price);
    
    dispatch(addToCart(newproduct));
  };
  const { t } = useTranslation();

  return (
    <div className=" bg-[#fff4f4] rounded-[5px] p-2.5  min-h-[300px] flex flex-col justify-between">
      <div className=" flex flex-col  items-center justify-center bg-white p-2.5 rounded-[10px] ">
        <Image
          src={product?.images ? product.images : "/homeLogo/MediMart.svg"}
          alt={product?.product_name ? product.product_name : ""}
          width={90}
          height={84}
          // fill={true}
          className="object-cover  w-24 h-[100px]"
        />
      </div>
      <div className="">
        <p className="2xl:text-xl text-lg font-[550] min-h-[60px] tracking-normal text-[#16020b] line-clamp-2 ">
          {product?.product_name}
        </p>
        <p className="text-xs 2xl:text-sm font-medium text-[#3a3a3c] line-clamp-1">
          {product?.generic_name}
        </p>
        <p className="text-[11px] 2xl:text-xs min-h-4 font-normal text-[#16020b]">
          {product?.company_name ? product?.company_name : "N/A"}
        </p>
        <p className=" min-h-6 flex space-x-1 items-center mt-0.5 font-semibold text-[#3a3a3c] text-sm">
          <span
            className={product.discount_percentage! >= 8 ? "line-through" : ""}
          >
            {t("moneyCount", { count: Number(product?.price ?? "0") })}
          </span>
          <span className={product?.discount_percentage! >= 8 ? "" : "hidden"}>
            {product?.discount_percentage! >= 8
              ? `( ${t("numberconvert", { count: 5 })} % )`
              : ""}
          </span>
          <span className={product?.discount_percentage! >= 8 ? "" : "hidden"}>
            {product?.discount_percentage! >= 8
              ? t("moneyCount", {
                  count: Number(
                    (Number(product?.price ?? 0) * 0.95).toFixed(2)
                  ),
                })
              : ""}
          </span>
        </p>
      </div>
      <button
        onClick={handleClick}
        type="button"
        className={`w-[105px] cursor-pointer px-2  py-1.5 text-xs font-medium  hover:text-white hover:bg-[#EB148C] rounded border border-[#EB148C] ${
          added && "bg-[#EB148C] text-white"
        }`}
        disabled={added}
      >
        {added ? t("added") : t("add_to_cart")}
      </button>
    </div>
  );
};

export default MediCart;
