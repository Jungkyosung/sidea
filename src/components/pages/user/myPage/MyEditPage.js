import Style from './MyEditPage.module.css';
import { useCallback, useEffect, useState } from 'react';
import NaviControll from '../../../naviControll/NaviControll'
import ProfileImg from '../../../UI/atoms/ProfileImg';
import DoBtn from '../../../UI/atoms/btn/DoBtn';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import is from 'date-fns/esm/locale/is/index.js';
// import $ from 'jquery';

const MyEditPage = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState("https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg");
  const [email, setEmail] = useState("");
  const [userPw, setUserPw] = useState('');
  const [currentPw, setCurrentPw] = useState('');
  // const [currentPw, setCurrentPw] = useState('');
  const [nicknameChange, setNicknameChange] = useState(false);
  const [myNickName, setMyNickName] = useState('')
  // 새 비밀번호
  const [changePw, setChangePw] = useState('');
  const [changePwCheck, setChangePwCheck] = useState('');
  
  // 유효성 검사
  const [isValidNickname, setIsValidNickname] = useState(true);
  const [isCurrentPw, setIsCurrentPw] = useState(false);
  const [isPwCheck, setIsPwCheck] = useState(true);  

  // 메세지 출력
  const [messageDuplicate, setMessageDuplicate] = useState('');
  const [currentPwMessage, setCurrentPwMessage] = useState('');
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
          setMyNickName(res.data.userNickname);
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
          alert('정보가 수정되었습니다')
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
    if(e.target.value){
      setIsValidNickname(false);
      setMessageDuplicate("중복 확인을 해주세요");
    }
    if(myNickName == nickname) {
      setIsValidNickname(true);
    }
  }

  // 닉네임 중복 확인
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
        console.log(response);
        console.log(response.config.params.usernickname);
        console.log(myNickName);
        const userNickname = response.config.params.usernickname;
        if (response.data === 0) {
          setIsValidNickname(true);
          setMessageDuplicate("사용 가능한 닉네임 입니다");
        } else if (response.data === 1 && userNickname === myNickName) {
          setIsValidNickname(true);
          setMessageDuplicate("");
        } else {
          setIsValidNickname(false);
          console.log(isValidNickname);
          setMessageDuplicate("이미 사용 중인 닉네임 입니다");
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
        if (response.data == '비밀번호 일치') {
          setIsCurrentPw(true);
          setCurrentPwMessage('');
        } else {
          setIsCurrentPw(false);
          setCurrentPwMessage('현재 비밀번호가 일치하지 않습니다.')
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
  const MIN_PASSWORD_LENGTH = 10;

  const handlerChangePw = (e) => {
 
    const pwLength = e.target.value;
    setChangePw(pwLength);

    if (pwLength.length < MIN_PASSWORD_LENGTH) {
      setPwMessage('비밀번호는 최소 10자 이상이어야 합니다.');
      setIsPwCheck(false);
    } else {
      setPwMessage('');
    }
  };
 
  // 비밀번호 체크
  const handlerCheckPw = useCallback((e) => {
    const pwCheckCurrent = e.target.value;
    setChangePwCheck(pwCheckCurrent);

    if (changePw === pwCheckCurrent) {
      setPwMessage("");
      setIsPwCheck(true);
      console.log("일치");
    } else {
      setPwMessage('비밀번호가 일치하지 않습니다.');
      setIsPwCheck(false);
      console.log("불일치");
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

  const isEdit = () => {
    return (
      isValidNickname &&
      isCurrentPw &&
      isPwCheck
    );
  };

  console.log(isValidNickname)
  console.log(isCurrentPw)
  console.log(isPwCheck)

  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <div className={Style.profile}>
        <ProfileImg profileImgSrc={profileImg} />
        </div>
        <div className={Style.editContents}>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>닉네임</label>
          <div className={Style.nickName_duplicate}>
            <input className={Style.EditInput} id = "nickname" value={nickname} onChange={handlerNickname}></input>
            <button onClick={duplicateNickname}>중복확인</button>
          </div>
          <label className={Style.message}>{messageDuplicate}</label>
        </div>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>현재 비밀번호</label>
          <div>
            <input className={Style.EditInput} onChange={(e)=>setCurrentPw(e.target.value)} onBlur={currentPwCheck}></input>
            <label className={Style.message}>{currentPwMessage}</label>
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
            <label className={Style.message}>{pwMessage}</label>
          </div>
        </div>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>이메일</label>
          <div>
            <input className={Style.EditInput} value={email} readOnly></input>
          </div>
        </div>
        <DoBtn doText={"변경하기"} doOnClick={handlerEdit} doDisabled={!isEdit()}/>
        </div>
        <div className={Style.LeaveBtn} onClick={leaveUser}>탈퇴하기</div>
      </div>
    </NaviControll>
  )
}
export default MyEditPage;