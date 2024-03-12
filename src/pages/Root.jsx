import { TopNavbar } from '../components/navbar/TopNavbar'
import { BottomNavbar } from '../components/navbar/BottomNavbar'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react';

export const Root = () => {
  // const [side, setSide] = useState("left");

  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     const mouseX = e.clientX;

  //     const threshold = window.innerWidth / 2;

  //     if (mouseX <= threshold) {
  //       setSide("right");
  //     } else {
  //       setSide("left");
  //     }
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);

  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  return (
    <>
      <TopNavbar />
      <BottomNavbar />
      <Outlet />
    </>
  )
}
