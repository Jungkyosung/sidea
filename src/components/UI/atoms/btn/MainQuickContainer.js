import React from 'react';
import Style from './MainQuickBtn.module.css';
import MainQuickBtn from './MainQuickBtn';
import QuickTodo from './icons/iconn1.png';
import QuickPoint from './icons/iconn2.png';
import QuickMy from './icons/iconn3.png';
import { useNavigate } from 'react-router-dom';

const MainQuickContainer = () => {
  
  const navigate = useNavigate();

  const locations = {
    todo : "/todolist",
    point : "/mypage/point",
    mypage: "/mypage"
  };

  function handlerMove(location){
    navigate(location);
  };

  return (
    <div className={Style.container}>
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
    </div>
  );
};

export default MainQuickContainer;