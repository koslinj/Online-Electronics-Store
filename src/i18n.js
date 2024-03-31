import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
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
          password: "Password",
          name: "Name",
          surname: "Surname",
          haveAccount: "Already have an account?  <1><0>Log in</0></1>",
          orders: "Orders",
          delivery: "Delivery",
          installments: "Installments",
          leasing: "Leasing",
          insurance: "Insurance",
          taxFree: "TaxFree",
          assembly: "Assembly",
          returnsAndComplaints: "Returns and Complaints",
          faq: "Frequently Asked Questions",
          promotionsAndInspiration: "Promotions and Inspiration",
          sale: "Sale",
          hotDeals: "Hot Deals",
          unBox: "Un.Box",
          promotions: "Promotions",
          giftCards: "Gift Cards",
          guides: "Guides",
          news: "News",
          aboutUs: "About Us",
          termsAndConditions: "Terms and Conditions",
          privacyPolicy: "Privacy Policy",
          cookiesPolicy: "Cookies Policy",
          newsletterTerms: "Newsletter Terms",
          pressOffice: "Press Office",
          publicOrders: "Public Orders",
          businessShopping: "Business Shopping",
          marketingCollaboration: "Marketing Collaboration",
          forum: "Forum",
          career: "Career",
          contact: "Contact",
          monFri: "mon. - fri.",
          satSun: "sat. - sun.",
          showrooms: "ELECTROstore showrooms",
          filters: "Filters",
          uploadImage: "Upload image...",
          productName: "Name",
          description: "Description",
          price: "Price",
          category: "Category",
          choose_category: "Choose Category...",
          add_filter: "Add Filter",
          upload_product: "Upload product",
          add_product: "Add product",
          remove_product: "Remove product",
          image: "Image",
          select_filter: "Choose Filter",
          filterValue: "Filter Value",
          badEmail: "Email is invalid!",
          badPassword: "Password is too short!",
          badFirstName: "Name is invalid!",
          badLastName: "Surname is invalid!",
          failedLogin: "Unable to Log in, invalid E-mail or Password!",
          existingEmail: "Account with such Email already exists!",
          products: 'Products',
          orders: 'Orders',
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
          password: "Hasło",
          name: "Imię",
          surname: "Nazwisko",
          haveAccount: "Masz już konto?  <1><0>Zaloguj się</0></1>",
          orders: "Zamówienia",
          delivery: "Dostawa",
          installments: "Raty",
          leasing: "Leasing",
          insurance: "Ubezpieczenia",
          taxFree: "TaxFree",
          assembly: "Montaż",
          returnsAndComplaints: "Zwroty i reklamacje",
          faq: "Najczęściej zadawane pytania",
          promotionsAndInspiration: "Promocje i inspiracje",
          sale: "Wyprzedaż",
          hotDeals: "Gorący strzał",
          unBox: "Un.Box",
          promotions: "Promocje",
          giftCards: "Karty podarunkowe",
          guides: "Poradniki",
          news: "Aktualności",
          aboutUs: "O nas",
          termsAndConditions: "Regulamin",
          privacyPolicy: "Polityka prywatności",
          cookiesPolicy: "Polityka cookies",
          newsletterTerms: "Regulamin newslettera",
          pressOffice: "Biuro prasowe",
          publicOrders: "Zamówienia publiczne",
          businessShopping: "Zakupy dla firm",
          marketingCollaboration: "Współpraca marketingowa",
          forum: "Forum",
          career: "Kariera",
          contact: "Kontakt",
          monFri: "pon. - pt.",
          satSun: "sob. - niedz.",
          showrooms: "Salony ELECTROstore",
          filters: "Filtry",
          uploadImage: "Preślij zdjęcie...",
          productName: "Nazwa",
          description: "Opis",
          price: "Cena",
          category: "Kategoria",
          choose_category: "Wybierz kategorię...",
          add_filter: "Dodaj filtr",
          upload_product: "Prześlij produkt",
          add_product: "Dodaj produkt",
          remove_product: "Usuń produkt",
          image: "Zdjęcie",
          select_filter: "Wybierz filtr",
          filterValue: "Wartość filtru",
          badEmail: "Email nie jest poprawny!",
          badPassword: "Hasło jest za krótkie!",
          badFirstName: "Imię nie jest poprawne!",
          badLastName: "Nazwisko nie jest poprawne!",
          failedLogin: "Nie udało się zalogować, błedny E-mail lub Hasło!",
          existingEmail: "Konto z takim adresem E-mail już istnieje!",
          products: 'Produkty',
          orders: 'Zamówienia',
        }
      }
    }
  })