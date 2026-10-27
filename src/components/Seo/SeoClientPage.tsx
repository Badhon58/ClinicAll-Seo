// "use client";

// import dynamic from "next/dynamic";
// const Seopage = dynamic(() => import("./Seopage"), {
//     ssr: false,
// });

// export default function SeoClientPage() {
//     return <Seopage />;
// }



// import DOMPurify from "isomorphic-dompurify";

// interface HtmlRendererProps {
//   html: string;
//   className?: string;
// }

// export default function HtmlRenderer({
//   html,
//   className = "",
// }: HtmlRendererProps) {
//   const cleanHTML = DOMPurify.sanitize(html ?? "");

//   return (
//     <div
//       className={className}
//       dangerouslySetInnerHTML={{
//         __html: cleanHTML,
//       }}
//     />
//   );
// }