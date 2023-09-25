import { useState } from 'react';
import Style from './Input.module.css';

const Input = ({ inputType, inputValue, inputHandler, inputPlaceholder, readOnly }) => {
  
  return (
    <>
      <div>
        <input className={Style.inputBox}
              type={inputType}
              value={inputValue}
              onChange={inputHandler}
              placeholder={inputPlaceholder}
              disabled={readOnly}
        />
      </div>
    </>
  )
}
export default Input;
