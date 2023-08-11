import Style from './Btn.module.css';

const DoBtn = ({ doOnClick, doText }) => {

  return (
    <>
      <button className={Style.doBtn} onClick={doOnClick}>
          {doText}
      </button>
    </>
  )
}
export default DoBtn;