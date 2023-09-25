import Style from './Btn.module.css';
import { MdOutlineClose } from 'react-icons/md';

const CloseBtn = ({ onClick }) => {
  return (
    <>
      <MdOutlineClose className={Style.close} onClick={onClick} />
    </>
  )
}
export default CloseBtn;