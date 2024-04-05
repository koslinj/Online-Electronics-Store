import { AddProduct } from "@/components/admin/addProductForm/AddProduct"
import { LogoutButton } from "../../components/LogoutButton"
import { AdminSidebar } from "@/components/admin/sidebar/AdminSidebar"
import { useState } from "react"
import { RemoveProduct } from "@/components/admin/removeProductsForm/RemoveProducts"
import { useTranslation } from "react-i18next"
import { AdminOrders } from "@/components/admin/orders/AdminOrders"

export const Admin = () => {
  const { t } = useTranslation()
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  return (
    <div>
      <div className="flex justify-between items-center mb-2 mt-6 flex-wrap">
        <h1 className="text-4xl font-semibold">{t('adminPanel')}</h1>
        <LogoutButton />
      </div>
      <div className="flex flex-wrap">
        <AdminSidebar setSelectedMenuItem={setSelectedMenuItem} />
        <div className="flex-1">
          {selectedMenuItem === '0sub0' && <AddProduct />}
          {selectedMenuItem === '0sub1' && <RemoveProduct />}
          {selectedMenuItem === '1' && <AdminOrders />}
        </div>
      </div>
    </div>
  )
}
