import Image from "next/image";
import React from "react";

const PageLoading = () => {
  return (
    <div className="min-h-[80vh] xl:container xl:mx-auto flex items-center justify-center relative">
      {/* Static circle with low opacity */}
      <div className="absolute w-[180px] h-[180px] border-8 border-[#E2136E] border-opacity-5 rounded-full"></div>

      {/* Animated circle with rounded edges on the border */}
      <div
        className="absolute w-[180px] h-[180px] border-8 
   border-t-[#E2136E] 
   border-r-[#E2136E] 
       border-b-transparent 
  border-l-transparent 
  animate-spin rounded-full"
        style={{
          animationDuration: "2s",
          borderTopLeftRadius: "50%",
          borderTopRightRadius: "50%",
          borderBottomLeftRadius: "50%",
          borderBottomRightRadius: "50%",
        }}
      ></div>

      {/* Logo or image in the center */}
      <Image
        src={"/other/reslogo.svg"}
        className="w-[50px] h-[50px]"
        width={60}
        height={60}
        alt="Log Loading"
      />
    </div>
  );
};

export default PageLoading;
