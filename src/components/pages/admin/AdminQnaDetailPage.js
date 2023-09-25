import Style from './AdminQnaDetailPage.module.css';
import Title from "../../UI/atoms/Title";
import NaviControll from "../../naviControll/NaviControll";
import DoBtn from '../../UI/atoms/btn/DoBtn';
import EditBtn from '../../UI/atoms/btn/EditBtn';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import AdminQnaReplyPage from './AdminQnaReplyPage';
import CloseBtn from '../../UI/atoms/btn/CloseBtn';


const AdminQnaDetailPage = () => {

  const [isAnswered, setIsAnswered] = useState(false);
  const [data, setData] = useState([]);
  const [nickname, setNickname] = useState('');
  const [isClick, setIsClick] = useState(false);

  const [askidx, setAskidx] = useState(null);
  const [replycontent, setReplyContent] = useState('');
  const [replyDate, setReplyDate] = useState('');

  const { qnaidx } = useParams();
  const navigate = useNavigate();

  function handlerNavi(id, data){
    navigate(`/admin/qna/reply/${id}`, { state: {data}});
  }
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    const params = { askIdx : qnaidx }

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/qna/detail`,
      { params, headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }}
    )
        .then(res => {
          console.log(res.data);
          setData(res.data); 
          setNickname(decode_token.nickname)

          if (res.data.askAnswer == null) {
            setIsAnswered(false)
          } else {
            setIsAnswered(true)
          }
        })
        .catch(err => {
            console.log(err);
        })
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);  
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${ year }-${ month }-${ day } ${hours}:${minutes}:${seconds}`;
  };

  // const askIdx = data.AskIdx;
  const askAnswer = data.askAnswer;
  const askContents = data.askContents;
  const askTitle = data.askTitle;
  const askAnswerDateStr = data.askAnswerDate;
  const askDateStr = data.askDate;
  const newAskAnswerDate = new Date(askAnswerDateStr);
  const newAskDate = new Date(askDateStr);
  const askAnswerDate = formatDate(newAskAnswerDate);
  const askDate = formatDate(newAskDate);
  
  const handlerReplyData = () => {
    setAskidx(data.askIdx);
    setIsClick(true); 
  }

  const handlerEditReplyData = () => {
    setAskidx(data.askIdx);
    setReplyContent(askAnswer);
    setReplyDate(askAnswerDate);
    setIsClick(true); 
  }
  
  const handlerDelete = () => {
    const askIdx = data.askIdx;
    const params = { askIdx : askIdx };
    console.log(params)
    axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/qna`,
      { data: params, headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }}
    )
      .then((res) => {
        if (res.data === '삭제') {
          console.log(res.data)
          console.log("정상적으로 삭제되었습니다.");
          alert("정상적으로 삭제되었습니다")
          window.location.replace('/admin/qnalist');
        } else {
          console.log("삭제에 실패했습니다.");
          return;
        }
      })
      .catch((err) => {
        console.error('에러 상세 정보:', err);
    
        if (err.response) {
          console.error('서버 응답 오류:', err.response.data);
        } else if (err.request) {
          console.error('요청 전송 실패:', err.request);
        } else {
          console.error('오류:', err.message);
        }
      });
  };

  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <Title titleName={askTitle} />
        <div className={Style.QnaUser}>문의자: {nickname}</div>
        {isAnswered ?
          (<>
            <div className={Style.QnaContentBox}>
              <div className={Style.QnaContentWithAnswer}>{askContents}</div>
              <div className={Style.QnaDate}>{askDate}</div>
            </div>
            <div className={Style.QnaContentAnswerBox}>
              <div className={Style.QnaContentAnswer}>{askAnswer}</div>
              <div className={Style.QnaDate}>{askAnswerDate}</div>
            </div>
            <div className={Style.btn_box}>
              {isClick ? 
              ( <>
                  <div className={Style.close}><CloseBtn onClick={() => setIsClick(false)}/></div>
                  <AdminQnaReplyPage askIdx={askidx} askAnswerContent={replycontent} askAnswerDate={replyDate}/>
                </>
              )
              :
              ( <EditBtn deleteTxt={'삭제'} updateTxt={'수정'} onDelete={handlerDelete} onUpdate={handlerEditReplyData}/> )
              }
            </div>
          </>)
          :
          (<>
            <div className={Style.QnaContentBox}>
              <div className={Style.QnaContent}>{askContents}</div>
              <div className={Style.QnaDate}>{askDate}</div>
            </div>
            <div className={Style.btn_box}>
              {isClick ? 
              ( <>
                <div className={Style.close}><CloseBtn onClick={() => setIsClick(false)}/></div>
                <AdminQnaReplyPage askIdx={askidx}/>
              </> ) 
              : 
              ( <DoBtn doText={"답변하기"} doOnClick={handlerReplyData}/> )
              }
            </div>
          </>)
        }
      </div>
    </NaviControll>
  )
}
export default AdminQnaDetailPage;