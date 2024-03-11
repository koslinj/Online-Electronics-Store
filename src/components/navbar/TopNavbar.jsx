import { Link } from "react-router-dom"
import boltLogo from "../../images/bolt_logo.png"
import { AccountButton } from "./AccountButton"
import { Dropdown } from "./Dropdown"
import { SearchBar } from "./SearchBar"

export const TopNavbar = () => {
  return (
    <div className="px-6 py-1 flex gap-6 items-center">
      <Link to="/">
        <div className="flex items-center">
          <img src={boltLogo} alt="Bolt Logo" width={50} />
          <p className="leading-4 text-xl">ELECTRO<br />store</p>
        </div>
      </Link>
      <SearchBar />
      <AccountButton />
      <Dropdown side="left" />
    </div>
  )
}
