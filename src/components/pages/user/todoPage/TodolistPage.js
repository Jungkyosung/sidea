import Style from "./TodolistPage.module.css";
import Input from "../../../UI/atoms/Input";
import Title from "../../../UI/atoms/Title";
import TodoContent from "../../../UI/atoms/TodoContent";
import NaviControll from "../../../naviControll/NaviControll";
import Calendar from "./Calendar";
import TodoAddPage from "./TodoAddPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MdOutlineClose } from 'react-icons/md';
import { BiSolidBarChartSquare } from 'react-icons/bi';
import axios from "axios";
import jwt_decode from "jwt-decode";

const TodolistPage = ({}) => {
  const [data, setData] = useState([]);
  const [todoDate, setTodoDate] = useState('');
  const [isInputFocuse, setInputFocuse] = useState(false);

  const now = new Date();
  const [today] = useState(now.getDate());
  const [selectedDate, setSelectedDate] = useState(today);


  const handleDateClick = (date) => {
    setSelectedDate(date);
  };


  // 날짜 형태를 sql 날짜 형태로 변경
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);  
    return `${ year }-${ month }-${ day }`;
  };

  // 목록 조회 (userIdx, todoDate)
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    let userIdx = decode_token.userIdx;
    console.log(decode_token);
    const params = { userIdx : userIdx, todoDate : formatDate(now)}
    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/todo`,
      {params}, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => {
            console.log(res);
            setData(res.data);
            setTodoDate(res.data.todoDate);
        })
        .catch(err => {
            console.log(err);
        })
}, []);

  // 날짜 선택시 목록 조회 (userIdx, todoDate)
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    let userIdx = decode_token.userIdx;
    console.log(decode_token);
    const params = { userIdx : userIdx, todoDate : formatDate(now)}
    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/todo`,
      {params}, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => {
            console.log(res);
            setData(res.data);
            setTodoDate(res.data.todoDate);
        })
        .catch(err => {
            console.log(err);
        })
}, [selectedDate]);

  const navigate = useNavigate();

  const locations = {
    report : "/todo/report",
    todoAdd : "/todo/add"
  };

  function handlerMove(location){
    navigate(location);
  };

  const titleProperties = {
    titleName: "TODO"
  }

  // todo
  // const todoContents = [
  //   {
  //     id: 1,
  //     todoFinishCheck: false,
  //     todoTitle: "TodoContentTitle",
  //     todoHasAlarm: false
  //   },
  //   {
  //     id: 2,
  //     todoFinishCheck: false,
  //     todoTitle: "TodoContentTitle",
  //     todoHasAlarm: true
  //   },
  //   {
  //     id: 3,
  //     todoFinishCheck: false,
  //     todoTitle: "TodoContentTitle",
  //     todoHasAlarm: false
  //   },
  //   {
  //     id: 4,
  //     todoFinishCheck: false,
  //     todoTitle: "TodoContentTitle",
  //     todoHasAlarm: false
  //   },
  //   {
  //     id: 5,
  //     todoFinishCheck: false,
  //     todoTitle: "TodoContentTitle",
  //     todoHasAlarm: false
  //   },
  //   {
  //     id: 6,
  //     todoFinishCheck: false,
  //     todoTitle: "TodoContentTitle",
  //     todoHasAlarm: false
  //   },
  //   {
  //     id: 7,
  //     todoFinishCheck: true,
  //     todoTitle: "TodoContentTitle",
  //     todoHasAlarm: false
  //   },
  //   {
  //     id: 8,
  //     todoFinishCheck: true,
  //     todoTitle: "TodoContentTitle",
  //     todoHasAlarm: false
  //   }
  // ];

  const handlerDelete = () => {
    axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/todo`)
    .then((res) => {
        if (res.data === 1) {
            alert(`정상적으로 삭제되었습니다.`);
            navigate(`/`);
        } else {
            alert(`삭제에 실패했습니다.`);
            return;
        }
    })
    .catch((error) => {
        console.log(error);
        alert(`삭제에 실패했습니다.`);
        return;
    })
  };

  return (
    <>
      <NaviControll>
        <div className={Style.container}>
          <div className={Style.header}>
            <Title titleName={titleProperties.titleName} />
            <div className={Style.calendar}>
              <Calendar handleDateClick={handleDateClick} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            </div>
          </div>

          <div className={Style.list_box}>
            <div className={Style.todolist}>
              <div className={Style.subTitle}>
                <h2>today’s list</h2>
                <div className={Style.goReport}onClick={()=>handlerMove(locations.report)}>
                  <BiSolidBarChartSquare  />
                  <span>리포트</span>
                </div>
              </div>

              <div className={Style.todoContent_box}>
                {data.map(todo => (
                  <TodoContent
                    key={todo.id}
                    todoFinishCheck={todo.todoFinishCheck}
                    todoTitle={todo.todoContents}
                    todoHasAlarm={todo.todoHasAlarm}
                    todoDelete={handlerDelete}
                  />
                ))}
              </div>
            </div> 
            <div>
            <div className={Style.todo_input}>
              { isInputFocuse 
                ? 
                (
                  <div className={Style.todoAdd_page}>
                    <MdOutlineClose className={Style.close} onClick={()=>setInputFocuse(false)} />
                    <TodoAddPage />
                  </div>
                ) 
                : 
                (
                  <div className={Style.todoInput_box} onClick={()=>setInputFocuse(true)}>
                    <Input
                      inputType="text"
                      inputValue=""
                      inputHandler={()=>handlerMove(locations.todoAdd)}
                      inputPlaceholder="투두를 입력하세요"
                    />
                  </div>
                )
             }
            </div>
            </div>
          </div>
        </div>
      </NaviControll>
    </>
  )
}
export default TodolistPage;