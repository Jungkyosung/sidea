import Style from "./TodolistPage.module.css";
import Input from "../../../UI/atoms/Input";
import Title from "../../../UI/atoms/Title";
import TodoContent from "../../../UI/atoms/TodoContent";
import NaviControll from "../../../naviControll/NaviControll";
import Calendar from "./Calendar";
import TodoAddPage from "./TodoAddPage";
import { useState } from "react";
import { useNavigate } from "react-router";

const TodolistPage = ({}) => {
  const [isInputFocuse, setInputFocuse] = useState(false);

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
  const todoContents = [
    {
      id: 1,
      todoFinishCheck: false,
      todoTitle: "TodoContentTitle",
      todoHasAlarm: false
    },
    {
      id: 2,
      todoFinishCheck: false,
      todoTitle: "TodoContentTitle",
      todoHasAlarm: true
    },
    {
      id: 3,
      todoFinishCheck: false,
      todoTitle: "TodoContentTitle",
      todoHasAlarm: false
    },
    {
      id: 4,
      todoFinishCheck: false,
      todoTitle: "TodoContentTitle",
      todoHasAlarm: false
    },
    {
      id: 5,
      todoFinishCheck: false,
      todoTitle: "TodoContentTitle",
      todoHasAlarm: false
    },
    {
      id: 6,
      todoFinishCheck: false,
      todoTitle: "TodoContentTitle",
      todoHasAlarm: false
    },
    {
      id: 7,
      todoFinishCheck: true,
      todoTitle: "TodoContentTitle",
      todoHasAlarm: false
    },
    {
      id: 8,
      todoFinishCheck: true,
      todoTitle: "TodoContentTitle",
      todoHasAlarm: false
    }
  ];

  // const handlerGoWriteTodo = () => {
  //   console.log("Gowrite")
  // };

  // const handlerGoReport = () => {
  //   console.log("GoReport")
  // };

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
                <span>today’s list</span>
                <span onClick={()=>handlerMove(locations.report)}>report</span>
              </div>

              <div className={Style.todoContent_box}>
                {todoContents.map(todo => (
                  <TodoContent
                    key={todo.id}
                    todoFinishCheck={todo.todoFinishCheck}
                    todoTitle={todo.todoTitle}
                    todoHasAlarm={todo.todoHasAlarm}
                  />
                ))}
              </div>
            </div> 
            <div className={Style.todo_input}>
              { isInputFocuse 
                ? 
                (
                  <div className={Style.todoAdd_page}>
                    <TodoAddPage />
                  </div>
                ) 
                : 
                (
                  <div onClick={()=>setInputFocuse(true)}>
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
      </NaviControll>
    </>
  )
}
export default TodolistPage;