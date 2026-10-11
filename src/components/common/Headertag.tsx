import React from "react";

const Headertag = ({
  children,
  position,
}: {
  children: React.ReactNode;
  position: string;
}) => {
  return (
    <p
      className={`text-xl text-[#16020B] lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold ${position}`}>
      {children}
    </p>
  );
};

export default Headertag;
