import React from "react";
const PrimaryText = ({
  children,
  fontsize,
  fontweight,
  textcolor
}: {
  children: React.ReactNode;
  textcolor:string
  fontsize: string;
  fontweight: string;
}) => {
  return (
    <p className={`${textcolor} ${fontsize} ${fontweight}`}>{children}</p>
  );
};

export default PrimaryText;
