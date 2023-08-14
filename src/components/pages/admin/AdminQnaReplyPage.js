import Style from './AdminQnaReplyPage.module.css';
import DoBtn from "../../UI/atoms/btn/DoBtn";
import NaviControll from "../../naviControll/NaviControll";
import Title from '../../UI/atoms/Title';
import EditBtn from '../../UI/atoms/btn/EditBtn';
import { useState } from 'react';

const AdminQnaReplyPage = () => {

  const [isAnswered, setIsAnswered] = useState(false);


  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <Title titleName={"문의 내용"} />
        <div className={Style.QnaUser}>문의자닉네임</div>
        <div className={Style.QnaContentBox}>
          <div className={Style.QnaContent}>문의 내용</div>
          <div className={Style.QnaDate}>2023-08-02</div>
        </div>
      </div>
      <div className={Style.QnaWriteBox}>
        <textarea className={Style.QnaWriteCont} placeholder='문의 답변을 입력해주세요'>
        </textarea>
        <div className={Style.QnaAdminBtn}>
          {isAnswered ?
            <DoBtn doText={"답변수정"} /> :
            <DoBtn doText={"답변등록"} />
          }
        </div>
      </div>
    </NaviControll>
  )
}
export default AdminQnaReplyPage;