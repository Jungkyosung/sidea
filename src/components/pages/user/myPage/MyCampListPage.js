import Style from './MyCampListPage.module.css';
import CampaignList from '../../../UI/atoms/CampaignList';
import ProfileImgTmp from '../../../templates/ProfileImgTmp';
import { useEffect, useState } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const MyCampListPage = () => {

  const [data, setData] = useState([]);
  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState("https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg");

  const navigate = useNavigate();

  function handlerNavi(id){
    console.log(id);
    // let location = '/campaign/' + id;
    navigate(`/campaign/${id}`);
  }

  // 목록 조회 (userIdx, camplist)
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    let userIdx = decode_token.userIdx;
    console.log(userIdx)
    const params = {userIdx : userIdx};
    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/donation/mydonation`,
      { params, headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => {
          console.log(res.data)
            setData(res.data);
            setNickname(decode_token.nickname)
        })
        .catch(err => {
            console.log(err);
        })
  }, []);

  const myCampContent = () => (
    Array.isArray(data) && data.length > 0
    ?
      (
        data.map(camplist => (
          <CampaignList  
            campClick={()=>handlerNavi(camplist.donationIdx)}
                  campImgSource={camplist.donorImage}
                  campTitle={camplist.donationName}
                  campOrganizer={camplist.donorName}
                  campProgress={parseInt((camplist.donationAmount / camplist.donationTargetAmount) * 100)}
                  campEnddate={camplist.donationDuration}
          />
        ))
      ) 
    : 
      ( <div>아직 참여한 기부가 없습니다.</div> )
  );

  return (
    <ProfileImgTmp profileImgSrc={profileImg} profileText={nickname}>
      <div className={Style.CampHead} >참여한 기부</div>
      <div className={Style.CampListBox}>
        {myCampContent()}
      </div>
    </ProfileImgTmp>
  )
}
export default MyCampListPage;