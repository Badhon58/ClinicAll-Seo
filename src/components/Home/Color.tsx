import React from "react";
import "./Style.css"
const Color = () => {
  return (
    <div className="relative hidden xl:flex">
      <span className="Home-bg -z-50" />
      <span className="hidden Home-bg-1 -z-50 2xl:flex" />
      <span className="Home-bg-2 -z-50" />
      <span className="Home-bg-3 -z-50" />
      <span className="flex Home-bg-5 -z-50" />
      <span className="Home-bg-6 -z-50 " />
    </div>
  );
};

export default Color;
