import { useEffect, useState } from 'react';
import Nav from '../UI/atoms/Nav';
import NavQuick from '../UI/atoms/NavQuick';
import NavAdmin from '../UI/atoms/NavAdmin';
import jwt_decode from "jwt-decode";



const NaviControll = ({ children }) => {

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem('token') != null) {
      const token = sessionStorage.getItem('token');
      const decode_token = jwt_decode(token);
      setUserAuth(decode_token.userAuth);
    }
  },[]);


  const handlerNavOn = () => {
    setIsNavOpen(true);
  }

  const handlerNavOff = () => {
    setIsNavOpen(false);
  }


  return (
    <>
      {userAuth === 0 ? 
      <><NavAdmin /> {children}</> 
      : 
        (
          <>
            {isNavOpen ?
            <Nav handlerNavOff={handlerNavOff}></Nav> :
            <NavQuick handlerNavOn={handlerNavOn}></NavQuick>
            }
            {children}
          </>
        )
      }
    </>
  )
}
export default NaviControll;