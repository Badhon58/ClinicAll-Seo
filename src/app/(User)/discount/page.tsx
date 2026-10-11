import DiscountSearch from "@/components/Discount/DiscountSearch";
import { Suspense } from "react";
import Loading from "./loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <DiscountSearch />
    </Suspense>
  );
};

export default page;
