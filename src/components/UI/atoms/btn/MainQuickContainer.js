import React from 'react';
import MainQuickBtn from './MainQuickBtn';
import QuickTodo from './icons/iconn1.png';
import QuickPoint from './icons/iconn2.png';
import QuickMy from './icons/iconn3.png';

const MainQuickContainer = () => {
  
  const handlerMouseOver = () => {}
  const handlerMouseOut = () => {}

  return (
    <div>
      <MainQuickBtn
        quickIcon={QuickTodo}
        quickTitle="TODO"
        onMouseOver={handlerMouseOver}
        onMouseOut={handlerMouseOut}
      />

      <MainQuickBtn
        quickIcon={QuickPoint}
        quickTitle="POINT"
        onMouseOver={handlerMouseOver}
        onMouseOut={handlerMouseOut}
      />

      <MainQuickBtn
        quickIcon={QuickMy}
        quickTitle="MY"
        onMouseOver={handlerMouseOver}
        onMouseOut={handlerMouseOut}
      />
    </div>
  );
};

export default MainQuickContainer;