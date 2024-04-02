import { Menu, MenuProps } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsBoxSeam } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const AdminSidebar = ({ setSelectedMenuItem }: { setSelectedMenuItem: Dispatch<SetStateAction<string>> }) => {
  const { t } = useTranslation()

  const items: MenuItem[] = [
    getItem(<p className='text-lg'>{t('products')}</p>, '0', <BsBoxSeam className='size-5' />, [
        getItem(<p className='text-lg'>{t('add_product')}</p>, '0sub0'),
        getItem(<p className='text-lg'>{t('remove_product')}</p>, '0sub1'),
    ]),
    getItem(<p className='text-lg'>{t('orders')}</p>, '1', <GoChecklist className='size-5' />),
  ];

  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedMenuItem(key);
  };

  return (
    <div className='w-56 mr-4 border-2 border-gray-400 rounded-xl h-full'>
      <Menu
      style={{
        borderRadius: '14px',
        padding: '8px'
      }}
        defaultSelectedKeys={['0sub1']}
        defaultOpenKeys={['0']}
        mode="inline"
        onSelect={handleMenuSelect}
        items={items}
      />
    </div>
  )
}
