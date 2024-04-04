import { ConfigProvider, Radio, RadioChangeEvent, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyRadio } from './MyRadio';
import transportIcon from "@/images/transport_icon.png"
import inpostIcon from "@/images/inpost_icon.png"
import shopIcon from "@/images/shop_icon.png"
import { Address, User } from '@/types';
import { fetchAddressesByUsername } from '@/api/addresses';

interface Props {
  user: User
}

const contents = [
  {
    title: "Kurier – InPost, UPS, FedEx, DTS, PickPack",
    desc: "Dostawa w ciągu 5 dni roboczych"
  },
  {
    title: "Odbiór w salonie ELECTROstore",
    desc: "Dostawa na jutro"
  },
  {
    title: "InPost Paczkomat® 24/7",
    desc: "Dostawa w ciągu 5 dni roboczych"
  }
]

export const DeliveryAddress = ({ user }: Props) => {
  const [value, setValue] = useState(1);
  const [orderingData, setOrderingData] = useState<Address[]>([])

  const fetchData = async () => {
    const _ops = await fetchAddressesByUsername(user.username)
    setOrderingData(_ops!)
  }

  useEffect(() => {
    fetchData()
  }, [user.username])

  const onUpdate = () => {
    fetchData();
  };

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
                <MyRadio key={item.id} state={value} value={item.id} icon={transportIcon} address={item} />
              ))}
            </Space>
          </Radio.Group>
        </ConfigProvider>
      </div>
    </div>
  )
}
