import React, { useState } from 'react';
import Input from '../../UI/atoms/Input';
import DoBtn from '../../UI/atoms/btn/DoBtn';
import EditBtn from '../../UI/atoms/btn/EditBtn';
import MainQuickContainer from '../../UI/atoms/btn/MainQuickContainer';
import RadioBtn from '../../UI/atoms/btn/RadioBtn';
import SelectToggleRound from '../../UI/atoms/toggle/SelectToggleRound';
import SelectToggleRect from '../../UI/atoms/toggle/SelectToggleRect';


const MainPage = ({ history }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handlerChangeEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handlerChangePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handlerClickAdd = () => {
    // 등록 동작 처리
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

  // 인풋
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

  // 라디오 
  const [selectedRadio, setSelectedRadio] = useState('전체');

  const radioList = ['전체', '미답변', '답변완료'];

  const onRadiofilter = (e) => {
    setSelectedRadio(e);
  }

  // 토글 라운드
  const [selectedList, setSelectedList] = useState('오늘');
  const [selectedPoint, setSelectedPoint] = useState('100')

  const reportlist = ['오늘', '주간', '월간', '연간'];
  const setPointList = ['100', '200', '300', '400', '500'];

  const handlerToggleChange = (e) => {
    setSelectedList(e);
  };

  const handlerPointChange = (e) => {
    setSelectedPoint(e);
  };

  // 토글 네모
  const [selectedChargePoint, setSelectedChargePoint] = useState('500');

  const chargePointList = ['500', '1000', '3000', '5000'];

  const handlerCharPointChange = (e) => {
    setSelectedChargePoint(e);
  };

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
      <p>Edit(delete + update)</p>
      <EditBtn onUpdate={handlerUpdate} onDelete={handlerDelete} />

      <hr />
      <p>mainQuick</p>
      <MainQuickContainer />

      <hr /> 
      <p>radio</p>
      <RadioBtn 
        radioList={radioList}
        selectRadio={selectedRadio}
        onRadioChange={onRadiofilter}
      />

      <p>Selected option: {selectedRadio}</p>
      
      <hr />
      <p>toggleRound</p>
      <div> 
        <SelectToggleRound
          toggleList={reportlist}
          toggleActive={selectedList}
          onToggle={handlerToggleChange}
        />

        <SelectToggleRound
          toggleList={setPointList}
          toggleActive={selectedPoint}
          onToggle={handlerPointChange}
        />

        <p>Selected option: {selectedList}</p>
        <p>Selected option: {selectedPoint}</p>
      </div>

      <hr />
      <p>toggleRound</p>
      <div> 
        <SelectToggleRect
          toggleListRect={chargePointList}
          toggleActiveRect={selectedChargePoint}
          onToggleRect={handlerCharPointChange}
        />

        <p>Selected option: {selectedChargePoint}</p>
      </div>
    </>
  );
}

export default MainPage;