import { useTranslation } from "react-i18next"

export const OrdersFooter = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h3 className='font-bold mb-2'>{t('orders')}</h3>
      <ul className="space-y-2">
        <li>{t('delivery')}</li>
        <li>{t('installments')}</li>
        <li>{t('leasing')}</li>
        <li>{t('insurance')}</li>
        <li>{t('taxFree')}</li>
        <li>{t('assembly')}</li>
        <li>{t('returnsAndComplaints')}</li>
        <li>{t('faq')}</li>
      </ul>
    </div>
  )
}
