import Style from './ProfileImg.module.css';

const ProfileImg = ({profileImgSrc}) => {
    return(
        <>
            <img className={Style.ProfileImgSrc} src={profileImgSrc}/>
        </>
    )
}
export default ProfileImg;