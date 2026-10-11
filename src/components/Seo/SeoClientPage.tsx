// "use client";

// import dynamic from "next/dynamic";
// const Seopage = dynamic(() => import("./Seopage"), {
//     ssr: false,
// });

// export default function SeoClientPage() {
//     return <Seopage />;
// }



"use client";

import DOMPurify from "dompurify";

interface HtmlRendererProps {
    html: string;
    className?: string;
}

export default function HtmlRenderer({
    html,
    className,
}: HtmlRendererProps) {
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(html),
            }}
        />
    );
}