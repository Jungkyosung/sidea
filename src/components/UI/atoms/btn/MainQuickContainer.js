import React from 'react';
import Style from './MainQuickBtn.module.css';
import MainQuickBtn from './MainQuickBtn';
import QuickTodo from './icons/iconn1.png';
import QuickPoint from './icons/iconn2.png';
import QuickMy from './icons/iconn3.png';
import { useNavigate } from 'react-router-dom';

const MainQuickContainer = ({isLogin}) => {
  
  const navigate = useNavigate();

  const locations = {
    todo : "/todolist",
    point : "/mypage/point",
    mypage: "/mypage",
    login: "/login"
  };

  function handlerMove(location){
    navigate(location);
  };

  function handlerAlert(location){
    alert('로그인 후 이용 가능합니다. 로그인 페이지로 이동합니다')
    navigate(location);
  };

  return (
    <div className={Style.container}>
      {isLogin ?
        (<>
          <MainQuickBtn
          quickIcon={QuickTodo}
          quickTitle="TODO"
          quickClick={()=>handlerMove(locations.todo)}
          />

          <MainQuickBtn
            quickIcon={QuickPoint}
            quickTitle="POINT"
            quickClick={()=>handlerMove(locations.point)}
          />

          <MainQuickBtn
            quickIcon={QuickMy}
            quickTitle="MY"
            quickClick={()=>handlerMove(locations.mypage)}
          />
        </>)
        :
        (<>
          <MainQuickBtn
          quickIcon={QuickTodo}
          quickTitle="TODO"
          quickClick={()=>handlerAlert(locations.login)}
          />

          <MainQuickBtn
            quickIcon={QuickPoint}
            quickTitle="POINT"
            quickClick={()=>handlerAlert(locations.login)}
          />

          <MainQuickBtn
            quickIcon={QuickMy}
            quickTitle="MY"
            quickClick={()=>handlerAlert(locations.login)}
          />
        </>)
      }
    </div>
  );
};

export default MainQuickContainer;