import Style from './MyPointPage.module.css';
import { useEffect, useState } from 'react';
import ProfileImgTmp from '../../../templates/ProfileImgTmp';
import DoBtn from '../../../UI/atoms/btn/DoBtn';
import PointHistory from '../../../UI/atoms/PointHistory';
import { BsPlusCircle } from 'react-icons/bs';
import SelectToggleRect from '../../../UI/atoms/toggle/SelectToggleRect';
import EditBtn from '../../../UI/atoms/btn/EditBtn';
import axios from "axios";
import jwt_decode from "jwt-decode";

const MyPointPage = () => {

  const [profileImg, setProfileImg] = useState("https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg");
  const [nickname, setNickname] = useState('');
  const [userIdx, setUserIdx] = useState('');
  const [pointData, setPointData] = useState([]);


  // 조회 (프로필 이미지, 닉네임, 포인트)
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    let userIdx = decode_token.userIdx;

    console.log(decode_token);
    const params = { userIdx : userIdx }

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/point`,
      {params}, { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => {
            console.log(res.data);
            setNickname(decode_token.nickname);
            setUserIdx(decode_token.userIdx);
            console.log(decode_token.userIdx);
            setPointData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
  }, []);


  const [isCharged, setIsCharged] = useState(true);

  // let pointBalance = 500;
  // let pointBalanceWithRest = pointBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 토글 네모
//   const [selectedChargePoint, setSelectedChargePoint] = useState(0);

//   const chargePointList = [500, 1000, 3000, 5000];

//   const handlerCharPointChange = (e) => {
//     setSelectedChargePoint(e);
//   };

  const [selectedChargePoint, setSelectedChargePoint] = useState(0);
  const [chargeInput, setChargeInput] = useState('');

  const chargePointList = [500, 1000, 3000, 5000];

  // 현재 포인트

  let pointBalance = 0;
  // 배열을 순회하면서 계산
  pointData.forEach(point => {
    if (point.pointTypeIdx === 1) {
      pointBalance -= point.pointScore; 
    } else {
      pointBalance += point.pointScore; 
    }
  });

  // 토글 네모
  const handlerCharPointChange = (e) => {
    setSelectedChargePoint(parseInt(e, 10)); 
    setChargeInput(''); 
  };

  // 입력 포인트 
  const handlerInputChange = (e) => {
    const inputValue = e.target.value;
    const number = inputValue.replace(/[^0-9]/g, '');
    if (number !== '') {
      const inputPoint = parseInt(number, 10);

      setChargeInput(inputPoint);
      setSelectedChargePoint(inputPoint);
    }
  };

  // 충전 버튼
  const handlerCharPoint = (e) => {
    // e.preventDefault();
    console.log(selectedChargePoint);
    const pointDto = {
      userIdx : userIdx,
      pointScore: selectedChargePoint
    };
    console.log(pointDto);
    console.log(userIdx);
    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/point/charging`,
         pointDto ,
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }})
        .then(res => {
          console.log(res);        
        })
        .catch(err => {
          if (err.response) {
            // 요청은 성공했지만 서버에서 오류 응답을 보낸 경우
            console.error('서버 응답 오류:', err.response.data);
          } else if (err.request) {
            // 요청이 전송되지 않은 경우 (네트워크 문제 등)
            console.error('요청 전송 실패:', err.request);
          } else {
            // 기타 오류
            console.error('오류:', err.message);
          }
        });
    console.log("충전")
  };

  // 포인트 타입
  function getPointType(pointTypeIdx) {
    if (pointTypeIdx === 1) return '기부';
    if (pointTypeIdx === 2) return '충전';
    if (pointTypeIdx === 3) return '획득';
    return '';
  }

  // 날짜 형식 바꾸기
  const formatDate = (date) => {
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);  
    return `${ month }.${ day }`;
  };

  // 잔액
  let pointStatus = 0;

  

  return (
    <ProfileImgTmp profileImgSrc={profileImg} profileText={nickname}>
      
      { isCharged 
      ?
      (
        <div className={Style.PointStatus_box}>
          <div className={Style.PointBalanceHead} >현재 포인트</div>
          <div className={Style.PointIcon}><BsPlusCircle /></div>
          <div>{pointBalance} P</div>
          <div className={Style.PointBalanceHead} >포인트 현황</div>
          <div className={Style.PointHistoryBox}>
            { pointData.map(point => {
                const formatPointDate = formatDate(new Date(point.pointDate));

                // 잔액 계산
                if (point.pointTypeIdx === 1) {
                  pointStatus -= point.pointScore;
                } else {
                  pointStatus += point.pointScore;
                };
                
                return (
                  <div key={point.pointDate}>
                    <PointHistory
                      pointDate={formatPointDate}
                      pointType={getPointType(point.pointTypeIdx)}
                      pointAmount={point.pointScore}
                      pointBalance={pointStatus}
                    />
                  </div>
                );
              })
            }
          </div>
          <DoBtn doOnClick={()=>setIsCharged(false)} doText={"포인트 충전하기"} />
        </div>
      )
      :
      (
        <div>
          <div className={Style.PointBalanceHead} >현재 포인트</div>
          <div className={Style.PointIcon}><BsPlusCircle /></div>
          <div>{pointBalance} P</div>
          <div className={Style.PointBalanceHead} >포인트 충전금액</div>
          <SelectToggleRect toggleListRect={chargePointList} toggleActiveRect={selectedChargePoint} onToggleRect={handlerCharPointChange} />
          <div>
            <input className={Style.ChargeInput}
                  placeholder='충전 포인트를 입력해주세요'
                  type="number"
                  value={chargeInput}
                  onChange={handlerInputChange}>
            </input>
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
            <button className={Style.CancelBtn} onClick={()=>setIsCharged(true)} >
              취소
            </button>
            <button className={Style.ChargeBtn}  onClick={handlerCharPoint} >
              충전
            </button>
          </div>
      </div>
      )
    }

    </ProfileImgTmp>
  )
}
export default MyPointPage;