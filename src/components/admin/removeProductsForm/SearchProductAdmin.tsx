
import { Input, ConfigProvider } from "antd";
import { SearchProps } from "antd/es/input";
import { useTranslation } from "react-i18next";

const { Search } = Input

interface Props {
  onSearch: SearchProps['onSearch']
  handleSearchChange: (e: any) => void
  searchQuery: string
}

export const SearchProductAdmin = ({ onSearch, handleSearchChange, searchQuery }: Props) => {
  const { t } = useTranslation()

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorTextPlaceholder: 'rgb(150 150 150)',
          }
        }
      }}
    >
      <Search
        placeholder={t('searchProduct')}
        onSearch={onSearch}
        style={{ width: 230 }}
        onChange={handleSearchChange}
        value={searchQuery}
      />
    </ConfigProvider>
  )
}
