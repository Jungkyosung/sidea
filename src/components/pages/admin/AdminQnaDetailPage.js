import Style from './AdminQnaDetailPage.module.css';
import Title from "../../UI/atoms/Title";
import NaviControll from "../../naviControll/NaviControll";
import DoBtn from '../../UI/atoms/btn/DoBtn';
import EditBtn from '../../UI/atoms/btn/EditBtn';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";


const AdminQnaDetailPage = () => {

  const [isAnswered, setIsAnswered] = useState(false);
  const [data, setData] = useState([]);
  const [nickname, setNickname] = useState('');

  const { qnaidx } = useParams();


  const navigate = useNavigate();

  function handlerNavi(id){
    navigate(`/admin/qna/reply/${id}`);
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
    return `${ year }-${ month }-${ day }`;
  };

  const askAnswer = data.askAnswer;
  const askContents = data.askContents;
  const askTitle = data.askTitle;
  const askAnswerDateStr = data.askAnswerDate;
  const askDateStr = data.askDate;
  const newAskAnswerDate = new Date(askAnswerDateStr);
  const newAskDate = new Date(askDateStr);
  const askAnswerDate = formatDate(newAskAnswerDate);
  const askDate = formatDate(newAskDate);
  
  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <Title titleName={askTitle} />
        <div className={Style.QnaUser}>문의자: {nickname}</div>
        {isAnswered ?
          <>
            <div className={Style.QnaContentBox}>
              <div className={Style.QnaContentWithAnswer}>{askContents}</div>
              <div className={Style.QnaDate}>{askDate}</div>
            </div>
            <div className={Style.QnaContentAnswerBox}>
              <div className={Style.QnaContentAnswer}>{askAnswer}</div>
              <div className={Style.QnaDate}>{askAnswerDate}</div>
            </div>
            <EditBtn onUpdate={()=>handlerNavi(data.askIdx)}/>
          </>
          :
          <>
            <div className={Style.QnaContentBox}>
              <div className={Style.QnaContent}>{askContents}</div>
              <div className={Style.QnaDate}>{askDate}</div>
            </div>
            <DoBtn doText={"답변하기"} doOnClick={()=>handlerNavi(data.askIdx)}/>
          </>
        }
      </div>
    </NaviControll>
  )
}
export default AdminQnaDetailPage;