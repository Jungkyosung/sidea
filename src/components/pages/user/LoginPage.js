import { useState } from "react";
import Input from "../../UI/atoms/Input";

//엔트리템
const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handlerChangeEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handlerChangePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const [hidePassword, setHidePassword] = useState(true);
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <>
      <p>LoginPage</p>
      <Input 
        inputType="text"
        inputValue={userEmail}
        inputHandler= {handlerChangeEmail}
        inputPlaceholder="이메일을 입력하세요"/>

      <Input
        inputTypetype={hidePassword ? "password" : "text"}
        inputValuevalue={userPassword}
        inputHandler= {handlerChangePassword}
        inputPlaceholder="비밀번호를 입력하세요" />
        
      <div>
        {hidePassword ? (
          <div onClick={toggleHidePassword} >show</div>
        ):(
          <div onClick={toggleHidePassword}>hide</div>
        )}
      </div>
    </>
  );
}
export default LoginPage;