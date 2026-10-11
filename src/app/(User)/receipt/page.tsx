import Invoice from "@/components/common/Invoice";
import { Suspense } from "react";
import Loading from "./loading";

export default async function ReceiptPage({
  searchParams,
}: {
  searchParams?: Promise<{
    auth_trans_ref_no?: string;
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
  return (
    <Suspense fallback={<Loading />}>
      <Invoice {...resolvedSearchParams} />
    </Suspense>
  );
}
