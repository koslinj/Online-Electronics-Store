import { ConfigProvider, Radio, RadioChangeEvent, Space } from 'antd'
import React, { useEffect, useState } from 'react'
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
    icon: przelewy24Icon,
    price: 0
  },
  {
    title: "Karta płatnicza online",
    desc: "",
    icon: visaIcon,
    price: 0
  },
  {
    title: "BLIK",
    desc: "",
    icon: blikIcon,
    price: 0
  },
  {
    title: "Przelew tradycyjny",
    desc: "",
    icon: moneyIcon,
    price: 0
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

  useEffect(() => {
    const storedValue = localStorage.getItem('payment');
    if (storedValue !== null) {
      const i = contents.findIndex(item => item.title === JSON.parse(storedValue).title)
      setValue(i);
    } else {
      const payment = contents[value];
      localStorage.setItem('payment', JSON.stringify(payment));
    }
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);

    const payment = contents[e.target.value];
    localStorage.setItem('payment', JSON.stringify(payment));
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
          <Radio.Group name='payment' className='w-full rounded-lg border-gray-300 border-2' onChange={onChange} value={value}>
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
