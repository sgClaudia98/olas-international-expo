import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./locales/en/translation.json";
import translationEs from "./locales/es/translation.json";
import translationPt from "./locales/pt/translation.json";
import translationFr from "./locales/fr/translation.json";

export const languages = ["en", "es", "pt", "fr"]

const resources = {
    "en": { translation: translationEn },
    "es": { translation: translationEs },
    "pt": { translation: translationPt },
    "fr": { translation: translationFr },
};

const initI18n = async () => {

  try {

    i18n.use(initReactI18next).init({
      compatibilityJSON: "v4",
      resources,
      lng: "en",
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });
  } catch (error) { 
    console.error("i18n error", error);
  }
};

initI18n();

export default i18n;