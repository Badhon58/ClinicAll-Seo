import React, { ReactNode, Suspense } from "react";
import Loading from "./loading";
const layout = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default layout;
