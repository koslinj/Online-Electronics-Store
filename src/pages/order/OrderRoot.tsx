import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/footer/Footer';
import { TopNavbarOrder } from '@/components/navbar/order/TopNavbarOrder';

export const OrderRoot = () => {

  return (
    <div className='min-h-screen bg-gray-100'>
      <TopNavbarOrder />
      <div className='max-w-7xl mx-auto px-1 sm:px-6'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}