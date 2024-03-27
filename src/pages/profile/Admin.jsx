import { AddProduct } from "@/components/admin/addProductForm/AddProduct"
import { LogoutButton } from "../../components/LogoutButton"

export const Admin = () => {
  return (
    <div className="flex flex-col items-start">
      <div>Admin</div>
      <LogoutButton />
      <AddProduct />
    </div>
  )
}
