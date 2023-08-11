import Style from './ProfileText.module.css';

const ProfileText = ({profileText}) => {
    return (
        <>
            <div className={Style.profileText}>{profileText}</div>
        </>
    )
}
export default ProfileText;