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
  const [isInputFocuse, setInputFocuse] = useState(false);

  // 목록 조회
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    let userId = decode_token.sub;

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/todo`,
      { params: { userId: encodeURI(userId) },
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}, []);

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


  return (
    <>
      <NaviControll>
        <div className={Style.container}>
          <div className={Style.header}>
            <Title titleName={titleProperties.titleName} />
            <div className={Style.calendar}>
              <Calendar />
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
                    todoTitle={todo.todoTitle}
                    todoHasAlarm={todo.todoHasAlarm}
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