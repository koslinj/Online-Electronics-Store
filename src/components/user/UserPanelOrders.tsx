import { Opinion, Order } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserPanelOneOpinion } from "./opinions/UserPanelOneOpinion";
import { fetchOrdersByUsername } from "@/api/orders";
import { UserPanelOneOrder } from "./UserPanelOneOrder";

interface Props {
  user: {
    username: string
    role: string
    firstName: string
  }
}

export const UserPanelOrders = ({ user }: Props) => {
  const { t } = useTranslation()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const _ords = await fetchOrdersByUsername(user.username)
      setOrders(_ords!)
    }

    fetchData()

  }, [user.username])

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">{t('orders')}</h2>
      <h3 className="text-2xl">{t('yourOrders')}<span className="text-gray-500">({orders.length})</span></h3>
      <div className="mt-2 pt-6 border-t-2 border-gray-400 space-y-6">
        {orders?.map(order => (
          <UserPanelOneOrder order={order} />
        ))}
      </div>
    </div>
  )
}