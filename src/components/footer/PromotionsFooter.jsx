import { useTranslation } from "react-i18next";

export const PromotionsFooter = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h3 className='font-bold mb-2'>{t('promotionsAndInspiration')}</h3>
      <ul className="space-y-2">
        <li>{t('sale')}</li>
        <li>{t('hotDeals')}</li>
        <li>{t('unBox')}</li>
        <li>{t('promotions')}</li>
        <li>{t('giftCards')}</li>
        <li>{t('guides')}</li>
        <li>{t('news')}</li>
      </ul>
    </div>
  )
}