import Style from './SelectToggle.module.css';

const SelectToggleRound = ({ toggleList, toggleActive, onToggle, repeatSwitch }) => {

  return (
    <div className={Style.toggle_container}>
      {toggleList.map((list) => (
        <button
          key={list}
          // className={toggleActive === list ? Style.toggleActiveRound : Style.toggleUnActiveRound}
          className={toggleActive.includes(list) ? Style.toggleActiveRound : Style.toggleUnActiveRound}
          onClick={() => onToggle(list)}
          disabled={repeatSwitch}
        >
          {list}
        </button>
      ))}
    </div>
  );
};

export default SelectToggleRound;
