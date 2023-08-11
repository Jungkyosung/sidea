import Style from './Nav.module.css';
import { useNavigate } from "react-router-dom";
import { LiaHomeSolid } from 'react-icons/lia';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BiSolidCircle } from 'react-icons/bi';
import { BiBell } from 'react-icons/bi';

const Nav = (props) => {

  const navigate = useNavigate();
  const handlerNavOff = props.handlerNavOff;

  const handlerNavHome = () => {
    navigate('/');
  }

  return (
    <>
      <div className={Style.navWrap}>
        <div className={Style.navHome} onClick={handlerNavHome}><LiaHomeSolid/></div>
        <div className={Style.navRightWrap}>
          <div className={Style.navQuest}><AiOutlineQuestionCircle/></div>
          <div className={Style.navMenu}><BiSolidCircle/></div>
          <div className={Style.navBell}><BiBell/></div>
        </div>
      </div>
    </>
  )
}
export default Nav;