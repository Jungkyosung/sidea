import Style from './Nav.module.css';
import { useNavigate } from "react-router-dom";
import { LiaHomeSolid } from 'react-icons/lia';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BiSolidCircle, BiCircle } from 'react-icons/bi';
import { BiBell } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import NavPopupMenu from './NavPopupMenu';
import NavPopupBell from './NavPopupBell';

const Nav = (props) => {

  const [isLogin, setIsLogin] = useState(false);
  const [isOpenBell, setIsOpenBell] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('token') != null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  },[]);
  

  const handlerOpenBell = () => {
    if( isOpenBell) {
      setIsOpenBell(false)
    } else {
      setIsOpenBell(true)
    }
  }

  const handlerNavHome = () => {
    navigate('/');
  }

  const handlerNavLogin = () => {
    navigate('/login');
  };

  const [isNavOpen, setIsNavOpen] = useState(false);

  const clickNavMenu = () => {
    setIsNavOpen(!isNavOpen);
  };


  return (
    <>
      <div className={Style.navWrap}>
        <div className={Style.navHome} onClick={handlerNavHome}><LiaHomeSolid/></div>
        <div className={Style.navRightWrap}>
          <div className={Style.navQuest}><AiOutlineQuestionCircle/></div>
          {isLogin ? 
          <div className={Style.navMenu} ><BiCircle onClick={clickNavMenu}/> {isNavOpen && <NavPopupMenu />}</div> : 
          <div className={Style.navMenu} onClick={handlerNavLogin}><BiSolidCircle/></div>
          }
          {isOpenBell ?
          <div className={Style.navBell} onClick={handlerOpenBell}><BiBell/><NavPopupBell/></div> : 
          <div className={Style.navBell} onClick={handlerOpenBell}><BiBell/></div>
          }
          

        </div>
      </div>
    </>
  )
}
export default Nav;