import { useNavigate, useParams } from 'react-router';
import Style from "./AdminCampDetailPage.module.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineClose } from 'react-icons/md';
import EditBtn from '../../UI/atoms/btn/EditBtn';
import CloseBtn from '../../UI/atoms/btn/CloseBtn';


const AdminCampDetailPage = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { campaignidx } = useParams();

  // 조회
  useEffect(() => {
    //이거는 pathvariable 형태고, param 형태로 바꿔야 해요.
    const params = { donationIdx : campaignidx }

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/donation/detail`,
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
    campImgSource: data.donorImage,
    campTitle: data.donationName,
    campOrganizer: data.donorName,
    campPeriod: `${formatDate(startDate)} ~ ${formatDate(endDate)}`,
    campGoalPoint: pointReplace((data.donationTargetAmount) + 'P'),
    campTotalPoint: pointReplace((data.donationAmount) + 'P'),
    campProgress: parseInt(( data.donationAmount / data.donationTargetAmount ) * 100)
  }

  function handlerNavi(id, data){
    console.log(data);
    navigate(`/admin/campaign/edit/${id}`, { state: {data}});
    
  }

  // 삭제 핸들러
  const handlerDelete = () => {
    const donationIdx = campProperties.campId;
    const params = { donationIdx: donationIdx };
  
    axios.delete(
      `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/donation`,
      { params }, {headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }}
    )
      .then((res) => {
        if (res.data === '삭제') {
          console.log("정상적으로 삭제되었습니다.");
          alert("정상적으로 삭제되었습니다")
          window.location.replace('/admin/campaignlist');
        } else {
          console.log("삭제에 실패했습니다.");
          return;
        }
      })
      .catch((err) => {
        console.error('에러 상세 정보:', err);
    
        if (err.response) {
          console.error('서버 응답 오류:', err.response.data);
        } else if (err.request) {
          console.error('요청 전송 실패:', err.request);
        } else {
          console.error('오류:', err.message);
        }
      });
  };

  return (
    <>
      <div className={Style.container}>
        {/* <div> */}
          <img className={Style.campImg} src={campProperties.campImgSource} />
          <div className={Style.close}><CloseBtn onClick={()=>navigate('/admin/campaignlist')} /></div>
        {/* </div> */}

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
              <div>{status}</div>
            </div>
            <div className={Style.campProgressBackBar}>
              <div className={Style.campProgressFrontBar} style={{ width: `${campProperties.campProgress}%` }}></div>
            </div>
          </div>
          <div className={Style.EditBtn}>
            <EditBtn 
              onDelete={handlerDelete}
              onUpdate={() => handlerNavi(campProperties.campId, data)}/>
        </div>
        </div>
      
      </div>
    </>
  )
}
export default AdminCampDetailPage;