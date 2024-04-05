import { ConfigProvider, Radio, RadioChangeEvent, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyRadio } from './MyRadio';
import { Address, User } from '@/types';
import { fetchAddressesByUsername } from '@/api/addresses';

interface Props {
  user: User
}

export const DeliveryAddress = ({ user }: Props) => {
  const [value, setValue] = useState(-1);
  const [orderingData, setOrderingData] = useState<Address[]>([])

  const fetchData = async () => {
    const _ord = await fetchAddressesByUsername(user.username)
    setOrderingData(_ord!)
    setValue(_ord[0].id)
  }

  useEffect(() => {
    fetchData()
  }, [user.username])

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
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
              {orderingData.map(item => (
                <MyRadio key={item.id} state={value} value={item.id} address={item} />
              ))}
            </Space>
          </Radio.Group>
        </ConfigProvider>
      </div>
    </div>
  )
}
