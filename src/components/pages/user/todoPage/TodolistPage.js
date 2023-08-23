import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MdOutlineClose } from 'react-icons/md';
import { BiSolidBarChartSquare } from 'react-icons/bi';
import axios from "axios";
import jwt_decode from "jwt-decode";

import Style from "./TodolistPage.module.css";
import Input from "../../../UI/atoms/Input";
import Title from "../../../UI/atoms/Title";
import TodoContent from "../../../UI/atoms/TodoContent";
import NaviControll from "../../../naviControll/NaviControll";
import Calendar from "./Calendar";
import TodoAddPage from "./TodoAddPage";

const TodolistPage = () => {
  const [data, setData] = useState([]);
  const [todoIdx, setTodoIdx] = useState('');
  const [todoDate, setTodoDate] = useState('');
  const [isInputFocuse, setInputFocuse] = useState(false);

  // const now = new Date();
  // const [today] = useState(now.getDate());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const initDayOfWeek = new Date().getDay(); // 오늘 요일 초기 설정
  const [selectedWeek, setSelectedWeek] = useState(initDayOfWeek === 0 ? 7 : initDayOfWeek); 
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];

  // 날짜를 SQL 날짜 형식으로 변환하는 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);  
    return `${year}-${month}-${day}`;
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (date) => {

    console.log(date);
    setSelectedDate(date);
    const selectedDayOfWeek = new Date(new Date().getFullYear(), new Date().getMonth(), date).getDay();
    setSelectedWeek(selectedDayOfWeek === 0 ? 7 : selectedDayOfWeek);
  };

  // 페이지 로딩시 및 날짜 선택 변경시 데이터 로드
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    const userIdx = decode_token.userIdx;
    
    const params = { userIdx: userIdx, todoDate: formatDate(new Date(2023,7,selectedDate)), date: selectedWeek };
    
    console.log(params);

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/todo`, 
    {
      params,
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` },
    })
    .then(res => {
      setData(res.data);
      console.log(res.data);
      if (Array.isArray(res.data)) {
        const todoDates = res.data.map(item => item.todoDate);
        const todoIdxes = res.data.map(item => item.todoDate);
        setTodoDate(todoDates);
        setTodoIdx(todoIdxes);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }, [selectedDate, selectedWeek]);

  const navigate = useNavigate();
  const locations = {
    report: "/todo/report",
    todoAdd: "/todo/add"
  };

  // 페이지 이동 핸들러
  function handlerMove(location){
    navigate(location);
  }

  const titleProperties = {
    titleName: "TODO"
  }

  // 할일 삭제 핸들러
  const handlerDelete = (todoIdx) => {
    const todoIdxData = { todoIdx: todoIdx }; // 데이터 객체 생성
    console.log(todoIdx);
  
    axios.delete(
      `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/todo`,
      {
        data: todoIdxData,
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      }
    )
      .then((res) => {
        if (res.data === '삭제') {
          console.log("정상적으로 삭제되었습니다.");
          navigate(`/`);
        } else {
          console.log("삭제에 실패했습니다.");
          return;
        }
      })
      .catch((err) => {
        console.error('에러 상세 정보:', err);
    
        if (err.response) {
          console.error('서버 응답 오류:', err.response.data);
        } else if (err.request) {
          console.error('요청 전송 실패:', err.request);
        } else {
          console.error('오류:', err.message);
        }
      });
    };

  const renderTodoContent = () => {
    return data.map(todo => {
      const [todoYear, todoMonth, todoDay] = todo.todoDate.split('-');
      const initTodoDate = new Date(parseInt(todoYear), parseInt(todoMonth) - 1, parseInt(todoDay));
  
      // if (initTodoDate !== null) {
        return (
          <TodoContent
            key={todo.todoIdx}
            todoFinishCheck={todo.todoFinishCheck}
            todoTitle={todo.todoContents}
            todoHasAlarm={todo.todoHasAlarm}
            todoDelete={() => handlerDelete(todo.todoIdx)} 
          />
        );
      // } else {
      //   return null;
      // }
    });
  };

  return (
    <>
      <NaviControll>
        <div className={Style.container}>
          <div className={Style.header}>
            <Title titleName={titleProperties.titleName} />
            <div className={Style.calendar}>
              <Calendar
                handleDateClick={handleDateClick}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                daysOfWeek={daysOfWeek}
              />
            </div>
          </div>
  
          <div className={Style.list_box}>
            <div className={Style.todolist}>
              <div className={Style.subTitle}>
                <h2>today’s list</h2>
                <div className={Style.goReport} onClick={() => handlerMove(locations.report)}>
                  <BiSolidBarChartSquare />
                  <span>리포트</span>
                </div>
              </div>
  
              <div className={Style.todoContent_box}>
                {renderTodoContent()}
                {data.filter(todo => {
                  const [todoYear, todoMonth, todoDay] = todo.todoDate.split('-');
                  const initTodoDate = new Date(parseInt(todoYear), parseInt(todoMonth) - 1, parseInt(todoDay));
                  return initTodoDate.getDate() !== selectedDate;
                }).length === data.length && (
                  <div>
                    <p>일정이 없습니다</p>
                  </div>
                )}
              </div>  
            </div>
  
            <div>
              <div className={Style.todo_input}>
                {isInputFocuse ? (
                  <div className={Style.todoAdd_page}>
                    <MdOutlineClose className={Style.close} onClick={() => setInputFocuse(false)} />
                    <TodoAddPage />
                  </div>
                ) : (
                  <div className={Style.todoInput_box} onClick={() => setInputFocuse(true)}>
                    <Input
                      inputType="text"
                      inputValue=""
                      inputHandler={() => handlerMove(locations.todoAdd)}
                      inputPlaceholder="투두를 입력하세요"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </NaviControll>
    </>
  );
};

export default TodolistPage;