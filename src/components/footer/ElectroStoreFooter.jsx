import { useTranslation } from 'react-i18next';

export const ElectroStoreFooter = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h3 className='font-bold mb-2'>ELECTROstore</h3>
      <ul className="space-y-2">
        <li>{t('aboutUs')}</li>
        <li>{t('termsAndConditions')}</li>
        <li>{t('privacyPolicy')}</li>
        <li>{t('cookiesPolicy')}</li>
        <li>{t('newsletterTerms')}</li>
        <li>{t('pressOffice')}</li>
        <li>{t('publicOrders')}</li>
        <li>{t('businessShopping')}</li>
        <li>{t('marketingCollaboration')}</li>
        <li>{t('forum')}</li>
        <li>{t('career')}</li>
        <li>{t('contact')}</li>
      </ul>
    </div>
  );
};