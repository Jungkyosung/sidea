import Style from "./CampDetailPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineClose } from 'react-icons/md';
import DoBtn from "../../../UI/atoms/btn/DoBtn";
import CloseBtn from "../../../UI/atoms/btn/CloseBtn";
import Input from "../../../UI/atoms/Input";
import jwt_decode from "jwt-decode";

const CampDetailPage = ({}) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { campaignidx } = useParams();
  const [isClick, setIsClick] = useState(false);
  const [campPoint, setCampPoint] = useState('');
  const [isDoDisabled, setIsDoDisabled] = useState(true);

  // 조회
  useEffect(() => {
    //이거는 pathvariable 형태고, param 형태로 바꿔야 해요.
    
    const params = { donationIdx : campaignidx }

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/donation/detail`,
    { params , headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => {
          console.log(res.data)
            setData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
  }, []);

  // 날짜를 SQL 날짜 형식으로 변환하는 함수
  const formatDate = (date) => {
    const year = date.getFullYear() % 100;
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);  
    return `${year}.${month}.${day}`
  };

  const startDate = new Date(data.donationDate);
  const endDate = new Date(data.donationDuration);

  // 포인트 출력형식 
  const pointReplace = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 진행중 완료 비교 
  const today = new Date();
  const progressEndday = new Date(data.donationDuration);
  progressEndday.setDate(progressEndday.getDate() + 1);

  const status = formatDate(progressEndday) >= formatDate(today) ? "진행중" : "완료";

  const campProperties = {
    campId: data.donationIdx,
    campImgSource: "https://i.pinimg.com/564x/73/61/13/736113f91b9513418f1f8af1bdb2e00c.jpg",
    campTitle: data.donationName,
    campOrganizer: data.donorName,
    campPeriod: `${formatDate(startDate)} ~ ${formatDate(endDate)}`,
    campGoalPoint: pointReplace((data.donationTargetAmount) + 'P'),
    campTotalPoint: pointReplace((data.donationAmount) + 'P'),
    campProgress: parseInt(( data.donationAmount / data.donationTargetAmount ) * 100)
  };

  const handlerClickAdd = () => {
    setIsClick(true)
  };

  const handlerCampPoint = (e) => {
    const inputValue = e.target.value;
    const number = inputValue.replace(/[^0-9]/g, '');
    if (number !== '') {
      const inputPoint = parseInt(number, 10);
      setCampPoint(inputPoint);
    }
    setIsDoDisabled(inputValue === '');
  };

  const handlerCampAdd = () => {
    let donationIdx = campProperties.campId;
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    let userIdx = decode_token.userIdx;

    const donationUser = {
      donationIdx : donationIdx,
      userIdx : userIdx,
      userDonationPoint : campPoint
    }

    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/donation`,
      donationUser, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }}
    )
      .then(res => {
        console.log(res);  
        alert('기부에 참여하셨습니다');
        window.location.replace(`/mypage/campaignlist`);

        const pointDonation = {
          userIdx: userIdx,
          pointScore: campPoint
        }
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/point/donation`,
          pointDonation, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }}
        )
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <>
      <div className={Style.container}>
        {/* <div> */}
          <div className={Style.campImg_box}><img className={Style.campImg} src={campProperties.campImgSource} /></div>
          <div className={Style.close}><CloseBtn onClick={()=>navigate('/campaignlist')} /></div>
        {/* </div> */}

        <div className={Style.campInfo_box}>
          <div className={Style.header}>
            <p className={Style.campTitle}>{campProperties.campTitle}</p>
            <p className={Style.campDonor}>{campProperties.campOrganizer}</p>
          </div>

          <div className={Style.content}>
            <div className={Style.campInfo}>
              <p className={Style.campSubTitle}>캠페인 기간</p>
              <p>{campProperties.campPeriod}</p>
            </div>
            <div className={Style.campInfo}>
              <p className={Style.campSubTitle}>목표 포인트</p>
              <p>{campProperties.campGoalPoint}</p>
            </div>
            <div className={Style.campInfo}>
              <p className={Style.campSubTitle}>기부된 포인트</p>
              <p>{campProperties.campTotalPoint}</p>
            </div>
          </div>
          <div className={Style.progressBar}>
            <div className={Style.campInfo}>
              <div className={Style.campInfo_text}>{campProperties.campProgress}%</div>
              <div className={Style.campInfo_text}>{status}</div>
            </div>
            <div className={Style.campProgressBackBar}>
              <div className={Style.campProgressFrontBar} style={{ width: `${campProperties.campProgress}%` }}></div>
            </div>
          </div>
          {status === '진행중' ? 
            <div className={Style.DoBtn}>
              {isClick ? 
                (
                  <>
                  <div className={Style.joinCamp_box}>
                    <div className={Style.closeInput}><CloseBtn onClick={()=>setIsClick(false)} /></div>
                    <p>기부에 참여할 포인트를 입력해주세요</p>
                    <div className={Style.joinCamp_input}>
                      <Input className={Style.ChargeInput}
                        inputPlaceholderplaceholder='충전 포인트를 입력해주세요'
                        // inputType="number"
                        inputValue={pointReplace(campPoint)}
                        inputHandler={handlerCampPoint}
                      />
                      <label>P</label>
                    </div>
                    <DoBtn doText="참여완료"  doOnClick={handlerCampAdd} doDisabled={isDoDisabled}/>
                  </div>
                  <div className={Style.disableDo}><DoBtn  doDisabled={true}/></div>
                  </>
                )
                :
                (<DoBtn doText="참여하기" doOnClick={handlerClickAdd} />)}
              
            </div>
            : null
            }
        </div>
      
      </div>
    </>
  )
}
export default CampDetailPage;