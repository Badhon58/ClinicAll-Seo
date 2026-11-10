// "use client"
import { Suspense } from "react";
import Loading from "./loading";
import Services from "@/components/Home/Services";
// import dynamic from "next/dynamic";
import Hero from "./Hero";
import { Metadata } from "next";

// type Props = {
//   searchParams: Promise<{
//     _catagory_name_?: string;
//   }>;
// };


// export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
//   return {
//     title: "Clinicall About | Test 28",
//     description: "Learn about CliniCall, Bangladesh's leading telemedicine platform. Providing trusted online doctor consultations and healthcare services.",
//     keywords: [
//       "About CliniCall",
//       "CliniCall Bangladesh",
//       "online healthcare Bangladesh",
//       "online doctor consultation Bangladesh",
//       "digital healthcare Bangladesh",
//       "telemedicine Bangladesh",
//       "healthcare services Bangladesh",
//     ],

//     openGraph: {
//       title: "About CliniCall | Making Healthcare Accessible in Bangladesh",
//       description:
//         "Discover CliniCall's mission to make quality healthcare accessible to everyone in Bangladesh through online doctor consultations and digital healthcare services.",
//       url: "https://theclinicall.com/about",
//       siteName: "CliniCall",
//       type: "website",
//       locale: "en_BD",
//       images: [
//         {
//           url: "https://theclinicall.com/og-about-us.jpg",
//           width: 1200,
//           height: 630,
//           alt: "About CliniCall - Online Healthcare in Bangladesh",
//         },
//       ],
//     },

//     twitter: {
//       card: "summary_large_image",
//       title: "About CliniCall | Online Healthcare in Bangladesh",
//       description:
//         "Learn how CliniCall is making healthcare more accessible through online doctor consultations and digital health services.",
//       images: ["https://theclinicall.com/og-about-us.jpg"],
//     },

//     alternates: {
//       canonical: "https://theclinicall.com/about",
//     },
//   }
// }

type Props = {
  searchParams: Promise<{
    _catagory_name_?: string;
  }>;
};


export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;

  const categoryName = "About US";

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
      title: `Clinicall About | Test 29`,
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
    title: "BD Doctor List | CliniCall",
    description:
      "Find the best doctors in Bangladesh on CliniCall. Browse our doctor list and get expert online consultations.",
  };
}

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      {/* <DoctorList /> */}
      <div id="about">

        <Services />
        <Hero />
      </div>
    </Suspense>

  );
};

export default page;
