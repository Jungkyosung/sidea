import { useState } from "react";
import Style from './Login.module.css';
import Input from "../../UI/atoms/Input";
import Title from "../../UI/atoms/Title";
import DoBtn from "../../UI/atoms/btn/DoBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiShowAlt, BiHide } from 'react-icons/bi';

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPw, setUserPw] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate();
  
  const handlerClickLogin = (e) => {
    e.preventDefault();
    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/login`,
      { userEmail,  userPw })
      .then((res) => {
        if(res.data) {
          sessionStorage.setItem("token", res.data);
          alert( `로그인에 성공했습니다. 메인페이지로 이동합니다.`);
          navigate("/");
        } else {
          alert( `ID, PW가 일치하지 않습니다. 확인 후 다시 시도해주세요.`);
          sessionStorage.clear();
        }
    })
    .catch((error) => {
      alert( `ID, PW가 일치하지 않습니다. 확인 후 다시 시도해주세요.`);
      sessionStorage.clear();
      console.log(error);
    });
    console.log("버튼누름");
  };
  
  const handlerRegist = () => {
    navigate("/regist");
  };

  const titleProperties = {
    titleName: "LOGIN"
  }

  const handlerChangeEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handlerChangePassword = (e) => {
    setUserPw(e.target.value);
  };

  
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };


  const isloginDisabled = () => {
    return (
      userEmail &&
      userPw
    );
  };

  

  return (
    <>
      <div className={Style.login_container}>
        <div className={Style.registerTitle}>
            <Title titleName={titleProperties.titleName} />
        </div>

        <form className={Style.login_box} onSubmit={handlerClickLogin}>
          <div className={Style.login_input}>
            <Input 
            inputType="text"
            inputValue={userEmail}
            inputHandler= {handlerChangeEmail}
            inputPlaceholder="이메일을 입력하세요"
            />

            <div className={Style.password_input}>
              <Input
                inputType={hidePassword ? "password" : "text"}
                inputValue={userPw}
                inputHandler= {handlerChangePassword}
                inputPlaceholder="비밀번호를 입력하세요" 
              />
              
              <div className={Style.password_hide}>
                {hidePassword ? (
                    <BiShowAlt onClick={toggleHidePassword} ></BiShowAlt>
                  ):(
                    <BiHide onClick={toggleHidePassword}></BiHide>
                  )}
              </div>
            </div>

            <div className={Style.login_submit}>
              <DoBtn doText="로그인" doOnClick={handlerClickLogin} doDisabled={!isloginDisabled()}/>
              <p className={Style.signUp_text} onClick={handlerRegist}>회원가입</p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;