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


export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  return {
    title: "Clinicall About | Test 19",
    description: "Learn about CliniCall, Bangladesh's leading telemedicine platform. Providing trusted online doctor consultations and healthcare services.",
    keywords: [
      "About CliniCall",
      "CliniCall Bangladesh",
      "online healthcare Bangladesh",
      "online doctor consultation Bangladesh",
      "digital healthcare Bangladesh",
      "telemedicine Bangladesh",
      "healthcare services Bangladesh",
    ],

    openGraph: {
      title: "About CliniCall | Making Healthcare Accessible in Bangladesh",
      description:
        "Discover CliniCall's mission to make quality healthcare accessible to everyone in Bangladesh through online doctor consultations and digital healthcare services.",
      url: "https://theclinicall.com/about",
      siteName: "CliniCall",
      type: "website",
      locale: "en_BD",
      images: [
        {
          url: "https://theclinicall.com/og-about-us.jpg",
          width: 1200,
          height: 630,
          alt: "About CliniCall - Online Healthcare in Bangladesh",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "About CliniCall | Online Healthcare in Bangladesh",
      description:
        "Learn how CliniCall is making healthcare more accessible through online doctor consultations and digital health services.",
      images: ["https://theclinicall.com/og-about-us.jpg"],
    },

    alternates: {
      canonical: "https://theclinicall.com/about",
    },
  }
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
