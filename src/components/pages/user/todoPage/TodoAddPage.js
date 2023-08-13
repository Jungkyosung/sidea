import { useState } from "react";
import Input from "../../../UI/atoms/Input";
import DoBtn from "../../../UI/atoms/btn/DoBtn";
import TimePicker from "../../../UI/atoms/TimePicker";

const TodoAddPage = () => {
  const [addTodo, setAddTodo] = useState("");

  const handlerChangeTodo = () => {};

  return (
    <>
      <div>
        <div>
          <Input
            inputType="text"
            inputValue={addTodo}
            inputHandler= {handlerChangeTodo}
            inputPlaceholder="TODO를 입력하세요."
          />
        </div>

        <div>
          <TimePicker />
        </div>

        <div>
          날짜 선택
        </div>
        
        <div>
          반복설정
        </div>

        <div>
          포인트 설정
        </div>
      </div>

      <div>
        <DoBtn />
      </div>

    </>
  )
}
export default TodoAddPage;