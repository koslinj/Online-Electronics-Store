
export const PriceInput = ({ price, handlePriceChange }) => {
  return (
    <label>
      <p className='text-lg font-semibold'>Cena</p>
      <input
        className='p-1 outline-none border-gray-400 border-2 rounded-md'
        type="text"
        value={price}
        onChange={handlePriceChange}
      />
    </label>
  )
}