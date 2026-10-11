import React, { useEffect, useState } from "react";
import { LabPackageOrder } from "../common/interface";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { getUserID } from "@/lib/authHandler";
import PageLoading from "../Seo/PageLoading";
import OrderHistoryCard from "./OrderHistoryCard";

const HealthCheckUpOrder = () => {
  const [labpackage, setLabpackage] = useState<LabPackageOrder[]>();
  const [loading, setLoading] = useState(false);
  const init = async () => {
    try {
      setLoading(true);
      const userId: any = await getUserID();
      await apiCall(
        Methods.GET,
        `${EndPoint.LAB_PACKAGE_GET_BY_USER_ID}/${userId}`
      )
        .then((response) => {
          setLabpackage(response.data);
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
  if (labpackage && labpackage?.length <= 0) {
    return <p className="text-xl font-medium p-3">Order Not Found </p>;
  }
  return loading ? (
    <PageLoading />
  ) : (
    <>
      {labpackage?.map((item, index) => (
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

export default HealthCheckUpOrder;
