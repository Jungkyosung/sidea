import Style from './MyQnalistPage.module.css';
import { useState } from 'react';
import NaviControll from '../../../naviControll/NaviControll';
import ProfileImg from '../../../UI/atoms/ProfileImg';
import ProfileText from '../../../UI/atoms/ProfileText';
import DoBtn from '../../../UI/atoms/btn/DoBtn';
import AskList from '../../../UI/atoms/AskList';
import { useNavigate } from 'react-router';
import ProfileImgTmp from '../../../templates/ProfileImgTmp';

const MyQnalistPage = () => {

  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState({
    profileImgSrc: "https://i.pinimg.com/564x/84/62/80/846280899168e1abab5a6cd0d6e03dcf.jpg",
    profileText: "닉네임"
  });

  function handlerMove(location) {
    navigate(location);
  }

  return (
    <ProfileImgTmp profileImgSrc={profileInfo.profileImgSrc} profileText={profileInfo.profileText}>
      <div className={Style.askListHead} >나의 문의내역</div>
      <div className={Style.askListBox}>
        <AskList askNumber={"1"} askTitleClick={() => handlerMove("/mypage/qna/detail/1")} askTitle={"문의샘플제목1"} askIsCommented={true} />
        <AskList askNumber={"2"} askTitleClick={() => handlerMove("/mypage/qna/detail/2")} askTitle={"문의샘플제목 길어지면 어떻게 될까?2"} askIsCommented={true} />
        <AskList askNumber={"3"} askTitleClick={() => handlerMove("/mypage/qna/detail/3")} askTitle={"문의샘플제목 길어지면 어떻게 될까?3"} askIsCommented={false} />
        <AskList askNumber={"4"} askTitleClick={() => handlerMove("/mypage/qna/detail/4")} askTitle={"문의샘플제목4"} askIsCommented={false} />
        <AskList askNumber={"5"} askTitleClick={() => handlerMove("/mypage/qna/detail/5")} askTitle={"문의샘플제목5"} askIsCommented={false} />
        <AskList askNumber={"6"} askTitleClick={() => handlerMove("/mypage/qna/detail/6")} askTitle={"문의샘플제목 길어지면 어떻게 될까?6"} askIsCommented={true} />
        <AskList askNumber={"7"} askTitleClick={() => handlerMove("/mypage/qna/detail/7")} askTitle={"문의샘플제목 길어지면 어떻게 될까?7"} askIsCommented={true} />
        <AskList askNumber={"8"} askTitleClick={() => handlerMove("/mypage/qna/detail/8")} askTitle={"문의샘플제목 길어지면 어떻게 될까?8"} askIsCommented={false} />
        <AskList askNumber={"9"} askTitleClick={() => handlerMove("/mypage/qna/detail/9")} askTitle={"문의샘플제목 길어지면 어떻게 될까?9"} askIsCommented={true} />
      </div>
      <DoBtn doOnClick={() => handlerMove("/mypage/qna/write")} doText={"문의하기"} />
    </ProfileImgTmp>
  )
}
export default MyQnalistPage;