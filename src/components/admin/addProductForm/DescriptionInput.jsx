import { useTranslation } from "react-i18next"

export const DescriptionInput = ({ description, setDescription }) => {
  const { t } = useTranslation()

  return (
    <label>
      <p className='text-lg font-semibold'>{t('description')}</p>
      <textarea
        className='p-1 outline-none border-gray-400 border-2 rounded-md w-64'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </label>
  )
}