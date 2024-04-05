import { LogoutButton } from "../../components/LogoutButton"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { UserSidebar } from "@/components/admin/sidebar/UserSidebar"
import { UserPanelOpinions } from "@/components/user/opinions/UserPanelOpinions"
import { UserPanelOrderingData } from "@/components/user/UserPanelOrderingData"
import { UserPanelOrders } from "@/components/user/orders/UserPanelOrders"

export const User = ({ user }) => {
  const { t } = useTranslation()
  const [selectedMenuItem, setSelectedMenuItem] = useState('0');

  return (
    <div>
      <div className="flex justify-between items-center mb-2 mt-6 flex-wrap">
        <h1 className="text-4xl font-semibold">{t('userPanel')}</h1>
        <LogoutButton />
      </div>
      <div className="flex flex-wrap">
        <UserSidebar user={user} setSelectedMenuItem={setSelectedMenuItem} />
        <div className="flex-1">
          {selectedMenuItem === '0' && <UserPanelOrders user={user} />}
          {selectedMenuItem === '1' && <UserPanelOpinions user={user} />}
          {selectedMenuItem === '2' && <UserPanelOrderingData user={user} />}
          {selectedMenuItem === '3' && <p>{t('accountSettings')}</p>}
        </div>
      </div>
    </div>
  )
}

