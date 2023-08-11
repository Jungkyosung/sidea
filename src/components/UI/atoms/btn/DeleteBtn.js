import Style from './Btn.module.css';

const DeleteBtn = ({ deleteOnClick }) => {
  return (
    <>
      <button className={Style.DeleteBtn}  onClick={deleteOnClick}>
          삭제
      </button>
    </>
  )
}
export default DeleteBtn;