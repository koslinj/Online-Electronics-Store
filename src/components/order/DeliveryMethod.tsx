import { ConfigProvider, Radio, RadioChangeEvent, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyRadio } from './MyRadio';
import transportIcon from "@/images/transport_icon.png"
import inpostIcon from "@/images/inpost_icon.png"
import shopIcon from "@/images/shop_icon.png"

const contents = [
  {
    title: "Kurier – InPost, UPS, FedEx, DTS, PickPack",
    desc: "Dostawa w ciągu 5 dni roboczych",
    icon: transportIcon,
    price: 10
  },
  {
    title: "Odbiór w salonie ELECTROstore",
    desc: "Dostawa na jutro",
    icon: shopIcon,
    price: 0
  },
  {
    title: "InPost Paczkomat® 24/7",
    desc: "Dostawa w ciągu 5 dni roboczych",
    icon: inpostIcon,
    price: 12
  }
]

export const DeliveryMethod = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const storedValue = localStorage.getItem('deliveryMethod');
    if (storedValue !== null) {
      const i = contents.findIndex(item => item.title === JSON.parse(storedValue).title)
      setValue(i);
    } else {
      const deliveryMethod = contents[value];
      localStorage.setItem('deliveryMethod', JSON.stringify(deliveryMethod));
    }
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);

    const deliveryMethod = contents[e.target.value];
    localStorage.setItem('deliveryMethod', JSON.stringify(deliveryMethod));
  };

  return (
    <div className='bg-white p-4 rounded-xl'>
      <p className='text-xl font-semibold mb-3'>Sposób dostawy</p>
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
          <Radio.Group name='method' className='rounded-lg border-gray-300 border-2 w-full' onChange={onChange} value={value}>
            <Space className='w-full' direction="vertical">
              {contents.map((content, index) => (
                <MyRadio key={index} state={value} value={index} content={content} />
              ))}
            </Space>
          </Radio.Group>
        </ConfigProvider>
      </div>
    </div>
  )
}
