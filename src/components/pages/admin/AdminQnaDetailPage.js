import Style from './AdminQnaDetailPage.module.css';
import Title from "../../UI/atoms/Title";
import NaviControll from "../../naviControll/NaviControll";
import DoBtn from '../../UI/atoms/btn/DoBtn';
import EditBtn from '../../UI/atoms/btn/EditBtn';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminQnaDetailPage = () => {

  const [isAnswered, setIsAnswered] = useState(false);

  const navigate = useNavigate();

  function handlerNavi(id){
    navigate('/admin/qna/reply/' + id);
  }

  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <Title titleName={"문의 내용"} />
        <div className={Style.QnaUser}>문의자닉네임</div>
        {isAnswered ?
          <>
            <div className={Style.QnaContentBox}>
              <div className={Style.QnaContentWithAnswer}>문의 내용</div>
              <div className={Style.QnaDate}>2023-08-02</div>
            </div>
            <div className={Style.QnaContentAnswerBox}>
              <div className={Style.QnaContentAnswer}>답변 내용</div>
              <div className={Style.QnaDate}>2023-08-02</div>
            </div>
            <EditBtn onUpdate={()=>handlerNavi(1)}/>
          </>
          :
          <>
            <div className={Style.QnaContentBox}>
              <div className={Style.QnaContent}>문의 내용</div>
              <div className={Style.QnaDate}>2023-08-02</div>
            </div>
            <DoBtn doText={"답변하기"} doOnClick={()=>handlerNavi(1)}/>
          </>
        }
      </div>
    </NaviControll>
  )
}
export default AdminQnaDetailPage;