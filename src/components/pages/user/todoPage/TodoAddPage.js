import { useState } from "react";
import Style from "./TodoAddPage.module.css";
import Input from "../../../UI/atoms/Input";
import DoBtn from "../../../UI/atoms/btn/DoBtn";
import TimePicker from "../../../UI/atoms/TimePicker";
import SelectToggleRound from "../../../UI/atoms/toggle/SelectToggleRound";

const TodoAddPage = () => {
  const [addTodo, setAddTodo] = useState("");

  

  // 토글 라운드
  const [selectedDate, setSelectedDate] = useState('오늘');
  const [selectedRepeat, setSelectedRepeat] = useState('매일');
  const [selectedPoint, setSelectedPoint] = useState('100P')

  const dateList = ['오늘', '1일 후', '2일 후', '3일 후', '4일 후', '5일 후', '6일 후', '7일 후'];
  const repeatList = ['매일', '매일 일', '매일 월', '매일 화', '매일 수', '매일 목', '매일 금', '매일 토'];
  const pointList = ['100P', '200P', '300P', '400P', '500P'];

  const handlerDateChange = (e) => {
    setSelectedDate(e);
  };

  const handlerRepeatChange = (e) => {
    setSelectedRepeat(e);
  };

  const handlerPointChange = (e) => {
    setSelectedPoint(e);
  };

  // 
  const handlerChangeTodo = (e) => {
    setAddTodo(e.target.value);
  };

  const handlerClickAdd = () => {
    // 등록 동작 처리
    console.log("등록")
  }


  return (
    <>
      <div className={Style.container}>
        <div>
          <Input
            inputType="text"
            inputValue={addTodo}
            inputHandler= {handlerChangeTodo}
            inputPlaceholder="TODO를 입력하세요."
          />
        </div>

        <div className={Style.select_box}>
          <div>
            <TimePicker />
          </div>

          <div>
            <p>날짜 선택</p>
            <SelectToggleRound
              toggleList={dateList}
              toggleActive={selectedDate}
              onToggle={handlerDateChange}
            />
          </div>
          
          <div>
            <p>반복</p>
            <SelectToggleRound
              toggleList={repeatList}
              toggleActive={selectedRepeat}
              onToggle={handlerRepeatChange}
            />
          </div>

          <div>
            <p>포인트</p>
            <SelectToggleRound
              toggleList={pointList}
              toggleActive={selectedPoint}
              onToggle={handlerPointChange}
            />
          </div>
        </div>

        <div>
          <DoBtn doText="등록하기" doOnClick={handlerClickAdd} />
        </div>
      </div>

      

    </>
  )
}
export default TodoAddPage;