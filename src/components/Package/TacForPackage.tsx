"use client";
import React from "react";
import TacForPackageEnglish from "./TacForPackageEnglish";
import TacForPackageBangla from "./TacForPackageBangla";
import { useTranslation } from "react-i18next";

const TacForPackage = () => {
  const { i18n, t } = useTranslation();
  return (
    <div className="p-3">
      {i18n.language == "bn" ? (
        <TacForPackageBangla />
      ) : (
        <TacForPackageEnglish />
      )}
    </div>
  );
};

export default TacForPackage;
