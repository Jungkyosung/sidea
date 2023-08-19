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
  
  const handlerClickLogin = () => {
    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/login`,
      { userEmail,  userPw })
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("token", response.data);
        navigate("/");
    })
    .catch((error) => {
        console.log(error);
    });
    console.log("버튼누름");
  }
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
              <DoBtn doText="로그인" doOnClick={handlerClickLogin}/>
              <p className={Style.signUp_text} onClick={handlerRegist}>회원가입</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;