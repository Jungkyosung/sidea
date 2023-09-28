import Style from './ProfileImg.module.css';

const ProfileImg = ({profileImgSrc}) => {
    return(
        <>
            <img className={Style.ProfileImgSrc} src={profileImgSrc} alt='profileImg'/>
        </>
    )
}
export default ProfileImg;