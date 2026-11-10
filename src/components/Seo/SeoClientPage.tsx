import { Metadata } from 'next';
import React from 'react'
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
             title: "CliniCall - Best Online Doctor Consultation in BD",
        description:
            "CliniCall – The leading telemedicine platform in BD. Get expert online doctor consultations anytime, anywhere. trusted & secure healthcare.",
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
            },

        }
    }

    return {
        title: "CliniCall - Best Online Doctor Consultation in BD",
        description:
            "CliniCall – The leading telemedicine platform in BD. Get expert online doctor consultations anytime, anywhere. trusted & secure healthcare.",
    };
}

const SeoClientPage = () => {
    return (
        <div>SeoClientPage</div>
    )
}

export default SeoClientPage