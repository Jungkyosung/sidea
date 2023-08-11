import { useState } from 'react';
import Style from './MainQuickBtn.module.css';

const MainQuickBtn = ({ quickIcon, quickTitle, handlerMouseOver, handlerMouseOut }) => {
  
  const [isHovered, setIsHovered] = useState(false); // 초기값을 false로 변경

  return (
    <div
      className={Style.mainQuick}
      onMouseOver={() => {
        setIsHovered(true); 
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
    >

      {isHovered 
      ? 
      <p className={Style.mainQuickTitle}>
        {quickTitle}
      </p> 
      : 
      <img className={Style.mainQuickIcon}
        src={quickIcon} alt="" />}
    </div>
  );
};

export default MainQuickBtn;