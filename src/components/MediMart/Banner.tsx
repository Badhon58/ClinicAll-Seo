import React from "react";

const Banner = () => {
  return (
    <main className="2xl:px-[91px] xl:px-16 lg:px-12 2xl:mt-[60px] xl:mt-[30px] lg:mt-5">
      <div className="bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27102024T104059-bg1.png')] bg-opacity-30  flex flex-col space-y-4 lg:space-y-0 lg:flex-row justify-around px-5 pt-5 items-center rounded-xl">
        <div>
          <img
            src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-31102024T181719-bar1.png"
            alt=""
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-[#16020B]">Pyridoxine Vitamin B6</p>
          <h2 className="font-bold text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-[#3A3A3C]">
            Vitamins & Supplements
          </h2>
          <button className="w-[184px] px-7 py-4 mt-4  text-xs font-medium  text-white bg-[#EB148C] rounded">
            Add to Cart
          </button>
        </div>
        <div>
          <img
            src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-31102024T181737-bar2.png"
            alt=""
          />
        </div>
      </div>
    </main>
  );
};

export default Banner;
