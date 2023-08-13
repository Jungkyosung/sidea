import Style from './MyPage.module.css';
import { useState } from 'react';
import Menu from '../../../UI/atoms/Menu';
import ProfileImg from '../../../UI/atoms/ProfileImg';
import ProfileText from '../../../UI/atoms/ProfileText';
import NaviControll from '../../../naviControll/NaviControll';
import { BsPersonFill, BsPlusCircle } from 'react-icons/bs';
import { IoMdDownload } from 'react-icons/io';
import { MdHeadsetMic } from 'react-icons/md';
import { useNavigate } from 'react-router';


const MyPage = () => {

  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState({
    profileImgSrc: "https://i.pinimg.com/564x/84/62/80/846280899168e1abab5a6cd0d6e03dcf.jpg",
    profileText: "닉네임"
  });

  const locations = {
    edit : "/mypage/edit",
    point : "/mypage/point",
    donation : "/campaignlist",
    qna : "/mypage/qnalist"
  }

  function handlerMove(location){
    navigate(location);
  }



  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <ProfileImg profileImgSrc={profileInfo.profileImgSrc} />
        <ProfileText profileText={profileInfo.profileText} />
        <div className={Style.MenuBox}>
          <Menu menuArrowClick={()=>handlerMove(locations.edit)} menuTitle={"계정설정"}><BsPersonFill /></Menu>
          <Menu menuArrowClick={()=>handlerMove(locations.point)} menuTitle={"포인트 관리"}><BsPlusCircle /></Menu>
          <Menu menuArrowClick={()=>handlerMove(locations.donation)} menuTitle={"참여한 기부"}><IoMdDownload /></Menu>
          <Menu menuArrowClick={()=>handlerMove(locations.qna)} menuTitle={"문의하기"}><MdHeadsetMic /></Menu>
        </div>
        <div className={Style.LogoutBtn}>로그아웃</div>
      </div>
    </NaviControll>
  )
}
export default MyPage;

//유저 쪽 페이지 안된거만 하면 될 거 같은데요? 안된거 있을텐데