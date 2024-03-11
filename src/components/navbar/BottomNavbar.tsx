import { Link } from "react-router-dom"


export const BottomNavbar = () => {
  return (
    <div className="px-6 py-1 flex gap-6 items-center bg-gray-100">
      <Link to="/categories/laptopy-i-komputery">
        <div className="w-24">Laptopy i komputery</div>
      </Link>
      <Link to="/categories/smartfony-i-smartwatche">
        <div className="w-24">Smartfony i smartwatche</div>
      </Link>
      <div className="w-24">Urządzenia peryferyjne</div>
      <div className="w-24">TV i audio</div>
      <div className="w-24">Akcesoria</div>
    </div>
  )
}
