const RadioBtn = ({ radioId, radioName, radioValue, radioTitle}) => {
  return (
    <>
      <input type="radio" id={radioId} name={radioName} value={radioValue} />
      <label>{radioTitle}</label>
    </>
  )
}
export default RadioBtn;