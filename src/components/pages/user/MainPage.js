import Style from './Main.module.css';
import MainQuickContainer from "../../UI/atoms/btn/MainQuickContainer";
import NaviControll from "../../naviControll/NaviControll";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  
  const handlerIsLogin = () => {
    if(isLogin) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };

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
                <div className={Style.logintext} onChange={handlerIsLogin}></div> : 
                <div className={Style.logintext} onChange={handlerIsLogin}>로그인 이후 이용 가능합니다. <span onClick={handlerGoLogin}>로그인</span></div>
              }
            </div>
          </div>
        </div>
      </NaviControll>
    </>
  )
}
export default MainPage;