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
  const [selectedRepeat, setSelectedRepeat] = useState(['매일']);
  const [selectedPoint, setSelectedPoint] = useState('100P')

  const dateList = ['오늘', '1일 후', '2일 후', '3일 후', '4일 후', '5일 후', '6일 후', '7일 후'];
  const repeatList = ['매일', '매일 일', '매일 월', '매일 화', '매일 수', '매일 목', '매일 금', '매일 토'];
  const pointList = ['100P', '200P', '300P', '400P', '500P'];

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

  const handlerDateChange = (e) => {
    setSelectedDate(e);
  };

  const handlerPointChange = (e) => {
    setSelectedPoint(e);
  };

  // 투두 텍스트 입력
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
            <div className={Style.select_alarm}>
              <TimePicker />
            </div>

            <div className={Style.select_toggle}>
              <p>날짜 선택</p>
              <div className={Style.select_toggle_box}>
              <SelectToggleRound
                toggleList={dateList}
                toggleActive={selectedDate}
                onToggle={handlerDateChange}
              />
              </div>
            </div>
          
            <div className={Style.select_toggle}>
              <p>반복</p>
              <SelectToggleRound
                toggleList={repeatList}
                toggleActive={selectedRepeat}
                onToggle={handlerRepeatChange}
              />
            </div>

            <div className={Style.select_toggle}>
              <p>포인트</p>
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