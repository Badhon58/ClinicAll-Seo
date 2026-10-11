import React from "react";
import { NewProduct } from "../MediMart/Interface";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { addToCart } from "@/redux/Slices/CartSlicer";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const ProductCart = ({
  item,
  setDropDown,
  setSearchTerm,
}: {
  item: NewProduct;
  setDropDown: any;
  setSearchTerm: any;
}) => {
  const dispatch = useAppDispatch();
  const productItem = useAppSelector((state) => state.CartSlicer.cartitems);
  const added = productItem.some((lab) => lab._id == item?._id);
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const price =
      item.discount_percentage! >= 8
        ? (Number(item?.price ?? 0) * 0.95).toFixed(2)
        : Number(item?.price ?? 0);
    const newproduct = {
      ...item,
      price: price.toString(),
    };
    dispatch(addToCart(newproduct));
  };

  const { t } = useTranslation();
  const handleDropDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropDown(false);
    setSearchTerm("");
    router.push(`/mediMart/medicine/${item.product_slug}`);
  };
  return (
    <>
      <div onClick={handleDropDown} className="col-span-8 grid grid-cols-8 cursor-pointer">
        <Image
          src={item.images || "/homeLogo/MediMart.svg"}
          alt={item.product_name || "Product"}
          width={100}
          height={100}
          className="w-20 h-20 col-span-2 p-2 border rounded-md "
        />
        <div className="col-span-6 pl-3">
          <p className="text-sm font-medium ">{item.product_name}</p>
          <p className="text-xs font-[450] line-clamp-1 text-gray-600">
            {item.generic_name}
          </p>
          <p className="text-[11px] 2xl:text-xs min-h-4 font-normal text-[#16020b]">
            {item?.company_name ? item?.company_name : "N/A"}
          </p>
          <p className="text-xs min-h-6 flex space-x-3 items-center mt-0.5">
            <span
              className={item.discount_percentage! >= 8 ? "line-through" : ""}
            >
              {t("moneyCount", { count: Number(item?.price ?? "0") })}
            </span>
            <span className={item?.discount_percentage! >= 8 ? "" : "hidden"}>
              {item?.discount_percentage! >= 8
                ? `( ${t("numberconvert", { count: 5 })} % )`
                : ""}
            </span>
            <span className={item?.discount_percentage! >= 8 ? "" : "hidden"}>
              {item?.discount_percentage! >= 8
                ? t("moneyCount", {
                    count: Number((Number(item?.price ?? 0) * 0.95).toFixed(2)),
                  })
                : ""}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-end col-span-3 ">
        <button
          onClick={handleClick}
          type="button"
          className={`w-full md:w-[105px] cursor-pointer px-2  py-1.5 text-[10px] lg:text-xs font-medium  hover:text-white hover:bg-[#EB148C] rounded border border-[#EB148C] ${
            added ? "bg-[#EB148C] text-white" : ""
          }`}
          disabled={added}
        >
          {added ? t("added") : t("add_to_cart")}
        </button>
      </div>
    </>
  );
};

export default ProductCart;
