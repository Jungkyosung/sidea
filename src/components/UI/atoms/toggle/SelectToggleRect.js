import Style from './SelectToggle.module.css';

const SelectToggleRect = ({toggleListRect, toggleActiveRect, onToggleRect }) => {
  
  return (
      <div className={Style.toggle_container}>
        {toggleListRect.map((list, index) => (
          <button
            key={index}
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