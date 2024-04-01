import { Link } from "react-router-dom"
import boltLogo from "../../images/bolt_logo.png"
import { AccountButton } from "./AccountButton"
import { Dropdown } from "../Dropdown"
import { SearchBar } from "./SearchBar"
import { CartButton } from "./CartButton"
import { LanguageButtons } from "./LanguageButtons"
import { useCart } from "@/providers/CartProvider"
import { useTranslation } from "react-i18next"

export const TopNavbar = () => {
  const { t } = useTranslation()
  const { cart } = useCart();

  return (
    <div className="px-1 lg:px-6 py-1 flex gap-x-10 items-center justify-between lg:justify-center max-w-7xl mx-auto flex-wrap">
      <Link to="/">
        <div className="flex items-center">
          <img src={boltLogo} alt="Bolt Logo" width={50} />
          <p className="hidden lg:block leading-4 text-xl">ELECTRO<br />store</p>
        </div>
      </Link>
      <SearchBar />
      <LanguageButtons />
      <div className="flex items-center gap-2 justify-center">
        <AccountButton />
        <Dropdown
          side="left"
          element={<CartButton />}
        >
          {cart.map((item) => (
            <div className="rounded-lg p-2 flex gap-x-2 items-center w-72">
              <img className="w-20" src={item.product.imageUrl} alt={item.product.name} />
              <div>
                <Link to={`/products/${item.product.categoryUrl}/${encodeURIComponent(item.product.name)}`}>
                  <p className="font-semibold hover:underline">{item.product.name}</p>
                </Link>
                <p className="mt-2 text-blue-900">{item.quantity} {t('pieces')}</p>
              </div>
            </div>
          ))}
        </Dropdown>
      </div>
    </div>
  )
}
