import { Suspense } from "react";
import Loading from "./loading";
import Hero from "@/components/Home/Hero";
import Services from "@/components/Home/Services";
import Packages from "@/components/Home/Packages";
import Whoweare from "@/components/Home/Whoweare";
import Doctors from "@/components/Home/Doctors";
import Specialize from "@/components/Home/Specialize";
import Blog from "@/components/Home/Blog";
import Client from "@/components/Home/Client";
import Diagnosis from "@/components/Home/Diagnosis";
import Download from "@/components/Home/Download";
import Question from "@/components/Home/Question";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Seopage from "@/components/Seo/Seopage";
import Color from "@/components/Home/Color";
import Partner from "@/components/Home/Partner";
import ScrollButton from "@/components/Home/ScrollButton";
import OverView from "@/components/Home/OverView";
import SeoClientPage from "@/components/Seo/SeoClientPage";
export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar />
      </Suspense>
      <section className="overflow-hidden">
        <Color />
        <Hero />
        <Services />
        <OverView />
        <Packages />
      </section>
      <Whoweare />
      <Doctors />
      <Specialize />
      <Partner />
      <Blog />
      <Client />
      <Diagnosis />
      <Question />
      <Download />
      <Footer />
      <SeoClientPage />
      <ScrollButton />
    </>
  );
}

// Step 1: Lazy import components
// import { Suspense, lazy } from "react";
// import Loading from "./loading";

// const Navbar = lazy(() => import("@/components/Navbar/Navbar"));
// const Hero = lazy(() => import("@/components/Home/Hero"));
// const Services = lazy(() => import("@/components/Home/Services"));
// const Packages = lazy(() => import("@/components/Home/Packages"));
// const Whoweare = lazy(() => import("@/components/Home/Whoweare"));
// const Doctors = lazy(() => import("@/components/Home/Doctors"));
// const Specialize = lazy(() => import("@/components/Home/Specialize"));
// const Partner = lazy(() => import("@/components/Home/Partner"));
// const Blog = lazy(() => import("@/components/Home/Blog"));
// const Client = lazy(() => import("@/components/Home/Client"));
// const Diagnosis = lazy(() => import("@/components/Home/Diagnosis"));
// const Question = lazy(() => import("@/components/Home/Question"));
// const Download = lazy(() => import("@/components/Home/Download"));
// const Footer = lazy(() => import("@/components/Footer/Footer"));
// const Seopage = lazy(() => import("@/components/Seo/Seopage"));
// export default function Home() {
//   return (
//     <>
//       <Suspense fallback={<Loading />}>
//         <Navbar />
//       </Suspense>

//       <section className="overflow-hidden">
//         <Suspense fallback={<Loading />}>
//           <Hero />
//         </Suspense>

//         <Suspense fallback={<Loading />}>
//           <Services />
//         </Suspense>

//         <Suspense fallback={<Loading />}>
//           <Packages />
//         </Suspense>
//       </section>

//       <Suspense fallback={<Loading />}>
//         <Whoweare />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Doctors />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Specialize />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Partner />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Blog />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Client />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Diagnosis />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Question />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Download />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Footer />
//       </Suspense>

//       <Seopage />
//     </>
//   );
// }

// --------------------

// Step 1: Use next/dynamic
// import { Suspense } from "react";
// import dynamic from "next/dynamic";
// import Loading from "./loading";

// const Navbar = dynamic(() => import("@/components/Navbar/Navbar"), { suspense: true });
// const Hero = dynamic(() => import("@/components/Home/Hero"), { suspense: true });
// const Services = dynamic(() => import("@/components/Home/Services"), { suspense: true });
// const Packages = dynamic(() => import("@/components/Home/Packages"), { suspense: true });
// const Whoweare = dynamic(() => import("@/components/Home/Whoweare"), { suspense: true });
// const Doctors = dynamic(() => import("@/components/Home/Doctors"), { suspense: true });
// const Specialize = dynamic(() => import("@/components/Home/Specialize"), { suspense: true });
// const Partner = dynamic(() => import("@/components/Home/Partner"), { suspense: true });
// const Blog = dynamic(() => import("@/components/Home/Blog"), { suspense: true });
// const Client = dynamic(() => import("@/components/Home/Client"), { suspense: true });
// const Diagnosis = dynamic(() => import("@/components/Home/Diagnosis"), { suspense: true });
// const Question = dynamic(() => import("@/components/Home/Question"), { suspense: true });
// const Download = dynamic(() => import("@/components/Home/Download"), { suspense: true });
// const Footer = dynamic(() => import("@/components/Footer/Footer"), { suspense: true });
// const Seopage = dynamic(() => import("@/components/Seo/Seopage"), { suspense: true });
// const Color = dynamic(() => import("@/components/Home/Color"), { suspense: true });
// export default function Home() {
//   return (
//     <>
//       <Suspense fallback={<Loading />}>
//         <Navbar />
//       </Suspense>

//       <section className="overflow-hidden">
//         <Suspense fallback={<Loading />}>
//           <Color />
//           <Hero />
//         </Suspense>

//         <Suspense fallback={<Loading />}>
//           <Services />
//         </Suspense>

//         <Suspense fallback={<Loading />}>
//           <Packages />
//         </Suspense>
//       </section>

//       <Suspense fallback={<Loading />}>
//         <Whoweare />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Doctors />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Specialize />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Partner />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Blog />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Client />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Diagnosis />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Question />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Download />
//       </Suspense>

//       <Suspense fallback={<Loading />}>
//         <Footer />
//       </Suspense>

//       <Seopage />
//     </>
//   );
// }
// ---------------
