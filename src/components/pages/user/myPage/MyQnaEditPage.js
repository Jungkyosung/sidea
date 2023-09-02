import Style from './MyQnaWritePage.module.css';
import NaviControll from '../../../naviControll/NaviControll';
import { useEffect, useState } from 'react';
import ProfileText from '../../../UI/atoms/ProfileText';
import DoBtn from '../../../UI/atoms/btn/DoBtn';
import Input from '../../../UI/atoms/Input';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from 'react-router-dom';

const MyQnaEditPage = (props) => {
  const [askTitle, setAskTitle] = useState('');
  const [askContents, setAskContents] = useState('');
  const [askIdx, setAskIdx] = useState(null);
 
  const { EditData } = props;

  useEffect(() => {
    setAskTitle(EditData.askTitle)
    setAskContents(EditData.askContents)
    setAskIdx(EditData.askIdx)
  },[])

  const handlerTitle = (e) => {
    const inputTitle = e.target.value;
    if (inputTitle.length <= 15) {
      setAskTitle(inputTitle);
    }
  };

  const handlerContent = (e) => {
    setAskContents(e.target.value);
  };
  

  // 문의 등록
  const handlerEditAsk = () => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    const userIdx = decode_token.userIdx;
    
    const params = { 
      userIdx: userIdx,
      askTitle : askTitle,
      askContents : askContents,
      askIdx : askIdx
    };
    console.log(params)

    axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/qna`, 
      params, {headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }}
    )
    .then(res => {
      console.log(res.data);
      alert('문의를 수정했습니다');
      window.location.replace(`/mypage/qna/detail/${askIdx}`);
      
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
<>
        <div className={Style.QnaWriteBox}>
          <div className={Style.QnaWriteTitle}>
          <Input inputPlaceholder={"제목을 입력해주세. (15자 이내)"}
          inputValue={askTitle}
          inputHandler={handlerTitle}/>
          </div>
          <textarea className={Style.QnaWriteCont}
            placeholder='문의할 내용을 입력해주세요'
            value={askContents}
            onChange={handlerContent}>
          </textarea>
        </div>
        <div className={Style.QnaWriteBtm}>
          <DoBtn doText={"문의수정"} doOnClick={handlerEditAsk}/>
        </div>
 </>
  )
}
export default MyQnaEditPage;