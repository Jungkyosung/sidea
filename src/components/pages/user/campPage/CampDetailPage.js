import Style from "./CampDetailPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import jwt_decode from "jwt-decode";

const CampDetailPage = ({}) => {
  const [data, setData] = useState([]);
  
  const { campaignidx } = useParams();
  // const [campDetail, setCampDetail] = useState({
  //   campImgSrc: "https://www.unesco.or.kr/assets/data/campaign/nvRdEe5I0zxV6AICGh8efrevSRcqZW_1665121652_1.jpg",
  //   campTitle: "캠페인",
  //   campOrganizer: "주최자",
  //   campPeriod: "23.07.20 ~ 23.10.27",
  //   campGoalPoint: "300,000,000P",
  //   campTotalPoint: "256,000,000P",
  //   campProgress: 80
  // });

  const campProperties = {
    campId: data.donationIdx,
    campImgSource: "https://i.pinimg.com/564x/73/61/13/736113f91b9513418f1f8af1bdb2e00c.jpg",
    campTitle: data.donorName,
    campOrganizer: data.donorIdx,
    campProgress: parseInt((data.donationTargetAmount / data.donationAmount) * 100)
  };
  
  // 조회
  useEffect(() => {

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}api/donation/detail`, //${donationIdx}
      { campaignidx, headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => {
          console.log(res.data)
            setData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
  }, []);


  return (
    <>
      <div className={Style.container}>
        <div>
          <img className={Style.campImg} src={campProperties.campImgSrc} />
        </div>

        <div className={Style.campInfo_box}>
          <div className={Style.header}>
            <p>{campProperties.campTitle}</p>
            <p className={Style.campSubTitle}>{campProperties.campOrganizer}</p>
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
              <div>{campProperties.campProgress}%</div>
              <div>{campProperties.campProgress >= 100 ? "완료" : "진행중"}</div>
            </div>
            <div className={Style.campProgressBackBar}>
              <div className={Style.campProgressFrontBar} style={{ width: `${campProperties.campProgress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CampDetailPage;