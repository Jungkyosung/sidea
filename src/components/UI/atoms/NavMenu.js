import Style from './NavMenu.module.css';
import { PiTriangleFill } from 'react-icons/pi';

const NavMenu = () => {
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
export default NavMenu;