import SingleBlog from "@/components/SingleBlog";
import { Metadata } from "next";
import React, { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const decodedId = decodeURIComponent(params.id); // decode Bengali or special chars
    return {
      title: decodedId,
    };
  } catch (error) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be loaded.",
    };
  }
}

export default function Page({ params }: { params: { id: string } }) {
  const decodedId = decodeURIComponent(params.id);

  return (
    <Suspense fallback={"Loading..."}>
      <SingleBlog slugstring={decodedId} />
    </Suspense>
  );
}
