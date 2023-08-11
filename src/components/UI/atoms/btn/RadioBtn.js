const RadioBtn = ({ radioList, selectRadio, onRadioChange}) => {

  return (
    <div>
      {radioList.map((list) => (
        <label key={list}>
          <input type="radio" 
              value={radioList}
              checked={selectRadio === list} 
              onChange={() => onRadioChange(list)}
          />
          {list}
        </label>
      ))}
    </div>
  )
}
export default RadioBtn;