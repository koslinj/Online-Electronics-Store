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
          searchPlaceholder: "What are you looking for?",
          login: "Log in",
          noAccount: "Do not have account?",
          createAccount: "Create an account",
          password: "Password"
        }
      },
      pl: {
        translation: {
          admin: "Administrator",
          yourAccount: "Twoje konto",
          cart: "Koszyk",
          searchPlaceholder: "Czego szukasz?",
          login: "Zaloguj się",
          noAccount: "Nie masz konta?",
          createAccount: "Załóż konto",
          password: "Hasło"
        }
      }
    }
  })