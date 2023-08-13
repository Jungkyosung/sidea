import Style from './ProfileImgTmp.module.css';
import NaviControll from '../naviControll/NaviControll';
import ProfileImg from '../UI/atoms/ProfileImg';
import ProfileText from '../UI/atoms/ProfileText';


const ProfileImgTmp = ({children, profileImgSrc, profileText }) => {

  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <ProfileImg profileImgSrc={profileImgSrc} />
        <ProfileText profileText={profileText} />
        {children}
      </div>
    </NaviControll>
  )
}
export default ProfileImgTmp;