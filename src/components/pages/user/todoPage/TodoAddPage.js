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
import ToggleSwitch from "../../../UI/atoms/toggle/ToggleSwitch";
import { PiEyeglassesLight } from "react-icons/pi";



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
    console.log(addTodo);
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
   
  const alarmstr = `( ${selectedHour} : ${selectedMinute} ${selectedPeriod} )`;

  // 날짜선택
  const [calculatedDate, setCalculatedDate] = useState(new Date());

  const handlerDateChange = (e) => {
    const selectedIndex = dateList.indexOf(e);
    const newCalculatedDate = getNextDate(selectedIndex);

    setSelectedDate(e);
    setCalculatedDate(newCalculatedDate);

    // 오늘이 아닐때 반복 설정 해제 
    if (selectedIndex !== 0) {
      setSelectedRepeat([]);
    } else {
      setSelectedRepeat([repeatList[0]]);
    }
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

    if (selectedDate !== '오늘') {
      setSelectedRepeat([]);
    } else if (repeatList.slice(1, 8).includes(setRepeat)) {
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

  const todo = {
    todoMon: selectedRepeat.includes('매일') ? 1 : (selectedRepeat.includes('매일 월') ? 1 : 0),
    todoTue: selectedRepeat.includes('매일') ? 1 : (selectedRepeat.includes('매일 화') ? 1 : 0),
    todoWed: selectedRepeat.includes('매일') ? 1 : (selectedRepeat.includes('매일 수') ? 1 : 0),
    todoThu: selectedRepeat.includes('매일') ? 1 : (selectedRepeat.includes('매일 목') ? 1 : 0),
    todoFri: selectedRepeat.includes('매일') ? 1 : (selectedRepeat.includes('매일 금') ? 1 : 0),
    todoSat: selectedRepeat.includes('매일') ? 1 : (selectedRepeat.includes('매일 토') ? 1 : 0),
    todoSun: selectedRepeat.includes('매일') ? 1 : (selectedRepeat.includes('매일 일') ? 1 : 0),
  };

  // 포인트 설정
  const handlerPointChange = (e) => {
    setSelectedPoint(e);
  };

  // 날짜 형태를 sql 날짜 형태로 변경
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);  
    return `${ year }-${ month }-${ day }`;
  };

  // 알람 있을때 or 없을때 날짜 저장 
  const formatDateAlarm = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);  
    const period = selectedPeriod === 'AM' ? 0 : 12; 
    const hours = parseInt(selectedHour);
    const minutes = selectedMinute;
    const seconds = '00';

    if (isEnabled) {
      const formatHours = (period + hours).toString().padStart(2, '0');
      return `${year}-${month}-${day} ${formatHours}:${minutes}:${seconds}`;
    } else {
      return `${year}-${month}-${day}`;
    };
  };

  // 타임 토글 스위치
  const [isEnabled, setIsEnabled] = useState(true);
  const [toggleOff, setToggleOff] = useState(false);

  const handleSwitchClick = () => {
    if (isEnabled == true ) {
      setIsEnabled(false);
      setToggleOff(true);
    } else {
      setIsEnabled(true);
      setToggleOff(false);
    }
  };

  // 알람 값 저장
  const alarm = isEnabled ? 1 : 0;

  // 반복 토글 스위치 
  const [isRepeat, setIsRepeat] = useState(true);
  const [repeatSwitch, setRepeatSwitch] = useState(false);

  const handleRepeatClick = () => {
   if (isRepeat === true) {
        setIsRepeat(false);
        setRepeatSwitch(true);
        setSelectedRepeat([0]);
      } else {
        setIsRepeat(true);
        setRepeatSwitch(false);
        setSelectedRepeat('매일');
      }
  };
  // 날짜에 따른 토글 스위치 
  useEffect(() => {
    if (selectedDate !== '오늘') {
      setIsRepeat(false);
      setRepeatSwitch(true);
    } else {
      setIsRepeat(true);
      setRepeatSwitch(false);
    }
  }, [selectedDate]);
  
  // 투두 등록버튼
  const handlerClickAdd = (e) => {
    if (addTodo.trim() === "") {
      alert("투두 내용을 입력하세요.");
      return; // 함수 실행 중단
    }
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    const userIdx = decode_token.userIdx;

    const todoData = {
      userIdx: userIdx,
      todoContents: addTodo,
      todoDate: formatDateAlarm(today),
      todoStartDate: formatDate(today),
      todoEndDate: formatDate(calculatedDate),
      todoAlarm: alarm,
      todoPoint: selectedPoint.replace('P', ''),
      todoMon: todo.todoMon, 
      todoTue: todo.todoTue, 
      todoWed: todo.todoWed,
      todoThu: todo.todoThu,
      todoFri: todo.todoFri,
      todoSat: todo.todoSat,
      todoSun: todo.todoSun 
    };
    console.log(todoData.todoDate);
    console.log(todoData);
    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/todo`,
      todoData,
      { headers: { 'Authorization': `Bearer ${token}` } }
    )
      .then(res => {
      console.log(res);
      alert('투두가 생겼습니다');
      window.location.replace('/todolist');
    })
    .catch(err => {
      if (err.response) {
        // 요청은 성공했지만 서버에서 오류 응답을 보낸 경우
        console.error('서버 응답 오류:', err.response.data);
      } else if (err.request) {
        // 요청이 전송되지 않은 경우 (네트워크 문제 등)
        console.error('요청 전송 실패:', err.request);
      } else {
        // 기타 오류
        console.error('오류:', err.message);
      }
    });
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
            <p>
              <span><BiAlarm /> 알림 <span>{alarmstr}</span></span>
              <span>
                <ToggleSwitch
                  switchChecked={isEnabled}
                  handleSwitchClick={handleSwitchClick}
                />
              </span>
            </p>
            <div className={Style.select_alarm}>
             <TimePicker 
                onPeriod={(value) => updateTime(value, 'period')}
                onHour={(value) => updateTime(value, 'hour')}
                onMinute={(value) => updateTime(value, 'minute')}
                toggleOff={toggleOff}
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
              <p><MdRepeat /> 반복
              <ToggleSwitch
                switchChecked={isRepeat}
                handleSwitchClick={handleRepeatClick}
              />
              </p>
              <SelectToggleRound
                toggleList={repeatList}
                toggleActive={selectedRepeat}
                onToggle={handlerRepeatChange}
                repeatSwitch = {repeatSwitch}
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