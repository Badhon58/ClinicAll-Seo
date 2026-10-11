"use client";
import { EndPoint, Methods } from "@/api/config";
import { OrderHistory } from "@/components/UserAccount/Interface";
import Invoice from "@/components/common/Invoice";
import { apiCall } from "@/lib/axios-client";
import { useAppSelector } from "@/redux/Hooks";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const page = () => {
  const [OrderHistoryDetail, setOrderHistoryDetail] = useState<OrderHistory>();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const searchId = searchParams.get("id");
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
        // console.log(data);

        setOrderHistoryDetail(data);
      } else if (searchId?.startsWith("PYD")) {
        const { data } = await apiCall(
          Methods.GET,
          `${EndPoint.PHYSICAL_DOCTOR_GET_BY_INVOICE}/${searchId}`
        );
        // console.log(data);

        setOrderHistoryDetail(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);
  return loading ? (
    <div className="min-h-[70vh]">loading...</div>
  ) : (
    <section className="min-h-full xl:container xl:mx-auto px-2 lg:pt-3 xl:pt-6 2xl:pt-8  shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)]">
      <div className="mb-3">
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
      </div>
    </section>
  );
};

export default page;
