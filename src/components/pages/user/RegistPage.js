import { useCallback, useState } from "react";
import Style from './Login.module.css'
import Input from "../../UI/atoms/Input";
import Title from "../../UI/atoms/Title";
import DoBtn from "../../UI/atoms/btn/DoBtn";
import axios from "axios";
import { BiShowAlt, BiHide } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";


const RegistPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [registerCode, setRegisterCode] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userPwCheck, setUserPwCheck] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const navigator = useNavigate();

  //유효성 검사
  const [isEmail, setIsEmail] = useState(false);       // 이메일
  const [isPwCheck, setIsPwCheck] = useState(false);   // 비밀번호 확인
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);
  
  // 오류메세지 
  const [emailMessage, setEmailMessage] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [messageDuplicate, setMessageDuplicate] = useState('');
  const [messageEmailDuplicate, setMessageEmailDuplicate] = useState('');

  const titleProperties = {
    titleName: "SING UP"
  }

  // 이메일 입력
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const handlerChangeEmail = useCallback((e) => {
    setMessageDuplicate('');
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
          setIsValidNickname(false);
          setMessageDuplicate("중복확인을 해주세요");
        }
    }, [])

  const handlerChangeCode = (e) => {
    setRegisterCode(e.target.value);
  }

  // 닉네임 
  const handlerChangeNickname = (e) => {
    if (isEmail) {
      setUserNickname(e.target.value);
    }
    if(e.target.value) {
      setIsValidNickname(false);
      setMessageDuplicate("중복 확인을 해주세요");
    } 
  }; 

  // 이메일 검증 확인
  const validateEmail = () => {

    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/email/code`,
    userEmail, {headers: {
      'Content-Type': 'text/plain'
    }})
      .then((response) => {
        alert('메일주소로 코드번호를 보냈습니다. 코드를 입력하면 가입이 가능합니다.')
        console.log(response)
      })
      .catch((err) => {
        console.error(err.response);
      });
  }


  // 이메일 중복 확인
  const duplicateEmail = () => {
    const params = {  useremail: userEmail };

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/useremail/duplicate`,
    {params}, { 
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
    })
      .then((response) => {
        console.log(response)
        if(response.data === 0){
          setIsValidEmail(true);
          setMessageEmailDuplicate("사용 가능한 이메일입니다");
        }  else {
          setIsValidEmail(false);
          setMessageEmailDuplicate("이미 사용 중인 이메일입니다");
        }
      })
      .catch((err) => {
        console.error(err.response);
      });
  }


  // 닉네임 중복 확인
  const duplicateNickname = () => {
    const params = {  usernickname: userNickname };

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/usernickname/duplicate`,
    {params}, { 
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
    })
      .then((response) => {
        console.log(response)
        if(response.data === 0){
          setIsValidNickname(true);
          setMessageDuplicate("사용 가능한 닉네임입니다");
        }  else {
          setIsValidNickname(false);
          setMessageDuplicate("이미 사용 중인 닉네임 입니다");
        }
      })
      .catch((err) => {
        console.error(err.response);
      });
  }

  // 비밀번호
  const MIN_PASSWORD_LENGTH = 10;

  const handlerChangePassword = (e) => {
    if(setIsValidNickname === false) {
      setMessageDuplicate('');
    }
    const pwLength = e.target.value;
    setUserPw(pwLength);

    if (pwLength.length < MIN_PASSWORD_LENGTH) {
      setPwMessage('비밀번호는 최소 10자 이상이어야 합니다.');
      setIsPwCheck(false);
    } else {
      setPwMessage('');
      setIsPwCheck(true);
    }
  };
 
  // 비밀번호 체크
  const handlerCheckPassword = useCallback((e) => {
    const pwCheckCurrent = e.target.value;
    setUserPwCheck(pwCheckCurrent);

    if (userPw === pwCheckCurrent) {
      setPwMessage("");
      setIsPwCheck(true);
      console.log("일치");
    } else {
      setPwMessage('비밀번호가 일치하지 않습니다.');
      setIsPwCheck(false);
      console.log("불일치");
    }

  }, [userPw]);

  // 비밀번호 보여주기 여부
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  // 회원가입 
  const handlerClickLogin = (e) => {
    e.preventDefault();

    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/register`,
        { userEmail, userNickname, userPw, registerCode })
        .then(res => {
          alert('정상적으로 가입 되었습니다. 로그인 페이지로 이동합니다. ')
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

  const isRegistDisabled = () => {
    return (
      isEmail &&
      isValidNickname &&
      isPwCheck &&
      userEmail.trim() !== '' &&
      userNickname.trim() !== '' &&
      userPw.trim() !== '' &&
      userPwCheck.trim() !== ''
    );
  };

  return (
    <>
      <div className={Style.login_container}>
        <div className={Style.registerTitle}>
            <Title titleName={titleProperties.titleName} />
        </div>

        <div className={Style.login_box}>
          {/* <div className={Style.login_input}> */}
            <div className={Style.regist_input}>
              <Input 
                inputType="text"
                inputValue={userEmail}
                inputHandler= {handlerChangeEmail}
                inputPlaceholder="이메일"
              />
              <Input 
                inputType="text"
                inputValue={registerCode}
                inputHandler= {handlerChangeCode}
                inputPlaceholder="인증코드"
              />
              <button onClick={duplicateEmail}>중복확인</button>
              <button onClick={validateEmail}>이메일 검증</button>
              <label className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</label>
              <label className={`message ${isValidEmail ? 'success' : 'error'}`}>{messageEmailDuplicate}</label> 
            </div>

            <div className={Style.regist_input}>
              <div className={Style.nickname_input}>
                <div className={Style.nickname}>
                  <Input 
                    inputType="text"
                    inputValue={userNickname}
                    inputHandler= {handlerChangeNickname}
                    inputPlaceholder="닉네임"
                  />
                </div>
                <button onClick={duplicateNickname}>중복확인</button>
              </div>
              <label>{messageDuplicate}</label>
            </div>
            

            <div className={Style.regist_input}>
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
            </div>
            <div className={Style.regist_input}>
              <Input
                    inputType={hidePassword ? "password" : "text"}
                    inputValue={userPwCheck}
                    inputHandler= {handlerCheckPassword}
                    inputPlaceholder="비밀번호 확인" 
                  />
                <label className={`message ${isPwCheck ? 'success' : 'error'}`}>{pwMessage}</label> 
            </div>
            <div className={Style.login_submit}>
              <DoBtn doText="회원가입" doOnClick={handlerClickLogin} doDisabled={!isRegistDisabled()}/>
            </div>
          </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default RegistPage;