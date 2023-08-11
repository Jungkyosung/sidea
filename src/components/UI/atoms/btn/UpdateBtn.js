import Style from './Btn.module.css';

const UpdateBtn = ({ updateOnClick }) => {

  return (
    <>
      <button className={Style.UpdateBtn}  onClick={updateOnClick}>
          수정
      </button>
    </>
  )
}
export default UpdateBtn;