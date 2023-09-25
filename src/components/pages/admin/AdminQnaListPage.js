import Style from './AdminQnaListPage.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Title from '../../UI/atoms/Title';
import NaviControll from '../../naviControll/NaviControll';
import AskList from '../../UI/atoms/AskList';
import RadioBtn from '../../UI/atoms/btn/RadioBtn';
import { BiSearchAlt2 } from 'react-icons/bi';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const AdminQnaListPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  function handlerNavi(id){
    navigate(`/admin/qna/${id}`);
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    let userId = decode_token.sub;

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/qna`,
      { params: { userId: encodeURI(userId) },
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => {
          console.log(res.data);
          setData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
  }, []);

  // const askData = []

  // 라디오 
  const [selectedRadio, setSelectedRadio] = useState('전체');

  const radioList = ['전체', '미답변', '답변완료'];

  const filterData = data.filter((radio) => {
    if (selectedRadio === '전체') {
      return true; 
    } else if (selectedRadio === '미답변') {
      return !radio.askAnswer;
    } else if (selectedRadio === '답변완료') {
      return radio.askAnswer;
    }
    return false; 
  });


  const onRadiofilter = (e) => {
    setSelectedRadio(e);
  }

  
  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <Title titleName={"문의목록"} />
        <div className={Style.RadioBtnBox}>
          <RadioBtn
            radioList={radioList}
            selectRadio={selectedRadio}
            onRadioChange={onRadiofilter}
          />
        </div>
        <div className={Style.SearchWrap}>
          <div className={Style.SearchBox}>
            <input placeholder='검색' />
            <div className={Style.SearchIcon}><BiSearchAlt2 /></div>
          </div>
        </div>
        <div className={Style.askListBox}>
          { Array.isArray(filterData) && filterData.length > 0 ? 
            ( filterData.map((ask, id) => (
              <AskList
                key={id}
                askNumber={filterData.length - id}
                askTitleClick={() => handlerNavi(ask.askIdx)}
                askTitle={ask.askTitle}
                askIsCommented={ask.askAnswer ? true : false} />  
            ))) 
          : (<div className={Style.nullContens}>등록된 문의가 없습니다</div>)
          }
        </div>
      </div>
    </NaviControll>
  )
}
export default AdminQnaListPage;