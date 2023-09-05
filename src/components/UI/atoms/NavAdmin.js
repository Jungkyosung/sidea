import Style from './NavQuick.module.css';
import { BiHomeSmile } from 'react-icons/bi';

const NavAdmin = (clickAdminHome) => {

  

  return (
    <>
      <div id={Style.navQuick} onClick={clickAdminHome}>
        <BiHomeSmile/>
      </div>
    </>
  )
}
export default NavAdmin;