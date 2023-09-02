import Style from './MyQnalistPage.module.css';
import { useEffect, useState } from 'react';
import DoBtn from '../../../UI/atoms/btn/DoBtn';
import AskList from '../../../UI/atoms/AskList';
import { useNavigate } from 'react-router';
import ProfileImgTmp from '../../../templates/ProfileImgTmp';
import axios from "axios";
import jwt_decode from "jwt-decode";

const MyQnalistPage = () => {
  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState("https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg");
  const [data, setData] = useState('');
  const navigate = useNavigate();


  // 페이지 로딩시 및 날짜 선택 변경시 데이터 로드
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    const userIdx = decode_token.userIdx;
    
    const params = { userIdx: userIdx};
    
    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/qna`, 
    {
      params,
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` },
    })
    .then(res => {
      console.log(res.data)
      setData(res.data);      
      setNickname(decode_token.nickname)
    })
    .catch(err => {
      console.log(err);
    });
  }, []);


  function handlerMove(location) {
    navigate(location);
  }

  function handlerNavi(id) {
    navigate(`/mypage/qna/detail/${id}`);
  }

  return (
    <ProfileImgTmp profileImgSrc={profileImg} profileText={nickname}>
      <div className={Style.askListHead} >나의 문의내역</div>
      <div className={Style.askListBox}>
      { data && data.map((ask, index) => (
           <AskList
            key={ask.askIdx}
            askNumber={index + 1}
            askTitleClick={() => handlerNavi(ask.askIdx)}
            askTitle={ask.askTitle}
            askIsCommented={ask.askAnswer ? true : false} />
          ))}
      </div>
      <DoBtn doOnClick={() => handlerMove("/mypage/qna/write")} doText={"문의하기"} />
    </ProfileImgTmp>
  )
}
export default MyQnalistPage;