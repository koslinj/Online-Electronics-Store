import { Link } from "react-router-dom"
import boltLogo from "../../images/bolt_logo.png"
import { AccountButton } from "./AccountButton"
import { Dropdown } from "../Dropdown"
import { SearchBar } from "./SearchBar"
import { CartButton } from "./CartButton"
import { LanguageButtons } from "./LanguageButtons"

export const TopNavbar = () => {

  return (
    <div className="px-6 py-1 flex gap-10 items-center justify-center max-w-7xl mx-auto">
      <Link to="/">
        <div className="flex items-center">
          <img src={boltLogo} alt="Bolt Logo" width={50} />
          <p className="leading-4 text-xl">ELECTRO<br />store</p>
        </div>
      </Link>
      <SearchBar />
      <LanguageButtons />
      <div className="flex items-center justify-center">
        <AccountButton />
        <Dropdown
          side={"left"}
          element={<CartButton />}
        >
          <div className="hover:bg-green-300 p-2">Shopping Link 1</div>
          <div className="hover:bg-green-300 p-2">Shopping Link 2</div>
          <div className="hover:bg-green-300 p-2">Shopping Link 3</div>
        </Dropdown>
      </div>
    </div>
  )
}
