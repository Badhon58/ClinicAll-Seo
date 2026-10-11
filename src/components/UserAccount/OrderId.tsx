"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { OrderHistory } from "./Interface";
import Invoice from "../common/Invoice";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import PageLoading from "../Seo/PageLoading";
import { useTranslation } from "react-i18next";
import { IoChevronBackSharp } from "react-icons/io5";

const OrderId = () => {
  const [OrderHistoryDetail, setOrderHistoryDetail] = useState<OrderHistory>();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const searchId = searchParams.get("id");
  const router = useRouter();
  const init = async () => {
    try {
      setLoading(true);
      if (searchId?.startsWith("MED")) {
        const { data } = await apiCall(
          Methods.GET,
          `${EndPoint.GETORDERBYINVOICENUMBER}/${searchId}`
        );
        setOrderHistoryDetail(data);
      } else if (searchId?.startsWith("LAB")) {
        const { data } = await apiCall(
          Methods.GET,
          `${EndPoint.GETLABTESTBYINVOICENUMBER}/${searchId}`
        );
        setOrderHistoryDetail(data);
      } else if (searchId?.startsWith("LPK")) {
        const { data } = await apiCall(
          Methods.GET,
          `${EndPoint.LAB_PACKAGE_GETBY_INVOICE}/${searchId}`
        );
        setOrderHistoryDetail(data);
      } else if (searchId?.startsWith("PYD")) {
        const { data } = await apiCall(
          Methods.GET,
          `${EndPoint.PHYSICAL_DOCTOR_GET_BY_INVOICE}/${searchId}`
        );
        setOrderHistoryDetail(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlebackButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.back();
  };

  useEffect(() => {
    init();
  }, []);
  return loading ? (
    <PageLoading />
  ) : (
    <section className="min-h-full xl:container xl:mx-auto px-2 lg:pt-3 xl:pt-6 2xl:pt-8  shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)]">
      <div className=" flex items-center space-x-2 lg:px-2 xl:px-4 2xl:px-8 mb-2">
        <button onClick={handlebackButton} className=" p-1 hover:bg-gray-200 rounded-full">
          <IoChevronBackSharp size={19} />
        </button>
        <p className="text-lglg:text-xl xl:text-2xl font-semibold text-[#16020B] ">
          {t("Order Details")}
        </p>
      </div>
      <aside className="mb-3">
        <Invoice
          req_reference_number={OrderHistoryDetail?.invoiceNumber}
          auth_amount={OrderHistoryDetail?.totalCost?.toString()}
          firstName={OrderHistoryDetail?.user?.firstName}
          lastName={OrderHistoryDetail?.user?.lastName}
          address_line1={OrderHistoryDetail?.currentAddress?.address}
          address_city={OrderHistoryDetail?.currentAddress?.district}
          country={"Bangladesh"}
          phone_no={OrderHistoryDetail?.user?.phone}
          email={OrderHistoryDetail?.user?.email}
          card_type={OrderHistoryDetail?.paymentMethod}
          // card_number={OrderHistoryDetail?.paymentMethod}
          // auth_code={"helloAuthCode"}
          // auth_reconciliation_reference_number={"Hello Referance number"}
        />
      </aside>
    </section>
  );
};

export default OrderId;
