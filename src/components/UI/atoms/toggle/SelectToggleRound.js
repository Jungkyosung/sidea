import Style from './SelectToggle.module.css';

const SelectToggleRound = ({ toggleList, toggleActive, onToggle, toggleSwitch }) => {

  return (
    <div className={Style.toggle_container}>
      {toggleList.map((list, index) => (
        <button
          key={index}
          // className={toggleActive === index ? Style.toggleActiveRound : Style.toggleUnActiveRound}
          className={
            Array.isArray(toggleActive) // toggleActive가 배열인지 확인
            ? 
            toggleActive.includes(index) ? Style.toggleActiveRound : Style.toggleUnActiveRound
            : 
            toggleActive === index ? Style.toggleActiveRound : Style.toggleUnActiveRound
          }
          onClick={() => onToggle(index)}
          disabled={toggleSwitch}
        >
          {list}
        </button>
      ))}
    </div>
  );
};

export default SelectToggleRound;
