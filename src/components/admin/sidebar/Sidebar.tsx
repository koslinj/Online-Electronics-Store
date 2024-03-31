import { Menu, MenuProps } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react';
import { BsBoxSeam } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { AddProduct } from '../addProductForm/AddProduct';

export const Sidebar = ({ setSelectedMenuItem }: { setSelectedMenuItem: Dispatch<SetStateAction<string>> }) => {

  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedMenuItem(key);
  };

  return (
    <div className='w-48'>
      <Menu
        defaultSelectedKeys={['0']}
        mode="inline"
        onSelect={handleMenuSelect}
      >
        <Menu.Item key="0" icon={<BsBoxSeam className='size-5' />}>
          Products
        </Menu.Item>
        <Menu.Item key="1" icon={<GoChecklist className='size-5' />}>
          Orders
        </Menu.Item>
      </Menu>
    </div>
  )
}
