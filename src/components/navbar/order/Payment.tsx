import { ConfigProvider, Radio, RadioChangeEvent, Space } from 'antd'
import React, { useState } from 'react'
import { MyRadio } from './MyRadio';
import przelewy24Icon from "@/images/przelewy24_icon.webp"
import visaIcon from "@/images/visa_icon.png"
import blikIcon from "@/images/blik_icon.jpg"
import moneyIcon from "@/images/money_icon.png"
import walletIcon from "@/images/wallet_icon.png"

const contents = [
  {
    title: "Płatność online",
    desc: ""
  },
  {
    title: "Karta płatnicza online",
    desc: ""
  },
  {
    title: "BLIK",
    desc: ""
  },
  {
    title: "Przelew tradycyjny",
    desc: ""
  },
  {
    title: "Przy odbiorze",
    desc: ""
  }
]

export const Payment = () => {
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
          <Radio.Group name='payment' className='rounded-lg border-gray-400 border-2' onChange={onChange} value={value}>
            <Space direction="vertical">
              <MyRadio state={value} value={1} content={contents[0]} icon={przelewy24Icon} />
              <MyRadio state={value} value={2} content={contents[1]} icon={visaIcon} />
              <MyRadio state={value} value={3} content={contents[2]} icon={blikIcon} />
              <MyRadio state={value} value={4} content={contents[3]} icon={moneyIcon} />
              <MyRadio state={value} value={5} content={contents[4]} icon={walletIcon} price={25} />
            </Space>
          </Radio.Group>
        </ConfigProvider>
      </div>
    </div>
  )
}
