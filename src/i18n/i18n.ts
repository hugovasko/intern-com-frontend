import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { translationEN } from "./en";
import { translationBG } from "./bg";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    nonExplicitSupportedLngs: true,
    supportedLngs: ["en", "bg"],
    resources: {
      en: {
        translation: translationEN,
      },
      bg: {
        translation: translationBG,
      },
    },
  });

export default i18n;
