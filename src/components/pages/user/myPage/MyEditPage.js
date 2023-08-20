import Style from './MyEditPage.module.css';
import { useEffect, useState } from 'react';
import NaviControll from '../../../naviControll/NaviControll'
import ProfileImg from '../../../UI/atoms/ProfileImg';
import DoBtn from '../../../UI/atoms/btn/DoBtn';
import axios from "axios";
import jwt_decode from "jwt-decode";

const MyEditPage = () => {

  const [profileInfo, setProfileInfo] = useState({
    profileImgSrc: "https://i.pinimg.com/564x/84/62/80/846280899168e1abab5a6cd0d6e03dcf.jpg",
    profileText: "닉네임"
  });
  const [data, setData] = useState();
  
  // 조회 (닉네임, 프로필 이미지, 비밀번호, 이메일)
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    let userIdx = decode_token.sub;

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user`,
      { params: { userIdx: encodeURI(userIdx) },
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
  }, []);

  // 닉네임, 프로필 이미지, 비밀번호 수정가능
  const handlerEdit = () => {
    axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user`,
      { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => {
            navigator("/mypage/edit")
        })
        .catch(err => {
            console.log(err);
        })
  
  };

  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <ProfileImg profileImgSrc={profileInfo.profileImgSrc} />
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>닉네임</label>
          <div>
            <input className={Style.EditInput}></input>
          </div>
        </div>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>현재 비밀번호</label>
          <div>
            <input className={Style.EditInput}></input>
          </div>
        </div>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>새 비밀번호</label>
          <div>
            <input className={Style.EditInput}></input>
          </div>
        </div>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>새 비밀번호 확인</label>
          <div>
            <input className={Style.EditInput}></input>
          </div>
        </div>
        <div className={Style.EditInputBox}>
          <label className={Style.EditInputLabel}>이메일</label>
          <div>
            <input className={Style.EditInput}></input>
          </div>
        </div>
        <DoBtn doText={"변경하기"} doOnClick={handlerEdit}/>
        <div className={Style.LeaveBtn}>탈퇴하기</div>
      </div>
    </NaviControll>
  )
}
export default MyEditPage;