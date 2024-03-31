import { useTranslation } from "react-i18next"

export const NameInput = ({ name, setName }) => {
  const { t } = useTranslation()

  return (
    <div>
      <label>
        <p className='text-lg font-semibold'>{t('productName')}</p>
        <input
          className='p-1 w-full outline-none border-gray-400 border-2 rounded-md'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </div>
  )
}
