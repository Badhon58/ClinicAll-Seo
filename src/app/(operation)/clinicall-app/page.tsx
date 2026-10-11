"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const init = async () => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent || navigator.vendor;

      if (/android/i.test(userAgent)) {
        window.location.href =
          "https://play.google.com/store/apps/details?id=com.clinicall.clinicallapp";
      } else if (/iPad|iPhone|iPod/.test(userAgent)) {
        window.location.href =
          "https://apps.apple.com/us/app/clinicall-online-doctor-app/id6743645786";
      } else {
        window.location.href = "https://theclinicall.com/";
      }
    }
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div className="min-h-">
      <p>Redirect To App ...</p>
    </div>
  );
};

export default page;
