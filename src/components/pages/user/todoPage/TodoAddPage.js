import { useEffect, useState } from "react";
import Style from "./TodoAddPage.module.css";
import Input from "../../../UI/atoms/Input";
import DoBtn from "../../../UI/atoms/btn/DoBtn";
import TimePicker from "../../../UI/atoms/TimePicker";
import SelectToggleRound from "../../../UI/atoms/toggle/SelectToggleRound";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { MdRepeat, MdControlPoint } from 'react-icons/md';
import { BiCalendarEvent, BiAlarm } from 'react-icons/bi';



const TodoAddPage = () => {
  const [addTodo, setAddTodo] = useState("");

  const dateList = ['오늘', '1일 후', '2일 후', '3일 후', '4일 후', '5일 후', '6일 후', '7일 후'];
  const repeatList = ['매일', '매일 일', '매일 월', '매일 화', '매일 수', '매일 목', '매일 금', '매일 토'];
  const pointList = ['100P', '200P', '300P', '400P', '500P'];
  // 토글 라운드
  const [selectedDate, setSelectedDate] = useState(dateList[0]);
  const [selectedRepeat, setSelectedRepeat] = useState(repeatList[0]);
  const [selectedPoint, setSelectedPoint] = useState(pointList[0]);
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [selectedHour, setSelectedHour] = useState('01');
  const [selectedMinute, setSelectedMinute] = useState('00');

  // 투두 텍스트 입력
  const handlerChangeTodo = (e) => {
    setAddTodo(e.target.value);
  };

  // 알림 설정
  const updateTime = (value, type) => {
    if (type === 'period') {
      setSelectedPeriod(value);
    } else if (type === 'hour') {
      setSelectedHour(value);
    } else if (type === 'minute') {
      setSelectedMinute(value);
    }
  };

  const alarmstr = `( ${selectedHour || ''} : ${selectedMinute || ''} ${selectedPeriod || ''} )`;

  // 날짜선택
  const [calculatedDate, setCalculatedDate] = useState(new Date());

  const handlerDateChange = (e) => {
    const selectedIndex = dateList.indexOf(e);
    const newCalculatedDate = getNextDate(selectedIndex);

    setSelectedDate(e);
    setCalculatedDate(newCalculatedDate);
  };

  const getNextDate = (days) => {
    const today = new Date();
    const nextDate = new Date(today);

    nextDate.setDate(today.getDate() + days);

    return nextDate;
  };
  
  // 오늘
  const today = new Date();
  const options = { month: "long", day: "numeric" };

  // 반복설정
  const handlerRepeatChange = (e) => {
    const setRepeat = e; // 클릭된 버튼의 내용을 저장

    if (repeatList.slice(1, 8).includes(setRepeat)) {
      // 2-8번 중복 선택 관리
      if (selectedRepeat.includes(setRepeat)) {
        // 선택 해제
        if (selectedRepeat.length > 1) {
          setSelectedRepeat(selectedRepeat.filter((item) => item !== setRepeat));
        }
      } else {
        // 선택
        setSelectedRepeat(
          selectedRepeat.length === 1 && selectedRepeat[0] === '매일' 
          ? 
          [setRepeat] 
          : 
          [...selectedRepeat, setRepeat]
        );
      }
    } else {
      setSelectedRepeat([setRepeat]);
    }  
  };

  // 포인트 설정
  const handlerPointChange = (e) => {
    setSelectedPoint(e);
  };

  // 투두 등록버튼
  const handlerClickAdd = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const decode_token = jwt_decode(token);
      const userIdx = decode_token.sub;
  
      const alarm = updateTime(selectedPeriod, 'period') +
        updateTime(selectedHour, 'hour') +
        updateTime(selectedMinute, 'minute');
  
      const todoData = {
        userIdx: userIdx,
        // ...
      };
  
      const response = await axios.post(
        `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/todo`,
        todoData,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
  
      console.log(response);
      window.location.replace('/todolist');
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <div className={Style.container}>
        <div className={Style.addbox}>
          <div className={Style.addInput}>
            <Input
              inputType="text"
              inputValue={addTodo}
              inputHandler= {handlerChangeTodo}
              inputPlaceholder="TODO를 입력하세요."
            />
          </div>

          <div className={Style.select_box}>
            <p><BiAlarm /> 알림 <span>{alarmstr}</span> </p>
            <div className={Style.select_alarm}>
              <TimePicker 
                onPeriod={(value) => updateTime(value, 'period')}
                onHour={(value) => updateTime(value, 'hour')}
                onMinute={(value) => updateTime(value, 'minute')}
              />
            </div>

            <div className={Style.select_toggle}>
              <p><BiCalendarEvent />
                <span>
                  {today.toLocaleDateString("ko-KR", options)}
                  {selectedDate === '오늘' ? '' : '~' + calculatedDate.toLocaleDateString('ko-KR', options)}
                </span>
              </p>
              <div className={Style.select_toggle_box}>
              <SelectToggleRound
                toggleList={dateList}
                toggleActive={selectedDate}
                onToggle={handlerDateChange}
              />
              </div>
            </div>
          
            <div className={Style.select_toggle}>
              <p><MdRepeat /> 반복</p>
              <SelectToggleRound
                toggleList={repeatList}
                toggleActive={selectedRepeat}
                onToggle={handlerRepeatChange}
              />
            </div>

            <div className={Style.select_toggle}>
              <p><MdControlPoint /> 포인트</p>
              <SelectToggleRound
                toggleList={pointList}
                toggleActive={selectedPoint}
                onToggle={handlerPointChange}
              />
            </div>
          </div>

          <div className={Style.DoBtn}>
            <DoBtn doText="등록하기" doOnClick={handlerClickAdd} />
          </div>
        </div>
      </div>

      

    </>
  )
}
export default TodoAddPage;