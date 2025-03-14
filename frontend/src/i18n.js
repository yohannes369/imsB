import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import enTranslations from "./locales/en.json";
import amTranslations from "./locales/am.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations }, // English translations
    am: { translation: amTranslations }, // Amharic translations
  },
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;