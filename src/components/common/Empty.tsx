import Link from "next/link";
import React from "react";

const Empty = ({ link }: { link: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[10vh] text-center">
      <div className="mb-4 text-6xl">😢</div>
      <p className="mb-4 text-4xl font-medium">OOOPS! NO Result FOUND</p>
      <p className="mb-6 text-lg">
        Try adjusting search or filter to find what you're looking for
      </p>
      <Link
        href={link || "/"}
        className="px-6 py-2 text-pink-500 transition duration-300 border-2 border-pink-500 rounded-full hover:bg-pink-500 hover:text-white"
      >
        Return Home
      </Link>
    </div>
  );
};

export default Empty;
