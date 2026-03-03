"use client"

import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

export type Language = "en" | "hi" | "bn" | "as"

export interface Translations {
  guides: string
  hotels: string
  transport: string
  permit: string
  itinerary: string
  safety: string
  signIn: string
  languageLabel: string
}

const translations: Record<Language, Translations> = {
  en: {
    guides: "Guides",
    hotels: "Hotels",
    transport: "Transport",
    permit: "Permit",
    itinerary: "Itinerary",
    safety: "Safety",
    signIn: "Sign In",
    languageLabel: "English",
  },
  hi: {
    guides: "गाइड",
    hotels: "होटल",
    transport: "परिवहन",
    permit: "परमिट",
    itinerary: "यात्रा कार्यक्रम",
    safety: "सुरक्षा",
    signIn: "साइन इन",
    languageLabel: "हिंदी",
  },
  bn: {
    guides: "গাইড",
    hotels: "হোটেল",
    transport: "পরিবহন",
    permit: "পারমিট",
    itinerary: "ভ্রমণসূচি",
    safety: "নিরাপত্তা",
    signIn: "সাইন ইন",
    languageLabel: "বাংলা",
  },
  as: {
    guides: "গাইড",
    hotels: "হোটেল",
    transport: "পৰিবহন",
    permit: "পাৰমিট",
    itinerary: "ভ্ৰমণসূচী",
    safety: "সুৰক্ষা",
    signIn: "চাইন ইন",
    languageLabel: "অসমীয়া",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export const LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिंदी" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
  { code: "as", label: "Assamese", nativeLabel: "অসমীয়া" },
]
