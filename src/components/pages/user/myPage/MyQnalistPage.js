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
  const [profileImg, setProfileImg] = useState('');
  const [data, setData] = useState('');
  const navigate = useNavigate();

  let prfImgSrc = '';
  if (profileImg !== '') {
    prfImgSrc = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/image/${profileImg}`;
  }

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
      setNickname(decode_token.nickname);
      setProfileImg(decode_token.userImage);
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
    <ProfileImgTmp profileImgSrc={prfImgSrc} profileText={nickname}>
      <div className={Style.askListHead} >나의 문의내역</div>
      <div className={Style.askListBox}>
        { Array.isArray(data) && data.length > 0 ? 
          (data.map((ask, index) => (
            <AskList
              key={ask.askIdx}
              askNumber={data.length - index}
              askTitleClick={() => handlerNavi(ask.askIdx)}
              askTitle={ask.askTitle}
              askIsCommented={ask.askAnswer && ask.askAnswerDelete !== "Y" ? true : false} />
            ))
          ) 
          : (<div className={Style.nullContens}>등록된 문의가 없습니다</div>)
        }
      </div>
      <DoBtn doOnClick={() => handlerMove("/mypage/qna/write")} doText={"문의하기"} />
    </ProfileImgTmp>
  )
}
export default MyQnalistPage;