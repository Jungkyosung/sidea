import Style from './Nav.module.css';
import { useNavigate } from "react-router-dom";
import { LiaHomeSolid } from 'react-icons/lia';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BiSolidCircle, BiCircle } from 'react-icons/bi';
import { BiBell } from 'react-icons/bi';
import { useCallback, useEffect, useRef, useState } from 'react';
import NavPopupMenu from './NavPopupMenu';
import NavPopupBell from './NavPopupBell';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';


const Nav = (props) => {

  const [isLogin, setIsLogin] = useState(false);
  const [isOpenBell, setIsOpenBell] = useState(false);
  
  let stomp = useRef(null);
  

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('token') != null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    //소켓 확인
    console.log("콘솔 확인");

    stomp.current = Stomp.over(()=> new SockJS(`http://localhost:8080/ws`));

    stomp.current.connect({}, onConnected, onError);
  },[]);
  
  const onConnected = () => {
    console.log('connected = topic/alarm');
    stomp.current.subscribe('/topic/alarm', onMessageReceived);
    stomp.current.send('/app/msg', {},
    {msg: '메시지'});
  }



  const onMessageReceived = (payload) => {
    const msg = JSON.parse(payload.body);
    console.log('msg=', msg);
  }

  const onError = useCallback((error) => {
    console.log('연결실패', error);
  }, []);


  const handlerOpenBell = () => {
    if( isOpenBell) {
      setIsOpenBell(false)
    } else {
      setIsOpenBell(true)
      setIsNavOpen(false);
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
    if( isNavOpen) {
      setIsNavOpen(false)
    } else {
      setIsNavOpen(true)
      setIsOpenBell(false);
    }
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