
export const DescriptionInput = ({ description, setDescription }) => {
  return (
    <label>
      <p className='text-lg font-semibold'>Opis</p>
      <textarea
        className='p-1 outline-none border-gray-400 border-2 rounded-md w-64'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </label>
  )
}