"use client";
import PrimaryText from "@/components/common/PrimaryText";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { apiCall } from "@/lib/axios-client";
import { EndPoint, JsonHeader, Methods } from "@/api/config";
import PageLoading from "../Seo/PageLoading";
import "./style.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  LabOrder,
  LabPackageOrder,
  Order,
  PatientOrder,
  Subscription,
} from "./interface";
import MedicineInvoice from "./Invoices/MedicineInvoice";
import LabInvoice from "./Invoices/LabInvoice";
import PackageInvoice from "./Invoices/PackageInvoice";
import AppInvoice from "./Invoices/AppInvoice";
import { Appointment } from "./interface";
import { useAppDispatch } from "@/redux/Hooks";
import { clearCart } from "@/redux/Slices/CartSlicer";
import { clearLab } from "@/redux/Slices/LabSlice";
import { singleclearCart } from "@/redux/Slices/SingleCartSlicer";
import LabPackage from "./Invoices/LabPackage";
import PhysicalDoctor from "./Invoices/PhysicalDoctor";
import { toast } from "react-toastify";
import { careGiverResponse } from "../CareGiver/Interface";
import CareGiverInvoice from "./Invoices/CareGiverInvoice";
const Invoice = ({
  auth_trans_ref_no,
  auth_time,
  req_reference_number,
  auth_amount,
  firstName,
  lastName,
  address_line1,
  address_city,
  country,
  phone_no,
  email,
  card_type,
  card_number,
  auth_code,
  auth_reconciliation_reference_number,
  paymentID,
  status,
}: {
  auth_time?: string;
  auth_trans_ref_no?: string;
  req_reference_number?: string;
  auth_amount?: string;
  firstName?: string;
  lastName?: string;
  address_line1?: string;
  address_city?: string;
  country?: string;
  phone_no?: string;
  email?: string;
  card_type?: string;
  card_number?: string;
  auth_code?: string;
  auth_reconciliation_reference_number?: string;
  paymentID?: string;
  status?: string;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<string>();
  const [referancenumber, setreferancenumber] = useState<string>("");

  //Details
  const [orderId, setorderId] = useState<string>(
    `${auth_trans_ref_no || req_reference_number}`
  );
  const handlePrint: any = useReactToPrint({
    contentRef,
    documentTitle: `${req_reference_number || auth_trans_ref_no || referancenumber
      }`,
  });

  const [authFailed, setAuthFailed] = useState(false);
  const [statusCode, setStatusCode] = useState<string>("");
  const [bkashfailedmessage, setBkashfailedmessage] = useState<string>("");
  const router = useRouter();
  const [medicineResponse, setMedicineResponse] = useState<Order>();
  const [labResponse, setLabResponse] = useState<LabOrder>();
  const [packageResponse, setPackageResponse] = useState<Subscription>();
  const [appoitmentResponse, setappoitmentResponse] = useState<Appointment>();
  const [labPackageResponse, setLabPackageResponse] =
    useState<LabPackageOrder>();
  const [PhysicalDoctorResponse, setPhysicalDoctorResponse] =
    useState<PatientOrder>();
  const [careGiverResponse, setCareGiverResponse] = useState<careGiverResponse>()
  const searchparams = useSearchParams();
  const invoiceNumber = searchparams.get("invoicenumber");
  const site = searchparams.get("site");
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [dataloading, setDataloading] = useState(false);
  const init = async () => {
    try {
      setLoading(true);
      if (status === "success") {
        // console.log("Bkash");
        await handleSuccess();
        // console.log('bkai');
      } else if (status === "failure") {
        await handleFailure();
        // console.log('bkai');
        console.log("handleFail");
      } else if (status === "cancel") {
        if (site === "microsite") {
          router.push("/microsite/cancel");
        } else {
          router.push("/cancel");
        }
        // console.log('bkai');
        console.log("cancel");
      } else {
        await handleDefault();
        // console.log('COD');
        // console.log("Card");
      }
    } catch (error) {
      console.error("Error in init:", error);
    } finally {
      setLoading(false);
    }
  };

  // handle Success
  const handleSuccess = async () => {
    try {
      setDataloading(true);
      const value = { paymentID };
      // console.log(req_reference_number);

      const gift = searchparams.get("gift");
      setreferancenumber(invoiceNumber ?? "");
      await reqreferencenumber(invoiceNumber ?? "");
      const response = await apiCall(
        Methods.POST,
        EndPoint.BKPAYMENTEXECUTE,
        value,
        JsonHeader
      );
      // console.log("Bk payment exext", response);

      if (response?.success && response.data.statusCode !== "2029") {
        const paymentInfo = {
          payer_authentication_transaction_id: response?.data?.trxID,
          auth_trans_ref_no: response?.data?.merchantInvoiceNumber,
          req_payment_method: "mobile-banking",
          req_payer_authentication_merchant_name: "bKash",
          req_amount: response?.data?.amount,
          isGift: gift === "true" ? true : false,
          // auth_code: response?.data?.auth_code,
        };
        // console.log("payment Info  ", paymentInfo);
        const elbresponse = await apiCall(
          Methods.POST,
          EndPoint.EBLPAYMENTCALLBACK,
          paymentInfo,
          JsonHeader
        );
        // console.log("Calback Response", elbresponse);

        if (elbresponse?.success) {
          const referenceNumber = response?.data?.merchantInvoiceNumber ?? "";
          await reqreferencenumber(referenceNumber);
          setreferancenumber(referenceNumber);
          dispatch(clearLab());
          dispatch(clearCart());
        }
      } else {
        setAuthFailed(true);
        setBkashfailedmessage(response.data.statusMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDataloading(false);
    }
  };

  // handleFailure
  const handleFailure = async () => {
    try {
      setDataloading(true);
      setAuthFailed(true);
      const value = { paymentID };
      const response = await apiCall(
        Methods.POST,
        EndPoint.BKPAYMENTEXECUTE,
        value,
        JsonHeader
      );
      // console.log(response);

      if (response.success) {
        const statusCode = response?.data?.statusCode;
        const statusMessage = response?.data?.statusMessage;

        if (statusCode && statusMessage) {
          setStatusCode(statusCode);
          setBkashfailedmessage(statusMessage);
        } else {
          console.error("Invalid response structure:", response);
        }
      } else {
        console.error("API call failed:", response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDataloading(false);
    }
  };

  // Handle Default
  const handleDefault = async () => {
    try {
      setDataloading(true);
      dispatch(clearCart());
      dispatch(clearLab());
      dispatch(singleclearCart());
      const referenceNumber = auth_trans_ref_no ?? req_reference_number ?? "";
      await reqreferencenumber(referenceNumber);
      setreferancenumber(referenceNumber);
    } catch (error) {
      console.log(error);
    } finally {
      setDataloading(false);
    }
  };

  const reqreferencenumber = async (reqNumber: string) => {
    try {
      // setLoading(true);
      // lab Section
      setDataloading(true);
      if (reqNumber?.startsWith("LAB")) {
        const response = await apiCall(
          Methods.GET,
          `${EndPoint.GETLABTESTBYINVOICENUMBER}/${reqNumber}`
        );
        // console.log("Lab Items");
        // console.log(response);
        setLabResponse(response.data);
        setDate(response?.data?.createdAt);
        setorderId(`${response?.data?.invoiceNumber}`);
        // console.log(response?.data?.collectionTime);
      }
      // Medimrt Selection
      else if (reqNumber?.startsWith("MED")) {
        const response = await apiCall(
          Methods.GET,
          `${EndPoint.GETORDERBYINVOICENUMBER}/${reqNumber}`
        );
        // console.log("Med Items");
        // console.log(response);
        setMedicineResponse(response.data);
        setDate(response?.data?.createdAt);
        setorderId(`${response?.data?.invoiceNumber}`);
        // console.log("MED item", response);
      }
      // Appoitment Section
      else if (reqNumber?.startsWith("APP")) {
        const response = await apiCall(
          Methods.GET,
          `${EndPoint.GETDOCTORAPPBYINVOICENUMBER}/${reqNumber}`
        );
        // console.log("Appoitment");
        // console.log(response);
        setappoitmentResponse(response.data);
        setorderId(`${response?.data?.invoiceNumber}`);
        setDate(response?.data?.createdAt);
        // console.log("Appoitment item", response?.data?.createdAt);
      }
      // Package Section
      else if (reqNumber?.startsWith("PAK")) {
        const response = await apiCall(
          Methods.GET,
          `${EndPoint.GETPACKAGEBYINVOICENUMBER}/${reqNumber}`
        );
        // console.log("Pak");
        // console.log(response);
        setPackageResponse(response.data);
        setorderId(`${response?.data?.invoiceNumber}`);
        setDate(response?.data?.createdAt);
      }
      // labpackage invoice
      else if (reqNumber.startsWith("LPK")) {
        const response = await apiCall(
          Methods.GET,
          `${EndPoint.LAB_PACKAGE_GETBY_INVOICE}/${reqNumber}`
        );
        setLabPackageResponse(response.data);
        setorderId(`${response?.data?.invoiceNumber}`);
        setDate(response?.data?.createdAt);
      }
      // physical Doctor
      else if (reqNumber.startsWith("PYD")) {
        const response = await apiCall(
          Methods.GET,
          `${EndPoint.PHYSICAL_DOCTOR_GET_BY_INVOICE}/${reqNumber}`
        );
        setPhysicalDoctorResponse(response.data);
        setorderId(`${response?.data?.invoiceNumber}`);
        setDate(response?.data?.createdAt);
      }
      else if (reqNumber.startsWith("CGR")) {
        const response = await apiCall(
          Methods.GET,
          `${EndPoint.CARE_GIVER_GET_BY_INVOICE_ID}/${reqNumber}`
        );
        setCareGiverResponse(response.data);
        setorderId(`${response?.data?.invoiceNumber}`);
        setDate(response?.data?.createdAt);

      }
    } catch (error) {
      console.log(error);
    } finally {
      setDataloading(false);
    }
  };

  const handleHomeRoute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (pathname.startsWith("/microsite") || site === "microsite") {
      router.push("/microsite");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return loading || dataloading ? (
    <PageLoading />
  ) : authFailed ? (
    <section className="min-h-[70vh] xl:container xl:mx-auto flex flex-col items-center justify-center">
      <div className="p-16 border rounded-full flex items-center justify-center">
        <Image
          src={"/MediServices/paymentFailed.svg"}
          alt="Payment Failed"
          width={80}
          height={80}
        />
      </div>
      <p className="text-2xl font-medium"> {bkashfailedmessage} </p>
      <p className="text-sm">Please try Again </p>
      <button
        onClick={handleHomeRoute}
        className="p-4 border rounded-md border-[#EB148C]"
      >
        Return Home
      </button>
    </section>
  ) : (
    <section className="  mx-auto  xl:container shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)]  pb-10">
      <div
        ref={contentRef}
        className="printable-page px-2 py-5 lg:py-0 lg:pt-4 xl:pt-6 2xl:pt-8 lg:px-2 2xl:px-8 max-w-6xl   min-h-full  mx-auto flex flex-col justify-between "
      >
        {/* headers  */}
        <div className="p-6 flex justify-between items-center border border-[rgba(199, 201, 217, 1)] rounded-lg shadow-[0px_4px_30px_0px_rgba(26,_28,_33,_0.05)]">
          <div className="flex-1">
            <PrimaryText
              textcolor="text-[#eb148c]"
              fontsize="text-xl"
              fontweight="font-medium"
            >
              CliniCall Limited
            </PrimaryText>
            <p className="lg:w-[250px]  text-sm mt-0.5">
              Apartment # 8A, House # 3, Road # 2, Baridhara J block,
              Dhaka-1212, Bangladesh.{" "}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center flex-1">
            <Image
              src="/other/logo.svg"
              alt="Clinicall Logo"
              width={134}
              height={26}
            />
            <p className="mt-1.5 text-sm text-[#3a3a3c]">
              Order Placed :{" "}
              {/* {moment(auth_time, "YYYY-MM-DDTHH").format("YYYY-MM-DD")} */}
              {moment(date).format("DD/MM/YYYY")}
            </p>
          </div>
        </div>
        {/* order id  */}
        <div className="py-2 px-6 my-2 lg:my-6 bg-[#fff4f4] rounded-md">
          <PrimaryText
            textcolor="text-[#eb148c]"
            fontsize="text-sm "
            fontweight="font-medium"
          >
            {orderId.startsWith("APP")
              ? "Consultation ID # "
              : " Order Reference #"}
            {orderId}
          </PrimaryText>
        </div>
        {/* list Medicine */}
        {orderId.startsWith("MED") && (
          <MedicineInvoice
            medicineResponse={medicineResponse!}
            auth_code={auth_code!}
          />
        )}
        {/* List Order  */}
        {orderId.startsWith("LAB") && (
          <LabInvoice labResponse={labResponse!} auth_code={auth_code!} />
        )}
        {/* Package Order  */}
        {orderId.startsWith("PAK") && (
          <PackageInvoice
            packageResponse={packageResponse!}
            auth_code={auth_code!}
          />
        )}
        {/* Appoitment Booking */}
        {orderId.startsWith("APP") && (
          <AppInvoice
            AppoitmentResponse={appoitmentResponse!}
            auth_code={auth_code!}
          />
        )}
        {orderId.startsWith("LPK") && (
          <LabPackage
            labPackageResponse={labPackageResponse!}
            auth_code={auth_code!}
          />
        )}
        {orderId.startsWith("PYD") && (
          <PhysicalDoctor
            PhysicalDoctorResponse={PhysicalDoctorResponse!}
            auth_code={auth_code!}
          />
        )}
        {orderId.startsWith("CGR") && (
          <CareGiverInvoice
            careGiverResponse={careGiverResponse}
            auth_code={auth_code!}
          />
        )}
        <div className="">
          <span className="text-sm font-medium text-[#3a3a3c]">
            Refund Policy
          </span>
          <a
            href="https://theclinicall.com/refund-policy"
            className="text-sm underline font-medium text-[#3a3a3c] ml-3 "
          >
            www.theclinicall.com/refund-policy
          </a>
          <div className="flex justify-between items-center">
            <span className="text-[14px]">
              Call to our customer service number 096 776 010 50 or mail us at :{" "}
              customer.service@theclinicall.com
            </span>
            <span className="text-[9px]">
              {auth_trans_ref_no?.startsWith("LAB")
                ? "Powered by Thyrocare"
                : auth_trans_ref_no?.startsWith("MED")
                  ? "Powered by Efarma"
                  : ""}
            </span>
          </div>
        </div>
      </div>
      <div className=" mr-10 flex justify-end ">
        <button
          onClick={handlePrint}
          className="px-4  py-2  bg-[#E2136E] text-white font-medium rounded-md"
        >
          Download PDF
        </button>
      </div>
    </section>
  );
};

export default Invoice;
