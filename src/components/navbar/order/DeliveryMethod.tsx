import { ConfigProvider, Radio, RadioChangeEvent, Space } from 'antd'
import React, { useState } from 'react'
import { MyRadio } from './MyRadio';
import transportIcon from "@/images/transport_icon.png"
import inpostIcon from "@/images/inpost_icon.png"
import shopIcon from "@/images/shop_icon.png"

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

export const DeliveryMethod = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
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
          <Radio.Group className='rounded-lg border-gray-400 border-2' onChange={onChange} value={value}>
            <Space direction="vertical">
              <MyRadio state={value} value={1} content={contents[0]} icon={transportIcon} />
              <MyRadio state={value} value={2} content={contents[1]} icon={shopIcon} />
              <MyRadio state={value} value={3} content={contents[2]} icon={inpostIcon} />
            </Space>
          </Radio.Group>
        </ConfigProvider>
      </div>
    </div>
  )
}
