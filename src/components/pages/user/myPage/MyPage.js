import Style from './MyPage.module.css';
import { useEffect, useState } from 'react';
import Menu from '../../../UI/atoms/Menu';
import { BsPersonFill, BsPlusCircle } from 'react-icons/bs';
import { IoMdDownload } from 'react-icons/io';
import { MdHeadsetMic } from 'react-icons/md';
import { useNavigate } from 'react-router';
import ProfileImgTmp from '../../../templates/ProfileImgTmp';
import axios from "axios";
import jwt_decode from "jwt-decode";

const MyPage = () => {

  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState("https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg");



  // 조회 (닉네임, 프로필 이미지)
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    const email = decode_token.email;
    console.log(decode_token);
    const params = { userEmail : email }
    // api/userinfo?userEmail=jks@jks.com으로 바꿨는데 인식이 안되네요  

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/userinfo`,
      { params } , { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => {
          console.log(res.data);
          setNickname(res.data.userNickname);
          // setProfileImg(res.data.profileImg);
        })
        .catch(err => {
          if (err.response) {
            // 요청은 성공했지만 서버에서 오류 응답을 보낸 경우
            console.error('서버 응답 오류:', err.response.data);
          } else if (err.request) {
            // 요청이 전송되지 않은 경우 (네트워크 문제 등)
            console.error('요청 전송 실패:', err.request);
          } else {
            // 기타 오류
            console.error('오류:', err.message);
          }
        });
        
}, []);

  const locations = {
    edit: "/mypage/edit",
    point: "/mypage/point",
    donation: "/mypage/campaignlist",
    qna: "/mypage/qnalist"
  }

  function handlerMove(location) {
    navigate(location);
  }



  return (
    <ProfileImgTmp profileImgSrc={profileImg} profileText={nickname}>
      <div className={Style.MenuBox}>
        <Menu menuArrowClick={() => handlerMove(locations.edit)} menuTitle={"계정설정"}><BsPersonFill /></Menu>
        <Menu menuArrowClick={() => handlerMove(locations.point)} menuTitle={"포인트 관리"}><BsPlusCircle /></Menu>
        <Menu menuArrowClick={() => handlerMove(locations.donation)} menuTitle={"참여한 기부"}><IoMdDownload /></Menu>
        <Menu menuArrowClick={() => handlerMove(locations.qna)} menuTitle={"문의하기"}><MdHeadsetMic /></Menu>
      </div>
      <div className={Style.LogoutBtn}>로그아웃</div>
    </ProfileImgTmp>
  )
}
export default MyPage;