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
import { FaSleigh } from "react-icons/fa";
import { colors } from "@mui/material";



const TodoAddPage = (props) => {
  const [addTodo, setAddTodo] = useState("");

  const dateList = ['오늘', '1일 후', '2일 후', '3일 후', '4일 후', '5일 후', '6일 후', '7일 후'];
  const repeatList = ['매일', '매일 일', '매일 월', '매일 화', '매일 수', '매일 목', '매일 금', '매일 토'];
  const pointList = ['100P', '200P', '300P', '400P', '500P'];
  // 토글 라운드
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedRepeat, setSelectedRepeat] = useState([1]);
  const [selectedPoint, setSelectedPoint] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [selectedHour, setSelectedHour] = useState('01');
  const [selectedMinute, setSelectedMinute] = useState('00');
  // const options = { month: "long", day: "numeric" };
  
  // 투두 텍스트 입력
  const handlerChangeTodo = (e) => {
    setAddTodo(e.target.value);
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

  // 날짜 토글 스위치
  const [isToday, setIsToday] = useState(true);
  const [todaySwitch, setTodaySwitch] = useState(false);
  const [isTodayDisabled, setIsTodayDisabled] = useState(false);
  // 반복 토글 스위치 
  const [isRepeat, setIsRepeat] = useState(true);
  const [repeatSwitch, setRepeatSwitch] = useState(false);
  const [isRepeatDisabled, setIsRepeatDisabled] = useState(false);

  const handleTodayClick = () => {
    setIsToday(prevIsToday => {
      if (!prevIsToday) {
        setSelectedDate([]);
      }
      if (!prevIsToday) {
        setSelectedDate(0);
      }
      return !prevIsToday;
    });
    setTodaySwitch(!todaySwitch);
  };

  const handleRepeatClick = () => {
    setIsRepeat(prevIsRepeat => {
      if(!prevIsRepeat) {
        setSelectedRepeat([]);
      }
      if(!prevIsRepeat) {
        setSelectedRepeat([1]);
      }
      return !prevIsRepeat;
    });
    setRepeatSwitch(!repeatSwitch);
  };

  useEffect(() => {
    setIsRepeat(prevIsRepeat => {
      const newIsRepeat = selectedDate !== 0 ? true : false;
      setRepeatSwitch(newIsRepeat);
      setIsRepeatDisabled(newIsRepeat);
      return !newIsRepeat;
    });
  }, [selectedDate, selectedRepeat]);

  useEffect(() => {
    setIsToday(prevIsToday => {
      const newIsToday = selectedRepeat == 0 ? false : true;
      setTodaySwitch(!newIsToday);
      setIsTodayDisabled(!newIsToday);
      return newIsToday;
    });
  }, [selectedDate, selectedRepeat]);

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
  // 오늘 날짜 형식
  const formatToday = (date) => {
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);  

    return `${ month }월 ${ day }일`
  };

  // 오늘
  const day = props.selectedDate;
  const end = selectedDate + props.selectedDate; 
  const date = new Date();
  const selectedToday = new Date(date.getFullYear(), date.getMonth(), day); 
  const selectedEndDay = new Date(date.getFullYear(), date.getMonth(), end);
  const today = formatToday(selectedToday);
  const endDay = formatToday(selectedEndDay);


  const handlerDateChange = (e) => {
    setSelectedDate(e);
  };

  const handlerRepeatChange = (index) => {
    // 0번과1~7번중에 하나는 무조건 선택
    if (selectedRepeat.length === 1 && selectedRepeat.includes(index)) {
      return;
    }
  
    if (index === 0) {
      setSelectedRepeat([0]);
    } else if (selectedRepeat.includes(index)) {
      // 이미 선택된 경우 선택해제 
      setSelectedRepeat((prevSelected) =>
        prevSelected.filter(item => item !== index)
      );
    } else if (selectedRepeat.length === 6) {
      // 중복선택 7번째에는 자동 0번째
      setSelectedRepeat([0]);
    } else {
      setSelectedRepeat((prevSelected) =>
        prevSelected.includes(0)
          ? [index]                   // 0번 선택된 경우 0번 제외한 선택 추가
          : [...prevSelected, index]  // 그외 선택 추가
      );
    }
  };
 
  const todo = {
    todoMon: isRepeat !== true ? 0 : (selectedRepeat.includes(0) ? 1 : (selectedRepeat.includes(2) ? 1 : 0)),
    todoTue: isRepeat !== true ? 0 : (selectedRepeat.includes(0) ? 1 : (selectedRepeat.includes(3) ? 1 : 0)),
    todoWed: isRepeat !== true ? 0 : (selectedRepeat.includes(0) ? 1 : (selectedRepeat.includes(4) ? 1 : 0)),
    todoThu: isRepeat !== true ? 0 : (selectedRepeat.includes(0) ? 1 : (selectedRepeat.includes(5) ? 1 : 0)),
    todoFri: isRepeat !== true ? 0 : (selectedRepeat.includes(0) ? 1 : (selectedRepeat.includes(6) ? 1 : 0)),
    todoSat: isRepeat !== true ? 0 : (selectedRepeat.includes(0) ? 1 : (selectedRepeat.includes(7) ? 1 : 0)),
    todoSun: isRepeat !== true ? 0 : (selectedRepeat.includes(0) ? 1 : (selectedRepeat.includes(1) ? 1 : 0)),
  };

  // 포인트 설정
  const handlerPointChange = (e) => {
    setSelectedPoint(e);
  };

  const selectedPointStr = pointList[selectedPoint];

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
    // const period = selectedPeriod === 'AM' ? 0 : 12;
    let hours = parseInt(selectedHour);
    const minutes = selectedMinute;
    const seconds = '00';

    if (isEnabled) {
      if (selectedPeriod === 'AM' && hours === 12) {
        hours = 0; 
      } else if (selectedPeriod === 'PM' && hours !== 12) {
        hours += 12; 
      }
      const formatHours = hours.toString().padStart(2, '0');
      return `${year}-${month}-${day} ${formatHours}:${minutes}:${seconds}`;
    } else {
      return `${year}-${month}-${day}`;
    }
  };


  // 투두 등록버튼
  const handlerClickAdd = (e) => {
    if (addTodo.trim() === "") {
      alert("투두 내용을 입력하세요.");
      return; 
    }
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    const userIdx = decode_token.userIdx;

    const todoData = {
      userIdx: userIdx,
      todoContents: addTodo,
      todoStartDate: formatDate(selectedToday),
      todoEndDate: isRepeat === true ? (isToday === true ? formatDate(selectedEndDay) : '') : formatDate(selectedEndDay),
      todoAlarm: alarm,
      todoAlarmTime: formatDateAlarm(selectedToday),
      todoPoint: selectedPointStr.replace('P', ''),
      todoMon: todo.todoMon, 
      todoTue: todo.todoTue, 
      todoWed: todo.todoWed,
      todoThu: todo.todoThu,
      todoFri: todo.todoFri,
      todoSat: todo.todoSat,
      todoSun: todo.todoSun 
    };
    console.log(todoData)
    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/todo`,
      todoData,
      { headers: { 'Authorization': `Bearer ${token}` } }
    )
      .then(res => {
        console.log(res);
        console.log(todoData);

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
              selectedPeriod={selectedPeriod}
              selectedHour={selectedHour}
              selectedMinute={selectedMinute}
              setSelectedPeriod={setSelectedPeriod}
              setSelectedHour={setSelectedHour}
              setSelectedMinute={setSelectedMinute}
              onPeriod={(value) => updateTime(value, 'period')}
              onHour={(value) => updateTime(value, 'hour')}
              onMinute={(value) => updateTime(value, 'minute')}
              toggleOff={toggleOff}
            />
            
            </div>

            <div className={Style.select_toggle}>
              <p>
                <span>
                  <BiCalendarEvent />
                  <span>
                    {today}
                    { isToday === false ? '' : (selectedDate === 0 ? '' : '~' + endDay)}
                  </span>
                </span>
                <ToggleSwitch
                  switchChecked={isToday}
                  handleSwitchClick={handleTodayClick}
                  disabled={isTodayDisabled}
                />
              </p>
              <div className={Style.select_toggle_box}>
              <SelectToggleRound
                toggleList={dateList}
                toggleActive={selectedDate}
                onToggle={handlerDateChange}
                toggleSwitch={todaySwitch}
              />
              </div>
            </div>
          
            <div className={Style.select_toggle}>
              <p>
                <span> <MdRepeat /> 반복 </span>
                <ToggleSwitch
                  switchChecked={isRepeat}
                  handleSwitchClick={handleRepeatClick}
                  disabled={isRepeatDisabled}
                />
              </p>
              <SelectToggleRound
                toggleList={repeatList}
                toggleActive={selectedRepeat}
                onToggle={handlerRepeatChange}
                toggleSwitch={repeatSwitch}
              />
            </div>

            <div className={Style.select_toggle}>
              <p><span><MdControlPoint /> 포인트</span></p>
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