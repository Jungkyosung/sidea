import { useNavigate } from 'react-router-dom';
import Style from './NavQuick.module.css';
import { BiHomeSmile } from 'react-icons/bi';

const NavAdmin = () => {
  const navigate= useNavigate();

  const clickAdminHome = () => {
    navigate(`/admin`)
  }

  return (
    <>
      <div id={Style.navQuick} onClick={clickAdminHome}>
        <BiHomeSmile/>
      </div>
    </>
  )
}
export default NavAdmin;