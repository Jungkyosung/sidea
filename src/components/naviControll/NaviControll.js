// 네퀵
// 네비

import { useState } from 'react';
import Nav from '../UI/atoms/Nav';
import NavQuick from '../UI/atoms/NavQuick';




const NaviControll = ({ children }) => {

  const [isNavOpen, setIsNavOpen] = useState(false);

  const handlerNavOn = () => {
    setIsNavOpen(true);
  }

  const handlerNavOff = () => {
    setIsNavOpen(false);
  }

  return (
    <>
      {isNavOpen ?
        <Nav handlerNavOff={handlerNavOff}></Nav> :
        <NavQuick handlerNavOn={handlerNavOn}></NavQuick>}
      {children}
    </>
  )
}
export default NaviControll;