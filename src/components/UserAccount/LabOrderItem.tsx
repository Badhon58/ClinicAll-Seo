import React, { useEffect, useState } from "react";
import { LabOrder } from "./Interface";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { getUserID } from "@/lib/authHandler";
import OrderHistoryCard from "./OrderHistoryCard";
import PageLoading from "../Seo/PageLoading";

const LabOrderItem = () => {
  const [labOrderHistory, setLabOrderHistory] = useState<LabOrder[]>();
  const [loading, setLoading] = useState(true);
  const init = async () => {
    try {
      setLoading(true);
      const userId: any = await getUserID();
      await apiCall(Methods.GET, `${EndPoint.LABORDERHISTORY}/${userId}`)
        .then((response) => {
          setLabOrderHistory(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, []);

  if (labOrderHistory && labOrderHistory?.length <= 0) {
    return <p className="text-xl font-medium p-3">Order Not Found </p>;
  }

  return loading ? (
    <PageLoading />
  ) : (
    <>
      {labOrderHistory?.map((item, index) => (
        <div
          key={index}
          className="shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)] rounded-md my-3"
        >
          <OrderHistoryCard item={item} />
        </div>
      ))}
    </>
  );
};

export default LabOrderItem;
