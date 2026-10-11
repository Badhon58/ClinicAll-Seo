"use client";

import dynamic from "next/dynamic";

const LiteYouTube = dynamic(() => import("react-lite-youtube-embed"), {
  ssr: false,
});

interface VideoProps {
  type?: string;
  id: string;
  title: string;
}

export default function Video({ type, id, title }: VideoProps) {
  const wrapperClass = `${
    type === "A"
      ? "lg:my-5 lg:mr-5 lg:col-span-7"
      : "flex items-center justify-center mx-auto mt-2 lg:w-[95%] w-[300px] lg:col-span-4"
  } border-8 border-white rounded-2xl overflow-hidden animationblock2`;

  return (
    <div className={wrapperClass}>
      {/* Aspect ratio container */}
      <div className="relative w-full h-full">
        <LiteYouTube
          id={id}
          title={title}
          style={{
            // position: "absolute",
            // top: 0,
            // left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}
