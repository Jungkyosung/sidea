import { useNavigate } from 'react-router-dom';
import Style from './NavPopupMenu.module.css';
import { PiTriangleFill } from 'react-icons/pi';

const NavPopupMenu = () => {
  const navigate = useNavigate('');

  const locations = {
    todo: "/todolist",
    my: "/mypage",
    logout: "/",
    camp: "/campainglist"
  }

  function handlerMove(location) {
    navigate(location);
  }

  const handlerClickLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    alert('로그아웃 되었습니다')
    window.location.replace(`/`);
  };
  
  return (
    <>
      <div className={Style.NavMenuTriangle}>
        <PiTriangleFill />
      </div>
      <div className={Style.NavMenuBox}>
        <div onClick={() => handlerMove(locations.todo)}>TODO</div>
        {/* <div onClick={() => handlerMove(locations.camp)}>CAMPAIGN</div> */}
        <div onClick={() => handlerMove(locations.my)} >MY</div>
        <div onClick={handlerClickLogout}>LOGOUT</div>
      </div>
    </>
  )
}
export default NavPopupMenu;