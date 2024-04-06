import { Pagination, Select } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  pageSize: number
  setPageSize: Dispatch<SetStateAction<number>>
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  searching: boolean
  totalElements: number
}

export const PaginationAdmin = ({ pageSize, setPageSize, currentPage, setCurrentPage, searching, totalElements }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      {!searching &&
        <div className="flex items-center gap-5">
          <Pagination
            pageSize={pageSize}
            current={currentPage}
            onChange={(page) => setCurrentPage(page)}
            total={totalElements}
          />
          <Select
            defaultValue={pageSize}
            style={{ width: 120 }}
            onChange={(value) => {
              setPageSize(value)
              setCurrentPage(0)
            }}
            options={[
              { value: 5, label: `5 / ${t("page")}` },
              { value: 10, label: `10 / ${t("page")}` },
              { value: 20, label: `20 / ${t("page")}` },
              { value: 50, label: `50 / ${t("page")}` },
            ]}
          />
        </div>
      }
    </>
  )
}
