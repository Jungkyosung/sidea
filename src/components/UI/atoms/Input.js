import { useState } from 'react';
import Style from './Input.module.css';

const Input = ({ inputType, inputValue, inputHandler, inputPlaceholder }) => {
  
  return (
    <>
      <div>
        <input className={Style.inputBox}
              type={inputType}
              value={inputValue}
              onChange={inputHandler}
              placeholder={inputPlaceholder} />
      </div>
    </>
  )
}
export default Input;
