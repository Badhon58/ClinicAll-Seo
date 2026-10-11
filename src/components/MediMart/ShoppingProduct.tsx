"use client";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import {
  removeSingleCount,
  addToCart,
  removeFromCart,
} from "@/redux/Slices/CartSlicer";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { t } from "i18next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ShoppingProduct = () => {
  const Product = useAppSelector((state) => state.CartSlicer.cartitems);
  const dispatch = useAppDispatch();
  const hadleRemoveSingleProduct = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: any
  ) => {
    e.preventDefault();
    dispatch(removeSingleCount(item));
  };
  const hadleAddSingleProduct = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: any
  ) => {
    e.preventDefault();
    // console.log(item);

    dispatch(addToCart(item));
  };
  const RemoveFromCarts = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: any
  ) => {
    e.preventDefault();
    dispatch(removeFromCart(item));
  };

  return (
    <div className="h-full p-4 overflow-y-auto max-h-[75vh] lg:min-h-[65vh] 2xl:min-h-[75vh] lg:max-h-[78vh] xl:max-h-[75vh] 2xl:max-h-[80vh] bg-scroll">
      {Product.length > 0 ? (
        Product.map((item, index) => (
          <div
            key={index}
            className="border mb-2 p-2 rounded-md shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] grid grid-cols-12 "
          >
            <div className="col-span-3 lg:col-span-2 rounded-md flex items-center">
              <Image
                src={item?.images ?? "/"}
                alt={`${item.product_name}`}
                width={100}
                height={90}
                className=" p-1 border"
              />
            </div>
            <div className=" mx-2 col-span-8 lg:col-span-9 ">
              <p className="text-[15px] font-semibold 2xl:text-base line-clamp-2">
                {item.product_name}{" "}
                <span className="text-xs font-medium">
                  ( {item.generic_name})
                </span>
              </p>
              <p className="text-xs font-[550] 2xl:text-sm py-1">
                {t("moneyCount", {
                  count: parseFloat(Number(item.itemCost).toFixed(2)),
                })}
              </p>
              <div className=" flex items-center justify-between space-x-2 w-full lg:w-4/6 2xl:w-3/6 ">
                <p className="text-xs font-medium 2xl:text-sm">
                  {t("Quantity")}
                </p>
                <div className="flex items-center justify-between px-2 w-full  border rounded-md border-opacity-80 border-[#EB148C]">
                  <button onClick={(e) => hadleRemoveSingleProduct(e, item)}>
                    <FaMinus />
                  </button>
                  <p className="text-lg 2xl:text-xl">
                    {" "}
                    {t("numberconvert", {
                      count: item.quantity,
                    })}
                  </p>
                  <button onClick={(e) => hadleAddSingleProduct(e, item)}>
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid lg:place-items-end lg:col-span-1">
              <button
                className=""
                onClick={(e) => RemoveFromCarts(e, item._id)}
              >
                <Image src="/other/trash.svg" alt="" width={20} height={20} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-xl font-medium">{t("Your Cart is Empty")}</p>
          <Link
            href={"/mediMart"}
            className=" px-2 py-1.5  text-base font-medium  text-white bg-[#EB148C] rounded"
          >
            {t("Add Product/Packages")}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShoppingProduct;
