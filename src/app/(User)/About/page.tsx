// "use client"
import { Suspense } from "react";
import Loading from "./loading";
import Services from "@/components/Home/Services";
// import dynamic from "next/dynamic";
import Hero from "./Hero";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{
    _catagory_name_?: string;
  }>;
};


export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;

  const categoryName = params._catagory_name_;

  const formattedCategoryName = categoryName
    ? decodeURIComponent(categoryName)
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ")
    : "";

  if (categoryName) {

    return {
      title: `${formattedCategoryName} Doctors in Bangladesh | CliniCall`,
      description: `Find experienced ${formattedCategoryName} doctors in Bangladesh on CliniCall. Browse doctor profiles and book an online consultation with trusted specialists.`,
      keywords: [
        `${formattedCategoryName} doctor`,
        `${formattedCategoryName} doctors Bangladesh`,
        `best ${formattedCategoryName} doctor`,
        "online doctor consultation",
        "CliniCall",
      ],
      openGraph: {
        title: `${formattedCategoryName} Doctors in Bangladesh | CliniCall`,
        description: `Find experienced ${formattedCategoryName} doctors in Bangladesh and book an online consultation through CliniCall.`,
        type: "website",
      },
    };
  }

  return {
    title: "About Us Test 11 | CliniCall",
    description:
      "Find the best doctors in Bangladesh on CliniCall. Browse our doctor list and get expert online consultations.",
  };
}

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* <DoctorList /> */}
      <Services />
      <Hero />
    </Suspense>

  );
};

export default page;
