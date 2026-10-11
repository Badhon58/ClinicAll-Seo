import Invoice from "@/components/common/Invoice";
import { Suspense } from "react";
import Loading from "./loading";
import Blinvoice from "@/components/common/BlInvoice/Blinvoice";
import * as crypto from "crypto";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";

export default async function ReceiptPage({
  searchParams,
}: {
  searchParams?: Promise<{
    auth_trans_ref_no: string;
    auth_time?: string;
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
    labsampleCollectionTime?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  apiCall(
    Methods.GET,
    EndPoint.GETPACKAGEBYINVOICENUMBER +
      "/" +
      resolvedSearchParams?.req_reference_number
  )
    .then(async (resp) => {
      if (resp.success) {
        if (resp.data.ref == "BL") {
          const apiKey = process.env.NEXT_PUBLIC_BL_PAYMENT_RESP_API_KEY || "";
          const secret = process.env.NEXT_PUBLIC_BL_PAYMENT_RESP_SECRET || "";
          const timestamp = Math.floor(Date.now() / 1000);
          const data = apiKey + timestamp;
          const hash = crypto
            .createHmac("sha256", secret)
            .update(data)
            .digest("hex");
          // Fetch node
          const response = await fetch(
            "https://myblapi-test.banglalink.net/api/partner/auth/get-access-token",
            {
              method: "POST",
              headers: {
                "partner-api-key": apiKey,
                "partner-secret": secret,
                "partner-hash": hash,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "partner-name": "clinicall",
                timestamp: timestamp,
              }),
            }
          );
          const result = await response.json();
          const raw = resolvedSearchParams?.auth_time || "2025-12-18T061943Z";
          const iso =
            raw.slice(0, 11) +
            raw.slice(11, 13) +
            ":" +
            raw.slice(13, 15) +
            ":" +
            raw.slice(15, 17) +
            "Z";

          const trnsTime = new Date(iso)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
          const response2 = await fetch(
            "https://myblapi-test.banglalink.net/api/v1/partners/clinicall/transactions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${result.data.access_token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                msisdn: "0" + resolvedSearchParams?.phone_no,
                amount: Number(resolvedSearchParams?.auth_amount),
                transaction_id: resolvedSearchParams?.auth_trans_ref_no,
                transaction_time: trnsTime,
                status: "Success",
              }),
            }
          );

          const result2 = await response2.json();
          console.log("REsult2: ", result2);
        }
      }
    })
    .catch((error) => {
      console.log("ERR", error);
    });
  return (
    <Suspense fallback={<Loading />}>
      <Blinvoice {...resolvedSearchParams} />
    </Suspense>
  );
}
