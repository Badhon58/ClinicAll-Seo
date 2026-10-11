"use client";
import React, { useEffect, useRef, useState } from "react";
import NewSinglePackage from "./NewSinglePackage";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { Package, scrollToTop } from "./Interface";
import TacForPackage from "./TacForPackage";
import Title from "./Title";
import "./style.css";
import Loading from "@/app/loading";
const NewPackage = () => {
  const [allPackage, setAllPackage] = useState<Package[]>();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const boxRef = useRef<HTMLDivElement | null>(null);
  const handleChange = (name: string) => {
    setSelectedOption(name);

    if (!boxRef.current) return;
    let width = boxRef.current.clientWidth;

    if (name === "option1") {
      boxRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else if (name === "option2") {
      boxRef.current.scrollTo({ left: width, behavior: "smooth" });
    } else if (name === "option3") {
      boxRef.current.scrollTo({ left: width * 2, behavior: "smooth" });
    } else if (name === "option4") {
      boxRef.current.scrollTo({ left: width * 3, behavior: "smooth" });
    }
  };
  const handleScroll = () => {
    if (!boxRef.current) return;
    let width = boxRef.current.clientWidth;
    let scrollLeft = boxRef.current.scrollLeft;

    // Find nearest slide index
    let index = Math.ceil(scrollLeft / width);
    // console.log(index);

    if (index === 0) setSelectedOption("option1");
    else if (index === 1) setSelectedOption("option2");
    else if (index === 2) setSelectedOption("option3");
    else if (index === 3) setSelectedOption("option4");
  };
  const init = async () => {
    try {
      setLoading(true);
      scrollToTop()
      const response = await apiCall(
        Methods.GET,
        EndPoint.PACKAGE_FIND_ALL +
        `?showHome=true&packageType=b2c&isInstant=false`
      );
      setAllPackage(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (!allPackage || allPackage.length === 0) return;

    const options = allPackage.map((_, idx) => `option${idx + 1}`);
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % options.length; // loop back
      handleChange(options[index]);
    }, 3000); // every 3s

    return () => clearInterval(interval);
  }, [allPackage]); // re-run when data loads

  return loading ? (
    <Loading />
  ) : (
    <section className=" min-h-[50vh] xl:container xl:mx-auto lg:mt-4 xl:mt-6 2xl:mt-7">
      <Title />
      <div
        ref={boxRef}
        onScroll={handleScroll}
        className="flex slide_container  scrollbar-hide overflow-auto "
      >
        {allPackage &&
          allPackage?.map((data, index) => {
            if (data.isInstant) {
              return null
            }
            return (
              <div key={index} className="p-3">
                <NewSinglePackage data={data} />
              </div>
            );
          })}
      </div>
      <div className="flex 2xl:hidden items-center justify-center space-x-3 mt-3">
        <input
          type="radio"
          className="accent-pink-500 2xl:hidden block cursor-pointer"
          value="option1"
          checked={selectedOption === "option1"}
          onChange={() => handleChange("option1")}
        />
        <input
          type="radio"
          className="accent-pink-500 2xl:hidden block cursor-pointer"
          value="option2"
          checked={selectedOption === "option2"}
          onChange={() => handleChange("option2")}
        />

        <input
          type="radio"
          className="accent-pink-500 md:hidden block cursor-pointer"
          value="option3"
          checked={selectedOption === "option3"}
          onChange={() => handleChange("option3")}
        />
        <input
          type="radio"
          className="accent-pink-500 sm:hidden block cursor-pointer "
          value="option4"
          checked={selectedOption === "option4"}
          onChange={() => handleChange("option4")}
        />
      </div>
      <TacForPackage />
    </section>
  );
};

export default NewPackage;
