import { ContactsFooter } from "./ContactsFooter"
import { ElectroStoreFooter } from "./ElectroStoreFooter"
import { OrdersFooter } from "./OrdersFooter"
import { PromotionsFooter } from "./PromotionsFooter"

export const Footer = () => {
  return (
    <div className="sticky top-[100vh] mt-20 pb-10">
      <div className="flex flex-wrap justify-between gap-10">
        <OrdersFooter />
        <PromotionsFooter />
        <ElectroStoreFooter />
        <ContactsFooter />
      </div>
      <p className="text-center mt-8 italic">© ELECTROstore 2024</p>
    </div>
  )
}
