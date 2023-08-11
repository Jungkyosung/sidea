import { useState } from "react";
import Style from './SelectToggle.module.css';

const SelectToggleRound = ({ toggleId, toggleClickRound, toggleTitle }) => {

  const [ toggleActive, setToggleActive ] = useState(0);

  return (
    <>
      <button 
       className={is머시기 == i ? Style.toggleActiveRound : Style.toggleUnActiveRound}
        id={toggleId} 
        onClick={toggleClickRound}>
          {toggleTitle}
        </button>
    </>
  )
}
export default SelectToggleRound;