import AllBlogList from "@/components/AllBlogList";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback="Loading...">
      <AllBlogList />
    </Suspense>
  );
};

export default page;
