"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import "./style.css";
const Title = () => {
  const query = usePathname();
  const { t } = useTranslation();
  if (query === "/healthPackage") {
    return <h1 className="title">{t("mainhealthpackage")}</h1>;
  }
  return <h2 className="title">{t("mainhealthpackage")}</h2>;
};

export default Title;
