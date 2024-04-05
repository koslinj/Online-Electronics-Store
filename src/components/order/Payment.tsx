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
    desc: "",
    icon: przelewy24Icon
  },
  {
    title: "Karta płatnicza online",
    desc: "",
    icon: visaIcon
  },
  {
    title: "BLIK",
    desc: "",
    icon: blikIcon
  },
  {
    title: "Przelew tradycyjny",
    desc: "",
    icon: moneyIcon
  },
  {
    title: "Przy odbiorze",
    desc: "",
    icon: walletIcon,
    price: 25
  }
]

export const Payment = () => {
  const [value, setValue] = useState(0);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className='bg-white p-4 rounded-xl'>
      <p className='text-xl font-semibold mb-3'>Płatność</p>
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
          <Radio.Group name='payment' className='w-full rounded-lg border-gray-400 border-2' onChange={onChange} value={value}>
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
