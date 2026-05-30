"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Lang, translations } from "@/lib/i18n";

type LanguageContextType = {
  lang: Lang;
  t: (typeof translations)["en"];
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("tr");

  const toggleLang = () => setLang((l) => (l === "en" ? "tr" : "en"));

  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang], toggleLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
