import { useCallback, useState } from "react";
import Style from './Login.module.css'
import Input from "../../UI/atoms/Input";
import Title from "../../UI/atoms/Title";
import DoBtn from "../../UI/atoms/btn/DoBtn";
import axios from "axios";
import { BiShowAlt, BiHide } from 'react-icons/bi';


const RegistPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userPwCheck, setUserPwCheck] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  //유효성 검사
  const [isEmail, setIsEmail] = useState(false);       // 이메일
  const [isPwCheck, setIsPwCheck] = useState(false);   // 비밀번호 확인

  // 오류메세지 
  const [emailMessage, setEmailMessage] = useState('');
  const [pwMessage, setPwMessage] = useState('');

  const titleProperties = {
    titleName: "SING UP"
  }

  // 이메일 입력
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const handlerChangeEmail = useCallback((e) => {
    
    const newEmail = e.target.value
        setUserEmail(newEmail);
        if (!emailRegex.test(newEmail)) {
          setEmailMessage('이메일 형식이 올바르지 않습니다.');
          setIsEmail(false);
          setUserNickname('');
        } else {
          setEmailMessage('');
          setIsEmail(true);
          // 
          const nickname = newEmail.split('@')[0];
          setUserNickname(nickname);
        }
    }, [])

  // 닉네임 
  const handlerChangeNickname = (e) => {
    if (isEmail) {
      setUserNickname(e.target.value);
    }
  };

  // 비밀번호
  const handlerChangePassword = e => setUserPw(e.target.value);

  // 비밀번호 체크
  const handlerCheckPassword = useCallback((e) => {
    const pwCheckCurrent = e.target.value
    setUserPwCheck(pwCheckCurrent);

    if (userPw === pwCheckCurrent) {
      setPwMessage("")
      setIsPwCheck(true);
      console.log("일치")
    } else {
      setPwMessage('비밀번호가 일치하지 않습니다.')
      setIsPwCheck(false);
      console.log("불일치")
    }
  }, [userPw])

  // 비밀번호 보여주기 여부
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  // 회원가입 
  const handlerClickLogin = (e) => {
    e.preventDefault();

    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/regist`,
        { userEmail, userNickname, userPw })
        .then(res => {
            navigator('/login');
            localStorage.clear();
            sessionStorage.clear();
            
        })
        .catch(error => {
            console.log(error);
            sessionStorage.clear();
        });
    console.log("회원가입")
  }

  return (
    <>
      <div className={Style.login_container}>
        <div className={Style.registerTitle}>
            <Title titleName={titleProperties.titleName} />
        </div>

        <div className={Style.login_box}>
          <div className={Style.login_input}>
            <Input 
              inputType="text"
              inputValue={userEmail}
              inputHandler= {handlerChangeEmail}
              inputPlaceholder="이메일"
            />
            <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span> 

            <Input 
              inputType="text"
              inputValue={userNickname}
              inputHandler= {handlerChangeNickname}
              inputPlaceholder="닉네임"
            />

            <div className={Style.password_input}>
              <Input
                inputType={hidePassword ? "password" : "text"}
                inputValue={userPw}
                inputHandler= {handlerChangePassword}
                inputPlaceholder="비밀번호" 
              />
              
              <div className={Style.password_hide}>
                {hidePassword ? (
                  <BiShowAlt onClick={toggleHidePassword} ></BiShowAlt>
                ):(
                  <BiHide onClick={toggleHidePassword}></BiHide>
                )}
              </div>
            </div>
            <Input
                inputType={hidePassword ? "password" : "text"}
                inputValue={userPwCheck}
                inputHandler= {handlerCheckPassword}
                inputPlaceholder="비밀번호 확인" 
              />
            <label className={`message ${isPwCheck ? 'success' : 'error'}`}>{pwMessage}</label> 

            <div className={Style.login_submit}>
              <DoBtn doText="회원가입" doOnClick={handlerClickLogin}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistPage;