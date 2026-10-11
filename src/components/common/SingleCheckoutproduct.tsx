"use client";
import React from "react";
import { NewProduct } from "../MediMart/Interface";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/redux/Hooks";

const SingleCheckoutproduct = ({
  deliveryCharge,
}: {
  deliveryCharge: string;
}) => {
  const { t } = useTranslation();
  const productItem = useAppSelector(
    (state) => state.singleCartSlice.cartitems
  );
  const producttotalCost = useAppSelector(
    (state) => state.singleCartSlice.cartTotalAmount
  );
  // Calculate the base price with discount logic
  //   console.log(typeof getProductPrice());
  console.log();

  return (
    <>
      <div className="">
        {productItem.length > 0 &&
          productItem.map((item: any, index) => {
            return (
              <div
                className={`flex justify-between p-2 ${
                  index % 2 == 0 && "bg-gray-100"
                }`}
                key={index}
              >
                <p className="w-[65%]">
                  {" "}
                  {item.product_name} {"("}
                  {t("numberconvert", {
                    count: Number(Number(item?.price?.toString()).toFixed(2)),
                  })}{" "}
                  *{" "}
                  {t("numberconvert", {
                    count: item?.quantity?.toString(),
                  })}
                  {")"}
                </p>
                <p className="text-start w-[23%]">
                  {t("moneyCount", {
                    count: parseFloat(item.itemCost.toFixed(2)),
                  })}
                </p>
              </div>
            );
          })}
      </div>

      <hr className="my-2 border" />

      <p className="flex justify-between p-1 font-medium text-base leading-6">
        <span>{t("home_delivery_Checkout")}</span>
        <span className="w-[23%]">
          {t("moneyCount", {
            count: Number(deliveryCharge),
          })}
        </span>
      </p>

      <hr className="my-2 border" />

      <div className="flex justify-between text-lg font-medium">
        <span>{t("total_price")}</span>
        <span className="w-[23%]">
          {/* {t("moneyCount", {
            count: Number(producttotalCost + Number(deliveryCharge)),
          })} */}
          {t("moneyCount", {
            count: parseFloat(
              (producttotalCost + Number(deliveryCharge)).toFixed(2)
            ),
          })}
        </span>
      </div>
    </>
  );
};

export default SingleCheckoutproduct;
