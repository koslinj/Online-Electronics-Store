import { AddProduct } from "@/components/admin/addProductForm/AddProduct"
import { LogoutButton } from "../../components/LogoutButton"

export const Admin = () => {
  return (
    <>
      <div>Admin</div>
      <LogoutButton />
      <AddProduct />
    </>
  )
}
