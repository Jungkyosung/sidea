import Style from './NavQuick.module.css';
import { BiMenu } from 'react-icons/bi';

const NavQuick = (props) => {

  const handlerNavOn = props.handlerNavOn;

  return (
    <>
      <div id={Style.navQuick} onClick={handlerNavOn}><BiMenu/></div>
    </>
  )
}
export default NavQuick;