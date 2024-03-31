import { useTranslation } from "react-i18next"

export const PriceInput = ({ price, setPrice }) => {
  const { t } = useTranslation()

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/, "")
    setPrice(value)
  };

  return (
    <div>
      <label>
        <p className='text-xl font-semibold'>{t('price')}</p>
        <input
          className='p-1 w-full outline-none border-gray-400 border-2 rounded-md'
          type="text"
          value={price}
          onChange={handlePriceChange}
        />
      </label>
    </div>
  )
}