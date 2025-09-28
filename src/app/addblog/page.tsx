import AddBlog from "@/components/AddBlog";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback="Loading..">
      <AddBlog />
    </Suspense>
  );
};

export default page;
