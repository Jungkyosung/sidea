import { useState } from 'react';
import Style from './MainQuickBtn.module.css';

const MainQuickBtn = ({ quickIcon, quickTitle, quickClick }) => {
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={Style.mainQuick}
        onMouseOver={() => {
          setIsHovered(true); 
        }}
        onMouseOut={() => {
          setIsHovered(false);
        }}
        onClick={() => quickClick()}
      >

      {isHovered 
      ? 
      <p className={Style.mainQuickTitle} >
        {quickTitle}
      </p> 
      : 
      <img className={Style.mainQuickIcon}
        src={quickIcon} alt="" />}
    </div>
  );
};

export default MainQuickBtn;