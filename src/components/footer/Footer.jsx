import { ContactsFooter } from "./ContactsFooter"
import { ElectroStoreFooter } from "./ElectroStoreFooter"
import { OrdersFooter } from "./OrdersFooter"
import { PromotionsFooter } from "./PromotionsFooter"

export const Footer = () => {
  return (
    <div className="flex justify-center gap-10 sticky top-[100vh] mt-20 mb-10">
      <OrdersFooter />
      <PromotionsFooter />
      <ElectroStoreFooter />
      <ContactsFooter />
    </div>
  )
}