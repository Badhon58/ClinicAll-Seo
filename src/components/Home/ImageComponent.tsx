import Image from "next/image";
import React from "react";

const ImageComponent = ({ image, resimage }: { image: string, resimage?: string }) => {
  return (
    <div
      className={`text-black  rounded-md  min-h-[70vh] max-h-[75vh] md:min-h-[68vh] md:max-h-[69vh] 2xl:mx-auto 2xl:w-[94%]`}
    >
      <div className="hidden w-full h-full md:block">
        <Image
          //src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-14082025T173731-ebl-banner-1860x620-min.png"
          // src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-29092025T183719-ebl-banner.jpg"
          // src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-14102025T130417-3-min.jpg"
          src={image}
          alt="Ebl Web Banner"
          width={1500}
          height={600}
          quality={100}
          loading="eager"
          priority={true}
          fetchPriority="high"
          decoding="async"
          rel="preload"
          className=" w-full h-full -z-10 px-1.5  object-contain rounded-lg pt-0.5 md:min-h-[65vh] md:max-h-[80vh]"
        />
      </div>

      <div className="block w-full h-full md:hidden ">
        <Image
          //src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-27072025T173413-frame-1171276901-2.svg"
          // src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-29092025T183825-ebl-banner-resp.jpg"
          src={resimage || "https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-06012025T171435-mask-group.svg"}
          alt="Responsive Web Banner"
          width={1000}
          height={270}
          quality={100}
          loading="eager"
          priority={true}
          fetchPriority="high"
          decoding="async"
          rel="preload"
          className="min-h-[65vh] w-full h-full -z-10 lg:px-1.5 top-0 object-cover rounded-lg pt-0.5"
        />{" "}
      </div>
    </div>
  );
};

export default ImageComponent;
