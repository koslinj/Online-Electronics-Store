import { AddProduct } from "@/components/admin/addProductForm/AddProduct"
import { LogoutButton } from "../../components/LogoutButton"
import { Sidebar } from "@/components/admin/sidebar/Sidebar"
import { useState } from "react"

export const Admin = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('0');

  return (
    <div>
      <h1 className="text-3xl font-semibold my-6">Admin Panel</h1>
      <div className="flex">
        <div>
          <Sidebar setSelectedMenuItem={setSelectedMenuItem} />
          <LogoutButton />
        </div>
        <div className="w-full">
          {selectedMenuItem === '0' && (
            <AddProduct />
          )}
          {selectedMenuItem === '1' && (
            <div>
              {/* Render Orders Card */}
              {/* Example: <OrdersCard /> */}
              <h2>Orders Card</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
