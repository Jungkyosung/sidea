import Style from './Btn.module.css';

const DeleteBtn = ({ deleteTxt, deleteOnClick }) => {
  return (
    <>
      <button className={Style.DeleteBtn}  onClick={deleteOnClick}>
          {deleteTxt}
      </button>
    </>
  )
}
export default DeleteBtn;