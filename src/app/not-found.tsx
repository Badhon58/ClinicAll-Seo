import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer/Footer";

export default function NotFound() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar />
      </Suspense>
      <div className="flex flex-col items-center justify-center min-h-[77vh] text-center">
        <div className="mb-4 text-6xl">😢</div>
        <h1 className="mb-4 text-4xl font-bold">OOOPS! PAGE NOT FOUND</h1>
        <p className="mb-6 text-lg">
          Sorry the page you are looking for does not exist, if you think
          something is broken, report a problem
        </p>
        <button className="px-6 py-2 text-pink-500 transition duration-300 border-2 border-pink-500 rounded-full hover:bg-pink-500 hover:text-white">
          Return Home
        </button>
      </div>
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </>
  );
}
