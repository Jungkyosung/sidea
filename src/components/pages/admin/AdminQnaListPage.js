import Style from './AdminQnaListPage.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Title from '../../UI/atoms/Title';
import NaviControll from '../../naviControll/NaviControll';
import AskList from '../../UI/atoms/AskList';
import RadioBtn from '../../UI/atoms/btn/RadioBtn';
import { BiSearchAlt2 } from 'react-icons/bi';

const AdminQnaListPage = () => {

  const navigate = useNavigate();

  // 라디오 
  const [selectedRadio, setSelectedRadio] = useState('전체');

  const radioList = ['전체', '미답변', '답변완료'];

  const onRadiofilter = (e) => {
    setSelectedRadio(e);
  }

  function handlerMove(location) {
    navigate(location);
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
          <AskList askNumber={"1"} askTitleClick={() => handlerMove("/admin/qna/1")} askTitle={"문의샘플제목1"} askIsCommented={true} />
          <AskList askNumber={"2"} askTitleClick={() => handlerMove("/admin/qna/2")} askTitle={"문의샘플제목 길어지면 어떻게 될까?2"} askIsCommented={true} />
          <AskList askNumber={"3"} askTitleClick={() => handlerMove("/mypage/qna/detail/3")} askTitle={"문의샘플제목 길어지면 어떻게 될까?3"} askIsCommented={false} />
          <AskList askNumber={"4"} askTitleClick={() => handlerMove("/mypage/qna/detail/4")} askTitle={"문의샘플제목4"} askIsCommented={false} />
          <AskList askNumber={"5"} askTitleClick={() => handlerMove("/mypage/qna/detail/5")} askTitle={"문의샘플제목5"} askIsCommented={false} />
          <AskList askNumber={"6"} askTitleClick={() => handlerMove("/mypage/qna/detail/6")} askTitle={"문의샘플제목 길어지면 어떻게 될까?6"} askIsCommented={true} />
          <AskList askNumber={"7"} askTitleClick={() => handlerMove("/mypage/qna/detail/7")} askTitle={"문의샘플제목 길어지면 어떻게 될까?7"} askIsCommented={true} />
          <AskList askNumber={"8"} askTitleClick={() => handlerMove("/mypage/qna/detail/8")} askTitle={"문의샘플제목 길어지면 어떻게 될까?8"} askIsCommented={false} />
          <AskList askNumber={"9"} askTitleClick={() => handlerMove("/mypage/qna/detail/9")} askTitle={"문의샘플제목 길어지면 어떻게 될까?9"} askIsCommented={true} />
          <AskList askNumber={"9"} askTitleClick={() => handlerMove("/mypage/qna/detail/9")} askTitle={"문의샘플제목 길어지면 어떻게 될까?9"} askIsCommented={true} />
          <AskList askNumber={"9"} askTitleClick={() => handlerMove("/mypage/qna/detail/9")} askTitle={"문의샘플제목 길어지면 어떻게 될까?9"} askIsCommented={true} />
          <AskList askNumber={"9"} askTitleClick={() => handlerMove("/mypage/qna/detail/9")} askTitle={"문의샘플제목 길어지면 어떻게 될까?9"} askIsCommented={true} />
          <AskList askNumber={"9"} askTitleClick={() => handlerMove("/mypage/qna/detail/9")} askTitle={"문의샘플제목 길어지면 어떻게 될까?9"} askIsCommented={true} />
          <AskList askNumber={"9"} askTitleClick={() => handlerMove("/mypage/qna/detail/9")} askTitle={"문의샘플제목 길어지면 어떻게 될까?9"} askIsCommented={true} />
          <AskList askNumber={"9"} askTitleClick={() => handlerMove("/mypage/qna/detail/9")} askTitle={"문의샘플제목 길어지면 어떻게 될까?9"} askIsCommented={true} />
          <AskList askNumber={"9"} askTitleClick={() => handlerMove("/mypage/qna/detail/9")} askTitle={"문의샘플제목 길어지면 어떻게 될까?9"} askIsCommented={true} />
          <AskList askNumber={"9"} askTitleClick={() => handlerMove("/mypage/qna/detail/9")} askTitle={"문의샘플제목 길어지면 어떻게 될까?9"} askIsCommented={true} />
        </div>
      </div>
    </NaviControll>
  )
}
export default AdminQnaListPage;