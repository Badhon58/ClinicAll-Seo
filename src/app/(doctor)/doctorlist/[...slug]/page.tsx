import { Suspense } from "react";
import Loading from "../loading";
import DoctorPayment from "@/components/Doctor/DoctorPayment";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const allslug = (await params).slug;
  const _doc_id_ = allslug[0];
  const _date_ = allslug[1];
  const _time_ = allslug[2];

  return (
    <Suspense fallback={<Loading />}>
      <DoctorPayment _doc_id_={_doc_id_} _date_={_date_} _time_={_time_} />
    </Suspense>
  );
}
