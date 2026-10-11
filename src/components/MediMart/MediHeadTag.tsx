import React from "react";

const MediHeadTag = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-[#3A3A3C]">
      {children}
    </p>
  );
};

export default MediHeadTag;
