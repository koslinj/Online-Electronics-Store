import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { IoSearch } from "react-icons/io5"
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='flex flex-1 items-center'>
      <input
        className='p-1 outline-none border-gray-400 border-2 rounded-md flex-grow'
        type="text"
        placeholder={t('searchPlaceholder')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch} className='bg-gray-800 px-4 py-[6px] rounded-lg -ml-2'>
        <IoSearch className='text-white h-6 w-6' />
      </button>
    </div>
  );
};
