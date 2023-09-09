import Style from './MyQnaDetailPage.module.css';
import NaviControll from '../../../naviControll/NaviControll';
import { useEffect, useState } from 'react';
import ProfileText from '../../../UI/atoms/ProfileText';
import UpdateBtn from '../../../UI/atoms/btn/UpdateBtn';
import EditBtn from '../../../UI/atoms/btn/EditBtn';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import jwt_decode from "jwt-decode";
import Title from '../../../UI/atoms/Title';
import MyQnaEditPage from './MyQnaEditPage';
import CloseBtn from '../../../UI/atoms/btn/CloseBtn';

const MyQnaDetailPage = () => {

  const [isAnswered, setIsAnswered] = useState(false);
  const [data, setData] = useState([]);
  const [nickname, setNickname] = useState('');
  const [isClick, setIsClick] = useState(false);

  const [askEditData, setAskEditData] = useState([]);
  

  const { qnaidx } = useParams();
  const navigate = useNavigate();

  function handlerNavi(id, data){
    navigate(`/mypage/qna/${id}`, { state: {data}});
  }
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    const userIdx = decode_token.userIdx;
    const params = { 
      askIdx : qnaidx,
      userIdx : userIdx 
    }

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
  
  const handlerEditGo = () => {
    setAskEditData(data);
    setIsClick(true); 
  }
  
  const handlerDelete = () => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    const userIdx = decode_token.userIdx;
    const askIdx = data.askIdx;
    const params = { 
      userIdx : userIdx,
      askIdx : askIdx 
    };
    console.log(params)
    axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/qna`,
      { data: params, headers: { 'Authorization': `Bearer ${token}`}}
    )
      .then((res) => {
        if (res.data === '삭제') {
          console.log(res.data)
          console.log("정상적으로 삭제되었습니다.");
          alert("정상적으로 삭제되었습니다")
          window.location.replace('/mypage/qnalist');
        } else {
          console.log("삭제에 실패했습니다.");
          return;
        }
      })
      .catch((err) => {
        console.error('에러 상세 정보:', err);
      });
  };

  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <div className={Style.QnaWriteHeadWrap}>
          <Title titleName={nickname} />
          <div className={Style.askListHead} >나의 문의내역</div>
        </div>
        {isClick ? 
        (
          <>
            <div className={Style.close}><CloseBtn onClick={()=>setIsClick(false)} /></div>
            <MyQnaEditPage EditData={askEditData} />
          </>
        )
        :
        (
          <>
          <div className={Style.QnaDetailBox}>
            <div className={Style.close}><CloseBtn onClick={()=>navigate('/mypage/qnalist')} /></div>
            {isAnswered ?
              (<>
                  <div className={Style.MyQnaTitle}>{askTitle}</div>
                  <div className={Style.MyQnaText}>
                    <div className={Style.askContents}> {askContents} </div>
                    <div className={Style.askDate}>{askDate}</div>
                  </div>
                  <div className={Style.AdminQnaText}>
                    <div className={Style.askContents}> {askAnswer}</div>
                    <div className={Style.askDate}>{askAnswerDate}</div>
                  </div>

              </>)
              :
              (<>

                <div className={Style.MyQnaTitle}>{askTitle}</div>
                <div className={Style.MyQnaContent}>
                  <div className={Style.askContents}> {askContents} </div>
                  <div className={Style.askDate}>{askDate}</div>
                </div>

              </>)
            }
          </div>
          <div className={Style.editbtn}>
            <EditBtn deleteTxt={"삭제"} updateTxt={"수정"} onDelete={handlerDelete} onUpdate={handlerEditGo}/>
          </div>
          </>
        )
      }
      </div>
    </NaviControll>
  )
}
export default MyQnaDetailPage;