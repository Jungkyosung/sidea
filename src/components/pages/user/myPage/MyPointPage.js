import Style from './MyPointPage.module.css';
import { useState } from 'react';
import ProfileImgTmp from '../../../templates/ProfileImgTmp';
import DoBtn from '../../../UI/atoms/btn/DoBtn';
import PointHistory from '../../../UI/atoms/PointHistory';
import { BsPlusCircle } from 'react-icons/bs';
import SelectToggleRect from '../../../UI/atoms/toggle/SelectToggleRect';
import EditBtn from '../../../UI/atoms/btn/EditBtn';

const MyPointPage = () => {

  const [profileInfo, setProfileInfo] = useState({
    profileImgSrc: "https://i.pinimg.com/564x/84/62/80/846280899168e1abab5a6cd0d6e03dcf.jpg",
    profileText: "닉네임"
  });

  const [isCharged, setIsCharged] = useState(false);

  let pointBalance = 1005;
  let pointBalanceWithRest = pointBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 토글 네모
  const [selectedChargePoint, setSelectedChargePoint] = useState(500);

  const chargePointList = [500, 1000, 3000, 5000];

  const handlerCharPointChange = (e) => {
    setSelectedChargePoint(e);
  };

  return (
    <ProfileImgTmp profileImgSrc={profileInfo.profileImgSrc} profileText={profileInfo.profileText}>
      {/* <div className={Style.PointBalanceHead} >현재 포인트</div>
      <div className={Style.PointIcon}><BsPlusCircle /></div>
      <div>{pointBalanceWithRest} P</div>
      <div className={Style.PointBalanceHead} >포인트 현황</div>
      <div className={Style.PointHistoryBox}>
        <PointHistory pointDate={"08.10"} pointType={"충전"} pointAmount={1000} pointBalance={1005} />
        <PointHistory pointDate={"08.10"} pointType={"충전"} pointAmount={1000} pointBalance={1005} />
        <PointHistory pointDate={"08.10"} pointType={"충전"} pointAmount={1000} pointBalance={1005} />
        <PointHistory pointDate={"08.10"} pointType={"충전"} pointAmount={1000} pointBalance={1005} />
        <PointHistory pointDate={"08.10"} pointType={"충전"} pointAmount={1000} pointBalance={1005} />
        <PointHistory pointDate={"08.10"} pointType={"충전"} pointAmount={1000} pointBalance={1005} />
        <PointHistory pointDate={"08.10"} pointType={"충전"} pointAmount={1000} pointBalance={1005} />
        <PointHistory pointDate={"08.10"} pointType={"충전"} pointAmount={1000} pointBalance={1005} />
      </div>
      <DoBtn doOnClick={()=>setIsCharged(true)} doText={"포인트 충전하기"} /> */}
      <div className={Style.PointBalanceHead} >현재 포인트</div>
      <div className={Style.PointIcon}><BsPlusCircle /></div>
      <div>{pointBalanceWithRest} P</div>
      <div className={Style.PointBalanceHead} >포인트 충전금액</div>
      <SelectToggleRect toggleListRect={chargePointList} toggleActiveRect={selectedChargePoint} onToggleRect={handlerCharPointChange} />
      <div>
        <input className={Style.ChargeInput} placeholder='충전 포인트를 입력해주세요'></input>
      </div>
      <div className={Style.PointBalanceHead} >결제 수단</div>
      <div className={Style.ChargingWayBox}>
        <div className={Style.ChargingWay}></div>
        <div className={Style.ChargingWay}></div>
      </div>
      <div>
        <div>포인트 충전 예상 금액</div>
        <div>{pointBalance + selectedChargePoint}P</div>
      </div>
      <div className={Style.BtnBox}>
        <button className={Style.CancelBtn}  >
          취소
        </button>
        <button className={Style.ChargeBtn}  >
          충전
        </button>
      </div>

    </ProfileImgTmp>
  )
}
export default MyPointPage;