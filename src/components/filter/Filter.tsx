import { useTranslation } from 'react-i18next';
import { FilterItem } from './FilterItem';
import { PriceFilter } from './PriceFilter';
import { ReactNode } from 'react';

type FiltersType = [string, string[]][];

interface Props {
  filters: FiltersType
  children: ReactNode
}

export const Filter = ({ filters, children }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="border-2 border-gray-400 rounded-xl p-2 min-w-64 w-64">
      <h2 className="text-2xl font-bold mb-6">{t('filters')}</h2>
      <div className='space-y-5'>
        {children}
        <PriceFilter />
        {filters.map(([filterName, options]) => (
          <FilterItem
            key={filterName}
            options={filterName === "Pamięć RAM"
              ? options.sort((a, b) => parseInt(a.slice(0, -2)) - parseInt(b.slice(0, -2)))
              : options.sort()
            }
            filterName={filterName}
          />
        ))}
      </div>
    </div>
  );
}
