import { fetchProductById } from '@/api/products'
import { OrderItem, Product } from '@/types'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface Props {
  orderItem: OrderItem
}

export const UserPanelOneOrderItem = ({ orderItem }: Props) => {
  const { t } = useTranslation()
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    const fetchData = async () => {
      const _prod = await fetchProductById(orderItem.productId);
      setProduct(_prod);
    }

    fetchData()

  }, [orderItem])

  return (
    <div className="flex items-center gap-x-2 py-3">
      {product && (
        <>
          <div>
            <img className="w-32" src={product.imageUrl} alt={product.name} />
          </div>
          <div key={orderItem.id} className="space-y-1">
            <Link to={`/products/${product.categoryUrl}/${encodeURIComponent(product.name)}`}>
              <p className="font-semibold italic hover:underline">{product.name}</p>
            </Link>
            <p className="text-lg">{orderItem.quantity} {t('pieces')}</p>
          </div>
        </>
      )}
    </div>
  )
}
