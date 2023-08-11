import Style from './Btn.module.css';
import DeleteBtn from "./DeleteBtn";
import UpdateBtn from "./UpdateBtn";

const EditBtn = ({ onUpdate, onDelete}) => {

return (
  <>
  <div className={Style.btnbg}>
    <DeleteBtn deleteOnClick={onDelete} />
    <UpdateBtn updateOnClick={onUpdate} />
  </div>
  </>
  );
};

export default EditBtn;