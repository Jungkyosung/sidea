import React, { useState } from 'react';
import Input from '../../UI/atoms/Input';
import DoBtn from '../../UI/atoms/btn/DoBtn';
import EditBtn from '../../UI/atoms/btn/EditBtn';
import MainQuickBtn from '../../UI/atoms/btn/MainQuickBtn';
import MainQuickContainer from '../../UI/atoms/btn/MainQuickContainer';
import RadioBtn from '../../UI/atoms/btn/RadioBtn';
import SelectToggleRound from '../../UI/atoms/toggle/SelectToggleRound';


const MainPage = ({history}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [ toggleActive, setToggleActive ] = useState(0);

  const handlerChangeEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handlerChangePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handlerClickAdd = () => {
    console.log("등록")
  }

  const handlerUpdate = () => {
    // 수정 동작 처리
    console.log('수정');
  };

  const handlerDelete = () => {
    // 삭제 동작 처리
    console.log('삭제');
  };

  const inputs = [
    {
      id: 1,
      type: "text",
      value: userEmail, 
      handler: handlerChangeEmail,
      placeholder: '이메일을 입력하세요'
    },
    {
      id: 2,
      type: "password", 
      value: userPassword, 
      handler: handlerChangePassword, 
      placeholder: '비밀번호를 입력하세요'
    }
  ];

  const toggleList = [ '오늘', '주간', '월간'];
  const toggleReport = () => {
    const result = [];

    for (let i = 0; i < toggleList.length; i++) {
      result.push (
        <>
          <SelectToggleRound toggleId={i} toggleClickRound={toggleSelectBtn} toggleTitle={toggleList[i]}/>
        </>
      ) 
    } return result;
  }

  const toggleSelectBtn = () => {
    console.log('출력')
  }

  return (
    <>
      <p>MainPage</p>

      <hr />
      <p>input</p>
      {inputs.map(input => (
        <Input
          key={input.id}
          inputType={input.type}
          inputValue={input.value}
          inputHandler={input.handler}
          inputPlaceholder={input.placeholder}
        />
      ))}
      <Input />

      <hr />
      <p>doBtn</p>
      <DoBtn doText="등록하기" doOnClick={handlerClickAdd}  />

      <hr />
      <EditBtn onUpdate={handlerUpdate} onDelete={handlerDelete} />

      <hr />
      {/* <MainQuickBtn /> */}
      <MainQuickContainer />

      <hr /> 
      {/* map 함수 돌리는 걸로 수정하는게 좋을 것 같음 */}
      <RadioBtn 
        radioId="radio1"
        radioName="radio"
        radioValue="1"
        radioTitle="전체" />
      <RadioBtn 
        radioId="radio2"
        radioName="radio"
        radioValue="2"
        radioTitle="미답변" />
        <RadioBtn 
        radioId="radio3"
        radioName="radio"
        radioValue="3"
        radioTitle="답변완료" />

      <hr />
      {toggleReport()}
    </>
  );
}

export default MainPage;