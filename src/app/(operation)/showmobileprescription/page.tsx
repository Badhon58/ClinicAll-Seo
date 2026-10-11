"use client";
import { EndPoint, Methods } from "@/api/config";
import { PrescriptionPrint } from "@/components/common/PrescriptionPrint";
import { Appointment } from "@/components/DoctorAccount/interface";
import PrescriptionHeader from "@/components/DoctorAccount/PrescriptionHeader";
import PageLoading from "@/components/Seo/PageLoading";
import { apiCall } from "@/lib/axios-client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [prescription, setPrescription] = useState<Appointment>();
  const searchParams = useSearchParams();
  const search = searchParams.get("appoitment");
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint: any = useReactToPrint({
    contentRef,
    documentTitle: "Prescription..",
  });

  const init = async () => {
    try {
      setLoading(true);
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.PRESCRIPTION_GET_BY_ID}/${search}`
      );
      console.log(response);
      if (response.success) {
        setPrescription(response.data);
        // setTimeout(() => {
        //   handlePrint();
        // }, 3000);
      }
      //   handlePrint();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (prescription) {
      const timer = setTimeout(() => {
        handlePrint();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [prescription]);

  return loading ? (
    <PageLoading />
  ) : (
    <section>
      {prescription &&
        <PrescriptionPrint innerRef={contentRef} data={prescription} />
      }
    </section>
  );
};

export default page;
