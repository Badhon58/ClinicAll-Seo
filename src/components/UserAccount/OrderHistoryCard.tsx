import Link from "next/link";
import React from "react";
import { Order } from "./Interface";
import moment from "moment";
import { useTranslation } from "react-i18next";

const OrderHistoryCard = ({
  item,
}: {
  // item: Order;
  item: any;
}) => {
  const handleReOrder = (e: React.MouseEvent<HTMLButtonElement>, item: any) => {
    e.preventDefault();
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="flex justify-between px-4 py-3 border-b">
        <p className="text-lg font-medium text-[#16020B]">
          {t("Order Details")} : {item.invoiceNumber}
        </p>
        <p className="capitalize text-lg font-medium text-[#16020B]">
          {item.shippingMethod}
        </p>
      </div>
      <div className="px-4 py-1.5 flex justify-between">
        <div>
          <p>{item?.user?.firstName || item?.userId?.firstName}</p>
          <p>
            {item?.user?.dialCode || item?.userId?.dialCode}{" "}
            {item?.user?.phone || item?.userId?.phone}
          </p>
          <p>{item?.user?.address || item?.userId?.address}</p>
        </div>
        <p>Date: {moment(item.createdAt).format("DD/MM/YYYY")}</p>
      </div>
      <div className="flex justify-between px-4 mt-2">
        <p className="text-base font-semibold text-[#16020B]">
          {t("AmountPayable")}
        </p>
        <p className="text-base font-semibold">
          {t("moneyCount", { count: item.totalCost })}
        </p>
      </div>
      <hr />
      <div className="flex justify-between px-4 py-3">
        <p>
          <span>{t("Status")} : </span>
          <span className="bg-[#F4FFF3] capitalize p-2 font-medium text-[#5F8D4E] text-base rounded-lg">
            {item.paymentStatus}
          </span>{" "}
        </p>
        <div className="flex space-x-3">
          <Link
            href={`/account/OrderId?id=${item.invoiceNumber}`}
            className="bg-[#E2136E] py-2 px-4 text-sm font-semibold rounded-md text-white duration-500"
          >
            {t("ViewDetails")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderHistoryCard;
