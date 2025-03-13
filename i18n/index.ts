import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/en/translation.json";
import translationEs from "./locales/es/translation.json";

const resources = {
    "en": { translation: translationEn },
    "es": { translation: translationEs },
  
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");
  console.debug("savedLanguage", savedLanguage);
  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageCode;
  }
  console.debug("savedLanguage2", savedLanguage);
  try {

    i18n.use(initReactI18next).init({
      compatibilityJSON: "v4",
      resources,
      lng: savedLanguage,
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