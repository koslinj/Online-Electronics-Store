import { ConfigProvider, Radio, RadioChangeEvent, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyRadio } from './MyRadio';
import { Address, User } from '@/types';
import { fetchAddressesByUsername } from '@/api/addresses';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: User
  onUpdate: () => void
}

export const DeliveryAddress = ({ user, onUpdate }: Props) => {
  const navigate = useNavigate()
  const [value, setValue] = useState(-1);
  const [orderingData, setOrderingData] = useState<Address[]>()

  useEffect(() => {
    const storedValue = localStorage.getItem('deliveryAddress');
    if (orderingData) {
      if (storedValue !== null) {
        const found = orderingData.find(item => item.id === JSON.parse(storedValue).id)
        if (!found) {
          const deliveryAddress = orderingData[0];
          localStorage.setItem('deliveryAddress', JSON.stringify(deliveryAddress));
          setValue(orderingData[0].id);
        } else {
          setValue(found.id);
        }
      } else if (value !== -1) {
        const deliveryAddress = orderingData.find(item => item.id === value);
        localStorage.setItem('deliveryAddress', JSON.stringify(deliveryAddress));
      }
    }
  }, [orderingData]);

  const fetchData = async () => {
    const _ord = await fetchAddressesByUsername(user.username)
    if (_ord.length <= 0) navigate("/cart")
    setOrderingData(_ord!)
    setValue(_ord[0]?.id)
  }

  useEffect(() => {
    fetchData()
  }, [user.username])

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);

    const deliveryAddress = orderingData?.find(item => item.id === e.target.value);
    localStorage.setItem('deliveryAddress', JSON.stringify(deliveryAddress));
    onUpdate()
  };

  return (
    <div className='bg-white p-4 rounded-xl'>
      <p className='text-xl font-semibold mb-3'>Adres dostawy</p>
      <div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'black',
            },
            components: {
              Radio: {
                wrapperMarginInlineEnd: 0
              }
            }
          }}
        >
          <Radio.Group name='address' onChange={onChange} value={value}>
            <Space direction="vertical">
              {orderingData?.map(item => (
                <MyRadio key={item.id} state={value} value={item.id} address={item} />
              ))}
            </Space>
          </Radio.Group>
        </ConfigProvider>
      </div>
    </div>
  )
}
