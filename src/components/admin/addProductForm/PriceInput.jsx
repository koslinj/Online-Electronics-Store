import { useTranslation } from "react-i18next"

export const PriceInput = ({ price, handlePriceChange }) => {
  const { t } = useTranslation()

  return (
    <label>
      <p className='text-lg font-semibold'>{t('price')}</p>
      <input
        className='p-1 outline-none border-gray-400 border-2 rounded-md'
        type="text"
        value={price}
        onChange={handlePriceChange}
      />
    </label>
  )
}