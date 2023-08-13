import { useNavigate } from 'react-router';
import EditBtn from '../../UI/atoms/btn/EditBtn';
import Style from "./AdminCampDetailPage.module.css";
import { useState } from 'react';


const AdminCampDetailPage = () => {

  const navigate = useNavigate();

  function handlerNav(id){
    let location = '/admin/campaign/edit/' + id;
    navigate(location);
  }

  const [campDetail, setCampDetail] = useState({
    campImgSrc: "https://www.unesco.or.kr/assets/data/campaign/nvRdEe5I0zxV6AICGh8efrevSRcqZW_1665121652_1.jpg",
    campTitle: "캠페인",
    campOrganizer: "주최자",
    campPeriod: "23.07.20 ~ 23.10.27",
    campGoalPoint: "300,000,000P",
    campTotalPoint: "256,000,000P",
    campProgress: 80
  });

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
        <div className={Style.campEditBtn}>
          <EditBtn onUpdate={()=>handlerNav(1)}/>
        </div>
      </div>
    </>
  )
}
export default AdminCampDetailPage;