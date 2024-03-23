import { AddProduct } from "@/components/admin/AddProduct"
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
