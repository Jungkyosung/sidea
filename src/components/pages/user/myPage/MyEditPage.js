import Style from './MyEditPage.module.css';
import { useCallback, useEffect, useState } from 'react';
import NaviControll from '../../../naviControll/NaviControll'
import ProfileImg from '../../../UI/atoms/ProfileImg';
import DoBtn from '../../../UI/atoms/btn/DoBtn';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
// import $ from 'jquery';

const MyEditPage = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState("https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg");
  const [email, setEmail] = useState("");
  const [userPw, setUserPw] = useState('');
  const [currentPw, setCurrentPw] = useState('');
  // const [currentPw, setCurrentPw] = useState('');

  // 새 비밀번호
  const [changePw, setChangePw] = useState('');
  const [changePwCheck, setChangePwCheck] = useState('');
  
  // 유효성 검사
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [isCurrentPw, setIsCurrentPw] = useState(false);
  const [isPwCheck, setIsPwCheck] = useState(false);  

  // 메세지 출력
  const [messageDuplicate, setMessageDuplicate] = useState('');
  const [pwMessage, setPwMessage] = useState('');


  // 조회 (닉네임, 프로필 이미지, 비밀번호, 이메일)
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
          // setProfileImg(res.data.userImg);
          setEmail(res.data.userEmail);
          setUserPw(res.data.userPw);
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

  // 닉네임, 프로필 이미지, 비밀번호 수정가능
  const handlerEdit = () => {
    
    axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user`,
      { userEmail: email, userPw: changePw, userImg: profileImg, userNickname: nickname },
      { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => {
          console.log(res);
            navigate("/mypage")
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
        })
  
  };

  // input handler
  const handlerNickname = (e) => {
    setNickname(e.target.value);
  }

  // 아이디 중복 확인
  const duplicateNickname = () => {
    const params = {
      usernickname: nickname
    }
    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/usernickname/duplicate`,
    {params}, { 
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
    })
      .then((response) => {
        console.log(response)
        if(response.data === 0){
          setIsValidNickname(true);
          setMessageDuplicate("true");
        }  else {
          setIsValidNickname(false);
          console.log(isValidNickname);
          setMessageDuplicate("false");
        }
      })
      .catch((err) => {
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
  }

  // 현재 비밀번호 일치 여부
  const currentPwCheck = () => {
    const params = {
      userEmail: email,
      userPw: currentPw
    }
    

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/userpw`,
    {params}, { 
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
    })
      .then((response) => {
        console.log(response.data);
        if (response.data == userPw) {
          setIsCurrentPw(true);
        } else {
          setIsCurrentPw(false);
        }
      })
      .catch((err) => {
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
  }
  
  
  // 비밀번호
  const handlerChangePw = e => setChangePw(e.target.value);

  // 비밀번호 체크
  const handlerCheckPw = useCallback((e) => {
    const pwCheckCurrent = e.target.value
    setChangePwCheck(pwCheckCurrent);

    if (changePw === pwCheckCurrent) {
      setPwMessage("")
      setIsPwCheck(true);
      console.log("일치")
    } else {
      setPwMessage('비밀번호가 일치하지 않습니다.')
      setIsPwCheck(false);
      console.log("불일치")
    }
  }, [changePw]);

  // 
  const leaveUser = () => {
    axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/delete`,
    { userEmail: email, userPw: userPw },
    { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
    })
      .then(res => {
        console.log(res);
          navigate("/");
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
      })
    console.log("leave")
  };


  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <ProfileImg profileImgSrc={profileImg} />
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>닉네임</label>
          <div>
            <input className={Style.EditInput} id = "nickname" value={nickname} onChange={handlerNickname}></input>
            <button onClick={duplicateNickname}>중복확인</button>
          </div>
          <label >{messageDuplicate}</label>
        </div>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>현재 비밀번호</label>
          <div>
            <input className={Style.EditInput} onChange={(e)=>setCurrentPw(e.target.value)} onBlur={currentPwCheck}></input>
          </div>
        </div>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>새 비밀번호</label>
          <div>
            <input className={Style.EditInput} value={changePw} onChange={handlerChangePw}></input>
          </div>
        </div>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>새 비밀번호 확인</label>
          <div>
            <input className={Style.EditInput} value={changePwCheck} onChange={handlerCheckPw}></input>
            <label className={`message ${isPwCheck ? 'success' : 'error'}`}>{pwMessage}</label>
          </div>
        </div>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>이메일</label>
          <div>
            <input className={Style.EditInput} value={email} readOnly></input>
          </div>
        </div>
        <DoBtn doText={"변경하기"} doOnClick={handlerEdit}/>
        <div className={Style.LeaveBtn} onClick={leaveUser}>탈퇴하기</div>
      </div>
    </NaviControll>
  )
}
export default MyEditPage;