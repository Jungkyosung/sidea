import Style from './Nav.module.css';
import { useNavigate } from "react-router-dom";
import { LiaHomeSolid } from 'react-icons/lia';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BiSolidCircle, BiCircle } from 'react-icons/bi';
import { BiBell } from 'react-icons/bi';
import { useState } from 'react';
import NavMenu from './NavMenu';

const Nav = (props) => {

  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();
  const handlerNavOff = props.handlerNavOff;
  const handlerIsLogin = () => {
    if( isLogin) {
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }
  }

  const handlerNavHome = () => {
    navigate('/');
  }



  return (
    <>
      <div className={Style.navWrap}>
        <div className={Style.navHome} onClick={handlerNavHome}><LiaHomeSolid/></div>
        <div className={Style.navRightWrap}>
          <div className={Style.navQuest}><AiOutlineQuestionCircle/></div>
          {isLogin ? 
          <div className={Style.navMenu} onClick={handlerIsLogin}><BiSolidCircle/><NavMenu/></div> : 
          <div className={Style.navMenu} onClick={handlerIsLogin}><BiCircle/></div>
          }
          <div className={Style.navBell}><BiBell/></div>
        </div>
      </div>
    </>
  )
}
export default Nav;