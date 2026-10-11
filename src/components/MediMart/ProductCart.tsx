import React, { useEffect, useState } from "react";
import { MediProductInterface } from "./Interface";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { addToCart } from "@/redux/Slices/CartSlicer";
import { convertToBanglaNumber } from "@/lib/ConvertBanglatoEnglsh";

const ProductCart = ({ item }: { item: MediProductInterface }) => {
  const dispatch = useAppDispatch();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const cartItem = {
      _id: item?._id || undefined,
      title: item?.title || undefined,
      generic: item?.product_details || undefined,
      mrp: item?.discount_price
        ? item.discount_price || undefined
        : item?.mrp || undefined,
      image: item?.images?.[0]?.url || undefined,
      itemType: "mediMart",
    };
    if (item) {
      dispatch(addToCart(cartItem));
    } else {
      console.log("Something went wrong");
    }
  };
  const productItem = useAppSelector((state) => state.CartSlicer.cartitems);
  const added = productItem.some((lab) => lab._id == item?._id);
  const language = useAppSelector((state) => state.languageSlice.language);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <div className="max-w-xs p-2.5 rounded-lg bg-[#FFF4F4]">
      <Image
        src={item?.images?.[0]?.url || ""}
        alt="Product"
        className="object-contain w-full 2xl:h-40 xl:h-36 lg:h-28 h-28 md:h-28 py-2 mb-2 rounded-md sm:px-10 bg-[#FEEAEE]"
        width={105.703}
        height={153.999}
      />
      <h2 className="h-12 line-clamp-2">
        <span className="text-xl font-semibold leading-3 tracking-tight text-[#16020B]">
          {item?.title}
        </span>
      </h2>
      <p className="line-clamp-1 text-sm text-[#3A3A3C] font-medium">
        {item?.product_details}
      </p>
      <div className="flex items-center justify-between">
        {/* <p>star</p> */}

        {isHydrated ? (
          language == "bn" ? (
            <div className="mt-1 text-lg font-semibold text-[#3A3A3C]">
              {" "}
              {item?.discount_price ? (
                <p className="flex  leading-[18px]">
                  <span className="line-through">
                    {" "}
                    ৳ {convertToBanglaNumber(item?.mrp || 0)}
                  </span>
                  <span> - </span>
                  <span>
                    {" "}
                    ৳ {convertToBanglaNumber(item?.discount_price || 0)}
                  </span>
                </p>
              ) : (
                <p>৳ {convertToBanglaNumber(item?.mrp || 0)}</p>
              )}
            </div>
          ) : (
            <div className="mt-1 text-lg font-semibold text-[#3A3A3C]">
              {item?.discount_price ? (
                <p className="flex  leading-[18px]">
                  <span className="line-through">BDT {item?.mrp}</span>
                  <span> - </span>
                  <span> BDT {item?.discount_price}</span>
                </p>
              ) : (
                <p>BDT {item?.mrp}</p>
              )}
            </div>
          )
        ) : null}
      </div>
      <button
        onClick={handleClick}
        className="w-[105px] cursor-pointer px-2 py-1.5 mt-4  text-xs font-medium  hover:text-white hover:bg-[#EB148C] rounded border border-[#EB148C]"
        disabled={added}
      >
        {added
          ? language === "bn"
            ? "যোগ হয়েছে"
            : "Added"
          : language === "bn"
          ? "কার্টে যোগ করুন"
          : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCart;
