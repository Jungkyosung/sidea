import Style from './Btn.module.css';

const DoBtn = ({ doOnClick, doText, doDisabled }) => {

  return (
    <>
      <button className={Style.doBtn} onClick={doOnClick} disabled={doDisabled}>
          {doText}
      </button>
    </>
  )
}
export default DoBtn;