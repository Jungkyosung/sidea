import Style from './Btn.module.css';

const UpdateBtn = ({ updateTxt, updateOnClick }) => {

  return (
    <>
      <button className={Style.UpdateBtn}  onClick={updateOnClick}>
          {updateTxt}
      </button>
    </>
  )
}
export default UpdateBtn;