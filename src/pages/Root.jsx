import { TopNavbar } from '../components/navbar/TopNavbar'
import { BottomNavbar } from '../components/navbar/BottomNavbar'
import { Outlet } from 'react-router-dom'

export const Root = () => {
  return (
    <>
      <TopNavbar />
      <BottomNavbar />
      <Outlet />
    </>
  )
}
