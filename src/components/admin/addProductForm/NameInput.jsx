
export const NameInput = ({ name, setName }) => {
  return (
    <label>
      <p className='text-lg font-semibold'>Nazwa</p>
      <input
        className='p-1 outline-none border-gray-400 border-2 rounded-md'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </label>
  )
}
