import { useTranslation } from 'react-i18next';
import { FilterItem } from './FilterItem';

type FiltersType = [string, string[]][];

interface Props {
  filters: FiltersType
}

export const Filter = ({ filters }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="border-4 rounded-xl p-2 w-60">
      <h2 className="text-3xl font-bold mb-6">{t('filters')}</h2>
      {filters.map(([filterName, options]) => (
        <FilterItem
          key={filterName}
          options={options}
          filterName={filterName}
        />
      ))}
    </div>
  );
}
