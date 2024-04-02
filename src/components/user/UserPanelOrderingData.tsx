import { useTranslation } from 'react-i18next'
import { AddAddress } from './AddAddress'

interface User {
  username: string
  role: string
  firstName: string
}

interface Props {
  user: User
}

export const UserPanelOrderingData = ({ user }: Props) => {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-8">{t('orderingData')}</h2>
      <h3 className='text-lg max-w-[580px] mb-10'>{t('orderingDataDesc')}</h3>
      <div className='flex justify-between'>
        <h3 className='text-2xl'>{t('infoAndAddress')}</h3>
        <AddAddress user={user} />
      </div>
    </div>
  )
}
