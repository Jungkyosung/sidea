import Style from './NavPopupMenu.module.css';
import { PiTriangleFill } from 'react-icons/pi';

const NavPopupMenu = () => {
  return (
    <>
      <div className={Style.NavMenuTriangle}>
        <PiTriangleFill />
      </div>
      <div className={Style.NavMenuBox}>
        <div>TODO</div>
        <div>MY</div>
        <div>LOGOUT</div>
      </div>
    </>
  )
}
export default NavPopupMenu;