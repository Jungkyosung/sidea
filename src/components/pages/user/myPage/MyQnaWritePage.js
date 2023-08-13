import Style from './MyQnaWritePage.module.css';
import NaviControll from '../../../naviControll/NaviControll';
import { useState } from 'react';
import ProfileText from '../../../UI/atoms/ProfileText';
import DoBtn from '../../../UI/atoms/btn/DoBtn';
import Input from '../../../UI/atoms/Input';

const MyQnaWritePage = () => {

  const [profileInfo, setProfileInfo] = useState({
    profileImgSrc: "https://i.pinimg.com/564x/84/62/80/846280899168e1abab5a6cd0d6e03dcf.jpg",
    profileText: "닉네임"
  });

  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <div className={Style.QnaWriteHeadWrap}>
          <ProfileText profileText={profileInfo.profileText} />
          <div className={Style.askListHead} >나의 문의내역</div>
        </div>
        <div className={Style.QnaWriteBox}>
          <Input inputPlaceholder={"제목을 입력해주세. (15자 이내)"} />
          <textarea className={Style.QnaWriteCont} placeholder='문의할 내용을 입력해주세요'></textarea>

        </div>
        <div className={Style.QnaWriteBtm}>
            <DoBtn doText={"문의하기"} />
          </div>
      </div>
    </NaviControll>
  )
}
export default MyQnaWritePage;