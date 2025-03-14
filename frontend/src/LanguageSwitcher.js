import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language); // Change language
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{t("welcome")}</h1>
      <p className="text-lg mb-4">{t("greeting")}</p>

      <div className="flex space-x-4">
        <button
          onClick={() => handleLanguageChange("en")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          English
        </button>
        <button
          onClick={() => handleLanguageChange("am")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Amharic
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;