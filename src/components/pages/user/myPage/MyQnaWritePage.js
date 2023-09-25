import Style from './MyQnaWritePage.module.css';
import NaviControll from '../../../naviControll/NaviControll';
import { useEffect, useState } from 'react';
import ProfileText from '../../../UI/atoms/ProfileText';
import DoBtn from '../../../UI/atoms/btn/DoBtn';
import Input from '../../../UI/atoms/Input';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import CloseBtn from '../../../UI/atoms/btn/CloseBtn';

const MyQnaWritePage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  // const [profileImg, setProfileImg] = useState("https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg");
  const [askTitle, setAskTitle] = useState('');
  const [askContents, setAskContents] = useState('');
  const askDate = new Date();
 
  const handlerTitle = (e) => {
    const inputTitle = e.target.value;
    if (inputTitle.length <= 15) {
      setAskTitle(inputTitle);
    }
  };

  const handlerContent = (e) => {
    setAskContents(e.target.value);
  };

  // 페이지 로드
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    const userIdx = decode_token.userIdx;
    
    const params = { 
      userIdx: userIdx
    };
    
    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/qna`, 
    { params,
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` },
    })
    .then(res => {
      console.log(res.data)     
      setNickname(decode_token.nickname)
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  // 문의 등록
  const handlerAsk = () => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    const userIdx = decode_token.userIdx;
    
    const params = { 
      userIdx: userIdx,
      askTitle : askTitle,
      askContents : askContents,
      askDate : askDate
    };
    
    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/qna`, 
    params, {headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }}
    )
    .then(res => {
      console.log(res.data);
      alert('문의를 등록했습니다');
      window.location.replace(`/mypage/qnalist`);
      
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <div className={Style.QnaWriteHeadWrap}>
          <ProfileText profileText={nickname} />
          <div className={Style.askListHead} >나의 문의내역</div>
        </div>
        <div className={Style.QnaWriteBox}>
          <div className={Style.close}><CloseBtn onClick={() => navigate('/mypage/qnalist')} /></div>
          <div className={Style.QnaWriteTitle}>
          <Input inputPlaceholder={"제목을 입력해주세. (15자 이내)"}
          inputValue={askTitle}
          inputHandler={handlerTitle}/>
          </div>
          <textarea className={Style.QnaWriteCont}
            placeholder='문의할 내용을 입력해주세요'
            value={askContents}
            onChange={handlerContent}>
          </textarea>

        </div>
        <div className={Style.QnaWriteBtm}>
          <DoBtn doText={"문의하기"} doOnClick={handlerAsk}/>
        </div>
      </div>
    </NaviControll>
  )
}
export default MyQnaWritePage;