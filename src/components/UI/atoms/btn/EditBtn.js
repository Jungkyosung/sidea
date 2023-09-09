import Style from './Btn.module.css';
import DeleteBtn from "./DeleteBtn";
import UpdateBtn from "./UpdateBtn";

const EditBtn = ({ deleteTxt, updateTxt, onUpdate, onDelete}) => {

return (
  <>
  <div className={Style.btnbg}>
    <DeleteBtn deleteTxt={deleteTxt} deleteOnClick={onDelete} />
    <UpdateBtn updateTxt={updateTxt} updateOnClick={onUpdate} />
  </div>
  </>
  );
};

export default EditBtn;