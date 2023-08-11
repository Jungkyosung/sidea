import Style from './Menu.module.css';
import { MdKeyboardArrowRight } from 'react-icons/md';


const Menu = ({ children, menuTitle }) => {
    return (
        <>
            <div className={Style.menuWrap}>
                <div className={Style.menuIcon}>
                    {children}
                </div>
                <div className={Style.menuTitle}>
                    {menuTitle}
                </div>
                <div className={Style.menuRightArrow}>
                    <MdKeyboardArrowRight/>
                </div>
            </div>
        </>
    )
}

export default Menu;