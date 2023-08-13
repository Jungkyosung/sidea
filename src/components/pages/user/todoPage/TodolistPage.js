import Style from "./TodolistPage.module.css";
import Input from "../../../UI/atoms/Input";
import Title from "../../../UI/atoms/Title";
import TodoContent from "../../../UI/atoms/TodoContent";
import NaviControll from "../../../naviControll/NaviControll";
import Calendar from "./Calendar";

const TodolistPage = ({}) => {
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

  const handlerGoWriteTodo = () => {
    console.log("Gowrite")
  };

  const handlerGoReport = () => {
    console.log("GoReport")
  };

  return (
    <>
      <NaviControll>
        <div className={Style.container}>
          <Title titleName={titleProperties.titleName} />
          <div className={Style.listbox}>
            <div className={Style.top}>
              <div className={Style.calendar}><Calendar /></div>
              <div className={Style.content}>
                  <div className={Style.header}>
                    <span>today’s list</span>
                    <span onClick={handlerGoReport}>report</span>
                  </div>

                  <div className={Style.todoContent_box}>
                  <div>
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
              </div>
          </div>

          <div className={Style.todo_input}>
              <Input
                inputType="text"
                inputValue=""
                inputHandler={handlerGoWriteTodo}
                inputPlaceholder="투두를 입력하세요"
              />
            </div>
          </div>
        </div>
      </NaviControll>
    </>
  )
}
export default TodolistPage;