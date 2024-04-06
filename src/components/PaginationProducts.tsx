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

export const PaginationProducts = ({ pageSize, setPageSize, currentPage, setCurrentPage, searching, totalElements }: Props) => {
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
              setCurrentPage(1)
            }}
            options={[
              { value: 3, label: `3 / ${t("page")}` },
              { value: 6, label: `6 / ${t("page")}` },
              { value: 9, label: `9 / ${t("page")}` },
              { value: 12, label: `12 / ${t("page")}` },
            ]}
          />
        </div>
      }
    </>
  )
}
