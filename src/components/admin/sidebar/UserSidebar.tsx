import { Menu, MenuProps } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoChecklist } from "react-icons/go";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

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

interface Props {
  setSelectedMenuItem: Dispatch<SetStateAction<string>>
  user: {
    username: string
    role: string
    firstName: string
  }
}

export const UserSidebar = ({ setSelectedMenuItem, user }: Props) => {
  const { t } = useTranslation()

  const items: MenuItem[] = [
    getItem(<p className='text-lg'>{t('orders')}</p>, '0', <GoChecklist className='size-6' />),
    getItem(<p className='text-lg'>{t('opinions')}</p>, '1', <FaRegCommentAlt className='size-6' />),
    getItem(<p className='text-lg'>{t('orderingData')}</p>, '2', <FaRegAddressCard className='size-6' />),
    getItem(<p className='text-lg'>{t('accountSettings')}</p>, '3', <IoSettingsOutline className='size-6' />),
  ];

  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedMenuItem(key);
  };

  return (
    <div className='w-64 mr-4 border-r-2 border-gray-400'>
      <div className='ml-4 mb-4'>
        <p className='text-xl'>{t('hello')}</p>
        <p className='text-xl font-semibold'>{user.firstName}</p>
      </div>
      <Menu
        style={{
          borderRadius: '14px',
        }}
        defaultSelectedKeys={['0']}
        mode="inline"
        onSelect={handleMenuSelect}
        items={items}
      />
    </div>
  )
}
