import Style from './Main.module.css';
import MainQuickContainer from "../../UI/atoms/btn/MainQuickContainer";
import NaviControll from "../../naviControll/NaviControll";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const MainPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [userIdx, setUserIdx] = useState('');
  const [nickname, setNickname] = useState('');
  
  useEffect(() => {
    if (sessionStorage.getItem('token') != null) {
      const token = sessionStorage.getItem('token');
      const decode_token = jwt_decode(token);
      setIsLogin(true);
      setUserIdx(decode_token.userIdx);
      setNickname(decode_token.nickname);
    } else {
      setIsLogin(false);
    }
  },[]);

  const handlerGoLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <NaviControll>
        <div className={Style.main_container}>
          <div className={Style.main_box}>
            <div className={Style.main_header}>
              <h1>SIDE A</h1>
              <p>습관형성에 도움을 주고 포인트 적립으로 동기부여까지 실패해도 기부로 선한 영향력을 펼쳐보세요</p>
            </div>
            <div className={Style.main_menu}>
              <MainQuickContainer />
              {isLogin ? 
                <div className={Style.logintext} >{nickname}</div> : 
                <div className={Style.logintext} >로그인 이후 이용 가능합니다. <span onClick={handlerGoLogin}>로그인</span></div>
              }
            </div>
          </div>
        </div>
      </NaviControll>
    </>
  )
}
export default MainPage;