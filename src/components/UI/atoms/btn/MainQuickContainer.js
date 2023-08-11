import React from 'react';
import MainQuickBtn from './MainQuickBtn';
import QuickTodo from './icons/iconn1.png';
import QuickPoint from './icons/iconn2.png';
import QuickMy from './icons/iconn3.png';

const MainQuickContainer = () => {
  
  const handlerMouseOver = () => {};
  const handlerMouseOut = () => {};

  const handlerGoTodo = () => {
    console.log("TODO")
  };

  const handlerGoPoint = () => {
    console.log("Point")
  };

  const handlerGoMy = () => {
    console.log("My")
  };

  return (
    <div>
      <MainQuickBtn
        quickIcon={QuickTodo}
        quickTitle="TODO"
        onMouseOver={handlerMouseOver}
        onMouseOut={handlerMouseOut}
        quickClick={handlerGoTodo}
      />

      <MainQuickBtn
        quickIcon={QuickPoint}
        quickTitle="POINT"
        onMouseOver={handlerMouseOver}
        onMouseOut={handlerMouseOut}
        quickClick={handlerGoPoint}
      />

      <MainQuickBtn
        quickIcon={QuickMy}
        quickTitle="MY"
        onMouseOver={handlerMouseOver}
        onMouseOut={handlerMouseOut}
        quickClick={handlerGoMy}
      />
    </div>
  );
};

export default MainQuickContainer;