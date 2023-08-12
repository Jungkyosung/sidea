import Style from './SelectToggle.module.css';

const SelectToggleRound = ({ toggleList, toggleActive, onToggle }) => {

  return (
    <div>
      {toggleList.map((list) => (
        <button
          key={list}
          className={toggleActive === list ? Style.toggleActiveRound : Style.toggleUnActiveRound}
          onClick={() => onToggle(list)}
        >
          {list}
        </button>
      ))}
    </div>
  );
};

export default SelectToggleRound;
