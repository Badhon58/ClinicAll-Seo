"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Header = ({ title }: { title: string }) => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  });
  if (!mounted) {
    return null;
  }
  return (
    <div className="grid grid-cols-6 py-3">
      <div className="col-span-3 ">
        {/* <Header /> */}
        <h2 className="text-lg font-semibold text-center">
          {t(title)}
        </h2>
      </div>
      <div className="col-span-6"></div>
    </div>
  );
};

export default Header;
