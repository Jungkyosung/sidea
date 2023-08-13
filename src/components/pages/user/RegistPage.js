import { useState } from "react";
import Style from './Login.module.css'
import Input from "../../UI/atoms/Input";
import Title from "../../UI/atoms/Title";
import DoBtn from "../../UI/atoms/btn/DoBtn";

const RegistPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const titleProperties = {
    titleName: "SING UP"
  }

  const handlerChangeEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handlerChangePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handlerCheckPassword = (e) => {
    setUserPassword(e.target.value);
  };

  
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handlerClickLogin = () => {
    // 등록 동작 처리
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

            <Input 
              inputType="text"
              inputValue={userEmail}
              inputHandler= {handlerChangeEmail}
              inputPlaceholder="닉네임"
            />

            <div className={Style.password_input}>
              <Input
                inputType={hidePassword ? "password" : "text"}
                inputValue={userPassword}
                inputHandler= {handlerChangePassword}
                inputPlaceholder="비밀번호" 
              />
              
              <div className={Style.password_hide}>
                {hidePassword ? (
                  <div onClick={toggleHidePassword} >show</div>
                ):(
                  <div onClick={toggleHidePassword}>hide</div>
                )}
              </div>

              
            </div>
            <Input
                inputType={hidePassword ? "password" : "text"}
                inputValue={userPassword}
                inputHandler= {handlerCheckPassword}
                inputPlaceholder="비밀번호 확인" 
              />

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