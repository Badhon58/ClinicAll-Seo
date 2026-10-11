import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "@/lib/english.json";
import translationBN from "@/lib/bangla.json";
import { convertToBengaliNumber } from "./ConvertBanglatoEnglsh";
// import LanguageDetector from "i18next-browser-languagedetector";
const resources = {
  en: {
    translation: translationEN,
  },
  bn: {
    translation: translationBN,
  },
};

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng:
      typeof window !== "undefined"
        ? localStorage?.getItem("language") || "bn"
        : "bn",
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (format === "convertToBengali") {
          return convertToBengaliNumber(value);
        }
        return value;
      },
    },
  });

export default i18n;
