import Style from './AdminQnaReplyPage.module.css';
import DoBtn from "../../UI/atoms/btn/DoBtn";
import NaviControll from "../../naviControll/NaviControll";
import Title from '../../UI/atoms/Title';
import EditBtn from '../../UI/atoms/btn/EditBtn';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AdminQnaReplyPage = (props) => {

  const [isAnswered, setIsAnswered] = useState(false);
  const [askAnswer, setAskAnswer] = useState('');
  const replyDate = new Date();
  const { askIdx } = props;
  const { askAnswerContent } = props;
  const { askAnswerDate } = props;
  const [editAskAnswer, setEditAskAnswer] = useState('');
  // const [editReplyDate, setEditReplyDate] = useState(new Date(askAnswerDate));

  console.log(askAnswerDate)
  useEffect(() => {
    if(askAnswerContent == null) {
      setIsAnswered(false)
    } else {
      setIsAnswered(true)
      setEditAskAnswer(askAnswerContent)
    }
  },[askAnswerContent])
  

  const handlerAnswer = (e) => {
    setAskAnswer(e.target.value);
  };

  const handlerEditAnswer = (e) => {
    setEditAskAnswer(e.target.value);
  };


  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);  
    return `${ year }-${ month }-${ day }`;
  };

  

  // 등록
  const handlerAskAnswer = () => {
    const token = sessionStorage.getItem('token');
    const answer = {
      askIdx: askIdx,
      askAnswer : askAnswer,
      askAnswerDate : replyDate
    };

    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/qna`,
      answer, { headers: { 'Authorization': `Bearer ${token}` } }
    )
      .then(res => {
      console.log(res);
      console.log(answer);
      alert('답변을 등록했습니다');
      window.location.replace(`/admin/qna/${askIdx}`);
    })
    .catch(err => {
      if (err.response) {
        // 요청은 성공했지만 서버에서 오류 응답을 보낸 경우
        console.error('서버 응답 오류:', err.response.data);
      } else if (err.request) {
        // 요청이 전송되지 않은 경우 (네트워크 문제 등)
        console.error('요청 전송 실패:', err.request);
      } else {
        // 기타 오류
        console.error('오류:', err.message);
      }
    });
  }

  // 수정
  const handlerEditAskAnswer = () => {
    const token = sessionStorage.getItem('token');
    const answer = {
      askIdx: askIdx,
      askAnswer : editAskAnswer,
      askAnswerDate : replyDate
    };

    axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/qna`,
      answer, { headers: { 'Authorization': `Bearer ${token}` } }
    )
      .then(res => {
      console.log(res);
      console.log(answer);
      alert('답변을 수정했습니다');
      window.location.replace(`/admin/qna/${askIdx}`);
    })
    .catch(err => {
      if (err.response) {
        // 요청은 성공했지만 서버에서 오류 응답을 보낸 경우
        console.error('서버 응답 오류:', err.response.data);
      } else if (err.request) {
        // 요청이 전송되지 않은 경우 (네트워크 문제 등)
        console.error('요청 전송 실패:', err.request);
      } else {
        // 기타 오류
        console.error('오류:', err.message);
      }
    });
  }

  return (
    <NaviControll>
      <div className={Style.QnaWriteBox}>
        {isAnswered ?
          (<>
            <textarea className={Style.QnaWriteCont} 
              placeholder='문의 답변을 입력해주세요'
              value={editAskAnswer}
              onChange={handlerEditAnswer}>
            </textarea>
            <div className={Style.QnaAdminBtn}>
              <DoBtn doText={"답변수정"} doOnClick={handlerEditAskAnswer}/>
            </div>
          </> ) 
          :
          (
            <>
              <textarea className={Style.QnaWriteCont} 
                placeholder='문의 답변을 입력해주세요'
                value={askAnswer}
                onChange={handlerAnswer}>
              </textarea>
              <div className={Style.QnaAdminBtn}>
                <DoBtn doText={"답변등록"} doOnClick={handlerAskAnswer}/>
              </div>
            </>
          )
        }
      </div>
    </NaviControll>
  )
}
export default AdminQnaReplyPage;