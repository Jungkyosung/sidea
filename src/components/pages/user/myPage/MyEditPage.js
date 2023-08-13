import Style from './MyEditPage.module.css';
import { useState } from 'react';
import NaviControll from '../../../naviControll/NaviControll'
import ProfileImg from '../../../UI/atoms/ProfileImg';
import DoBtn from '../../../UI/atoms/btn/DoBtn';


const MyEditPage = () => {

  const [profileInfo, setProfileInfo] = useState({
    profileImgSrc: "https://i.pinimg.com/564x/84/62/80/846280899168e1abab5a6cd0d6e03dcf.jpg",
    profileText: "닉네임"
  });

  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <ProfileImg profileImgSrc={profileInfo.profileImgSrc} />
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>닉네임</label>
          <div>
            <input className={Style.EditInput}></input>
          </div>
        </div>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>현재 비밀번호</label>
          <div>
            <input className={Style.EditInput}></input>
          </div>
        </div>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>새 비밀번호</label>
          <div>
            <input className={Style.EditInput}></input>
          </div>
        </div>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>새 비밀번호 확인</label>
          <div>
            <input className={Style.EditInput}></input>
          </div>
        </div>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>이메일</label>
          <div>
            <input className={Style.EditInput}></input>
          </div>
        </div>
        <DoBtn doText={"변경하기"} />
        <div className={Style.LeaveBtn}>탈퇴하기</div>
      </div>
    </NaviControll>
  )
}
export default MyEditPage;