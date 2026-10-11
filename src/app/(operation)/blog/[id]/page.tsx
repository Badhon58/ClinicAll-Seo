import React, { Suspense } from "react";
import Loading from "../loading";
import SingleBlog from "./SingleBlog";
import { Metadata } from "next";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { BlogData } from "../interface";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>; 
}): Promise<Metadata> {
  try {
    const slugstring = (await params).id;
    const res = await apiCall(
      Methods.GET,
      `${EndPoint.SINGLE_BLOG_HOME}/${slugstring}`
    );
    const blog: BlogData = res.data;

    return {
      title: blog.title,
      description: blog.metaDescription,
    };
  } catch (error) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be loaded.",
    };
  }
}
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const slugstring = (await params).id;

  return (
    <Suspense fallback={<Loading />}>
      <SingleBlog title={slugstring} />
    </Suspense>
  );
}
