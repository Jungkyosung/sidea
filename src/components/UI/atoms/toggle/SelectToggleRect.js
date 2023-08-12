import Style from './SelectToggle.module.css';

const SelectToggleRect = ({toggleListRect, toggleActiveRect, onToggleRect }) => {
  
  return (
      <div>
        {toggleListRect.map((list) => (
          <button
            key={list}
            className={toggleActiveRect === list ? Style.toggleActiveRect : Style.toggleUnActiveRect}
            onClick={() => onToggleRect(list)}
          >
            {list}
          </button>
        ))}
      </div>
  );
};

export default SelectToggleRect;