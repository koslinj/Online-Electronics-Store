import { useTranslation } from 'react-i18next'
import { AddAddress } from './AddAddress'
import { Address, User } from '@/types'
import { useEffect, useState } from 'react'
import { fetchAddressesByUsername } from '@/api/addresses'

interface Props {
  user: User
}

export const UserPanelOrderingData = ({ user }: Props) => {
  const { t } = useTranslation()
  const [orderingData, setOrderingData] = useState<Address[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const _ops = await fetchAddressesByUsername(user.username)
      setOrderingData(_ops!)
    }

    fetchData()

  }, [user.username])

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">{t('orderingData')}</h2>
      <h3 className='text-lg max-w-[580px] mb-10'>{t('orderingDataDesc')}</h3>
      <div className='flex justify-between'>
        <h3 className='text-2xl'>{t('infoAndAddress')}</h3>
        <AddAddress user={user} />
        {orderingData.map(item => (
          <p>{item.street}</p>
        ))}
      </div>
    </div>
  )
}
