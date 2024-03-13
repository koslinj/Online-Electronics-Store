import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "pl",
    resources: {
      en: {
        translation: {
          admin: "Admin",
          yourAccount: "Your account",
          cart: "Cart",
          searchPlaceholder: "What are you looking for?"
        }
      },
      pl: {
        translation: {
          admin: "Administrator",
          yourAccount: "Twoje konto",
          cart: "Koszyk",
          searchPlaceholder: "Czego szukasz?"
        }
      }
    }
  })