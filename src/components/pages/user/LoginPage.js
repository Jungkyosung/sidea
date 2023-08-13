import { useState } from "react";
import Style from './Login.module.css'
import Input from "../../UI/atoms/Input";
import Title from "../../UI/atoms/Title";
import DoBtn from "../../UI/atoms/btn/DoBtn";

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const titleProperties = {
    titleName: "LOGIN"
  }

  const handlerChangeEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handlerChangePassword = (e) => {
    setUserPassword(e.target.value);
  };

  
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handlerClickLogin = () => {
    // 등록 동작 처리
    console.log("로그인")
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
            inputPlaceholder="이메일을 입력하세요"
            />

            <div className={Style.password_input}>
              <Input
                inputType={hidePassword ? "password" : "text"}
                inputValue={userPassword}
                inputHandler= {handlerChangePassword}
                inputPlaceholder="비밀번호를 입력하세요" 
              />
              
              <div className={Style.password_hide}>
                {hidePassword ? (
                  <div onClick={toggleHidePassword} >show</div>
                ):(
                  <div onClick={toggleHidePassword}>hide</div>
                )}
              </div>
            </div>

            <div className={Style.login_submit}>
              <DoBtn doText="로그인" doOnClick={handlerClickLogin}/>
              <p className={Style.signUp_text}>회원가입</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;