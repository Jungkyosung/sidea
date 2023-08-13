import Style from './MyQnaDetailPage.module.css';
import NaviControll from '../../../naviControll/NaviControll';
import { useState } from 'react';
import ProfileText from '../../../UI/atoms/ProfileText';
import UpdateBtn from '../../../UI/atoms/btn/UpdateBtn';
import EditBtn from '../../../UI/atoms/btn/EditBtn';

const MyQnaDetailPage = () => {

  const [profileInfo, setProfileInfo] = useState({
    profileImgSrc: "https://i.pinimg.com/564x/84/62/80/846280899168e1abab5a6cd0d6e03dcf.jpg",
    profileText: "닉네임"
  });

  const [qnaInfo, setQnaInfo] = useState({
    qnaTitle : "문의 제목 입니다.",
    qnaQuestion : "문의 내용입니다. 여기다 문의하는 게 맞는 건가요?",
    qnaAnswer : "답변 내용입니다. 답변을 해드립니다."
  });

  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <div className={Style.QnaWriteHeadWrap}>
          <ProfileText profileText={profileInfo.profileText} />
          <div className={Style.askListHead} >나의 문의내역</div>
        </div>
        <div className={Style.QnaDetailBox}>
          <div className={Style.MyQnaTitle}>{qnaInfo.qnaTitle}</div>
          <div className={Style.MyQnaText}>{qnaInfo.qnaQuestion}</div>
          <div className={Style.AdminQnaText}>{qnaInfo.qnaAnswer}</div>
          <EditBtn/>

        </div>
      </div>
    </NaviControll>
  )
}
export default MyQnaDetailPage;