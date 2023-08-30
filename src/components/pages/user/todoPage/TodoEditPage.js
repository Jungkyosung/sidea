import { useEffect, useState } from "react";
import Style from "./TodoAddPage.module.css";
import Input from "../../../UI/atoms/Input";
import DoBtn from "../../../UI/atoms/btn/DoBtn";
import TimePicker from "../../../UI/atoms/TimePicker";
import SelectToggleRound from "../../../UI/atoms/toggle/SelectToggleRound";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { MdRepeat, MdControlPoint } from "react-icons/md";
import { BiCalendarEvent, BiAlarm } from "react-icons/bi";
import ToggleSwitch from "../../../UI/atoms/toggle/ToggleSwitch";
// import { PiEyeglassesLight } from "react-icons/pi";

const TodoEditPage = (props) => {
  const dateList = [
    "오늘",
    "1일 후",
    "2일 후",
    "3일 후",
    "4일 후",
    "5일 후",
    "6일 후",
    "7일 후",
  ];
  const repeatList = [
    "매일",
    "매일 일",
    "매일 월",
    "매일 화",
    "매일 수",
    "매일 목",
    "매일 금",
    "매일 토",
  ];
  const pointList = ["100P", "200P", "300P", "400P", "500P"];

  const [addTodo, setAddTodo] = useState("");
  // 토글 라운드
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRepeat, setSelectedRepeat] = useState("");
  const [selectedPoint, setSelectedPoint] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");

  // 투두 텍스트 입력
  const handlerChangeTodo = (e) => {
    setAddTodo(e.target.value);
  };

  // 타임 토글 스위치
  const [isEnabled, setIsEnabled] = useState(true);
  const [toggleOff, setToggleOff] = useState(false);

  const handleSwitchClick = () => {
    if (isEnabled == true) {
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
  const [isToday, setIsToday] = useState("");
  const [todaySwitch, setTodaySwitch] = useState("");
  const [isTodayDisabled, setIsTodayDisabled] = useState("");
  // 반복 토글 스위치
  const [isRepeat, setIsRepeat] = useState("");
  const [repeatSwitch, setRepeatSwitch] = useState("");
  const [isRepeatDisabled, setIsRepeatDisabled] = useState("");

  // 날짜 형태를 sql 날짜 형태로 변경
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  // 오늘 날짜 형식
  const formatToday = (date) => {
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${month}월 ${day}일`;
  };

  // 알람 있을때 or 없을때 날짜 저장
  const formatDateAlarm = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const period = selectedPeriod === "AM" ? 0 : 12;
    const hours = parseInt(selectedHour);
    const minutes = selectedMinute;
    const seconds = "00";

    if (isEnabled) {
      const formatHours = (period + hours).toString().padStart(2, "0");
      return `${year}-${month}-${day} ${formatHours}:${minutes}:${seconds}`;
    } else {
      return `${year}-${month}-${day}`;
    }
  };

  const { todoData } = props;

  console.log(todoData);

  const todoAlarm = todoData.todoAlarm;
  const todoAlarmTime = todoData.todoAlarmTime;
  const todoContents = todoData.todoContents;
  const todoEndDate = todoData.todoEndDate;
  const todoStartDate = todoData.todoStartDate;
  const todoFri = todoData.todoFri;
  const todoMon = todoData.todoMon;
  const todoSat = todoData.todoSat;
  const todoSun = todoData.todoSun;
  const todoThu = todoData.todoThu;
  const todoTue = todoData.todoTue;
  const todoWed = todoData.todoWed;
  const todoPoint = pointList.findIndex(
    (point) => point === `${todoData.todoPoint}P`
  );

  const setTimezone = (timeString) => {
    const dateTime = new Date(timeString);
    const period = dateTime.getHours() >= 12 ? "PM" : "AM";
    const hour = String(
      dateTime.getHours() % 12 === 0 ? 12 : dateTime.getHours() % 12
    ).padStart(2, "0");
    const minute = String(dateTime.getMinutes()).padStart(2, "0");

    return { period, hour, minute };
  };

  const { period, hour, minute } = setTimezone(todoAlarmTime);

  const allDayRepeat =
    todoMon === 1 && todoTue === 1 && todoWed === 1 && todoThu === 1 && todoFri === 1 && todoSat === 1 && todoSun === 1;
  const isrepeatSwitch =
    todoMon === 0 && todoTue === 0 && todoWed === 0 && todoThu === 0 && todoFri === 0 && todoSat === 0 && todoSun === 0
    ? true : false;

  const todoRepeatdata = allDayRepeat
    ? [0]
    : [
        todoMon === 1 ? 2 : "",
        todoTue === 1 ? 3 : "",
        todoWed === 1 ? 4 : "",
        todoThu === 1 ? 5 : "",
        todoFri === 1 ? 6 : "",
        todoSat === 1 ? 7 : "",
        todoSun === 1 ? 1 : "",
      ];

  const timeDiff = new Date(todoEndDate) - new Date(todoStartDate);
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

  let index = 0;
  if (daysDiff > 0) {
    index = Math.min(Math.floor(daysDiff), 7);
  }

  let notEndDate = true;
  if (todoEndDate === null) {
    notEndDate = false;
    index = "";
  }

  useEffect(() => {
    setAddTodo(todoContents);
    setSelectedDate(index);
    setSelectedRepeat(todoRepeatdata);
    setSelectedPeriod(period);
    setSelectedHour(hour);
    setSelectedMinute(minute);
    setSelectedPoint(todoPoint);

    setIsToday(notEndDate);
    setTodaySwitch(!notEndDate);
    setIsTodayDisabled(!notEndDate);
    setIsRepeat(!isrepeatSwitch);
    setRepeatSwitch(isrepeatSwitch);
    setIsRepeatDisabled(isrepeatSwitch);

    setIsEnabled(todoAlarm === 1);
  }, []);

  const handleTodayClick = () => {
    setIsToday((prevIsToday) => {
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
    setIsRepeat((prevIsRepeat) => {
      if (!prevIsRepeat) {
        setSelectedRepeat([]);
      }
      if (!prevIsRepeat) {
        setSelectedRepeat([1]);
      }
      return !prevIsRepeat;
    });
    setRepeatSwitch(!repeatSwitch);
  };

  useEffect(() => {
    if (!isrepeatSwitch) {
      setIsRepeat((prevIsRepeat) => {
        const newIsRepeat = selectedDate !== 0 ? false : true;
        setRepeatSwitch(newIsRepeat);
        setIsRepeatDisabled(newIsRepeat);
        return !newIsRepeat;
      });
    }
  }, [isrepeatSwitch]);

  useEffect(() => {
    if (!notEndDate)
      setIsToday((prevIsToday) => {
        const newIsToday = selectedRepeat == 0 ? false : true;
        setTodaySwitch(!newIsToday);
        setIsTodayDisabled(!newIsToday);
        return newIsToday;
      });
  }, [notEndDate]);

  // 알림 설정
  const updateTime = (value, type) => {
    if (type === "period") {
      setSelectedPeriod(value);
    } else if (type === "hour") {
      setSelectedHour(value);
    } else if (type === "minute") {
      setSelectedMinute(value);
    }
  };

  const alarmstr = `( ${selectedHour} : ${selectedMinute} ${selectedPeriod} )`;

  // 오늘
  const day = todoStartDate.split('-')[2];
  const end = selectedDate + parseInt(day); 
  const selectedToday = new Date(todoStartDate);
  const selectedEndDay = new Date(2023, 7, end);

  const today = formatToday(selectedToday);
  const endDay = formatToday(selectedEndDay);

  const handlerDateChange = (e) => {
    let saveSelectedDate = selectedDate;

    setSelectedDate(e);

    const eventEnd = e + parseInt(day); 
    const eventEndDay = new Date(2023, 7, eventEnd);
    const serverToday = new Date();
    serverToday.setHours(0, 0, 0, 0);

    if (eventEndDay < serverToday) {
      alert("과거 날짜로 선택할 수 없습니다");
      setSelectedDate(saveSelectedDate);
    }
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
    console.log(e);
  };

  const selectedPointStr = pointList[selectedPoint];

  // 투두 등록버튼
  const handlerClickEdit = (e) => {
    if (addTodo.trim() === "") {
      alert("투두 내용을 입력하세요.");
      return; // 함수 실행 중단
    }
    const token = sessionStorage.getItem('token');
    // const decode_token = jwt_decode(token);
    // const userIdx = decode_token.userIdx;

    const todoEditData = {
      todoIdx: todoData.todoIdx,
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

    console.log(todoEditData);
    axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/todo`,
      todoEditData,
      { headers: { 'Authorization': `Bearer ${token}` } }
    )
      .then(res => {
      console.log(res);
      console.log(todoData);
      alert('투두가 수정됐습니다');
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
              inputHandler={handlerChangeTodo}
              inputPlaceholder="TODO를 입력하세요."
            />
          </div>

          <div className={Style.select_box}>
            <p>
              <span>
                <BiAlarm /> 알림 <span>{alarmstr}</span>
              </span>
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
                onPeriod={(value) => updateTime(value, "period")}
                onHour={(value) => updateTime(value, "hour")}
                onMinute={(value) => updateTime(value, "minute")}
                toggleOff={toggleOff}
              />
            </div>

            <div className={Style.select_toggle}>
              <p>
                <BiCalendarEvent />
                <span>
                  {today}
                  {isToday === false
                    ? ""
                    : selectedDate === 0
                    ? ""
                    : "~" + endDay}
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
                <MdRepeat /> 반복
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
              <p>
                <MdControlPoint /> 포인트
              </p>
              <SelectToggleRound
                toggleList={pointList}
                toggleActive={selectedPoint}
                onToggle={handlerPointChange}
              />
            </div>
          </div>

          <div className={Style.DoBtn}>
            <DoBtn
              doText="수정하기"
              doOnClick={handlerClickEdit}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default TodoEditPage;
