import Style from "./CampDetailPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const CampDetailPage = () => {
  const [data, setData] = useState([]);
  const [campDetail, setCampDetail] = useState({
    campImgSrc: "https://www.unesco.or.kr/assets/data/campaign/nvRdEe5I0zxV6AICGh8efrevSRcqZW_1665121652_1.jpg",
    campTitle: "캠페인",
    campOrganizer: "주최자",
    campPeriod: "23.07.20 ~ 23.10.27",
    campGoalPoint: "300,000,000P",
    campTotalPoint: "256,000,000P",
    campProgress: 80
  });

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    let userId = decode_token.sub;

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}api/donation/detail`, //${donationIdx}
      { params: { userId: encodeURI(userId) },
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => {
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
          <img className={Style.campImg} src={campDetail.campImgSrc} />
        </div>

        <div className={Style.campInfo_box}>
          <div className={Style.header}>
            <p>{campDetail.campTitle}</p>
            <p className={Style.campSubTitle}>{campDetail.campOrganizer}</p>
          </div>

          <div className={Style.content}>
            <div className={Style.campInfo}>
              <p className={Style.campSubTitle}>캠페인 기간</p>
              <p>{campDetail.campPeriod}</p>
            </div>
            <div className={Style.campInfo}>
              <p className={Style.campSubTitle}>목표 포인트</p>
              <p>{campDetail.campGoalPoint}</p>
            </div>
            <div className={Style.campInfo}>
              <p className={Style.campSubTitle}>기부된 포인트</p>
              <p>{campDetail.campTotalPoint}</p>
            </div>
          </div>
          <div className={Style.progressBar}>
            <div className={Style.campInfo}>
              <div>{campDetail.campProgress}%</div>
              <div>{campDetail.campProgress >= 100 ? "완료" : "진행중"}</div>
            </div>
            <div className={Style.campProgressBackBar}>
              <div className={Style.campProgressFrontBar} style={{ width: `${campDetail.campProgress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CampDetailPage;