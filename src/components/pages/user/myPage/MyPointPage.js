import Style from './MyPointPage.module.css';
import { useEffect, useState } from 'react';
import ProfileImgTmp from '../../../templates/ProfileImgTmp';
import DoBtn from '../../../UI/atoms/btn/DoBtn';
import PointHistory from '../../../UI/atoms/PointHistory';
import { MdControlPoint } from 'react-icons/md';
import { BiDonateHeart } from 'react-icons/bi';
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

  const chargePointList = [500, 1000, 3000, 5000];

  const [selectedChargePoint, setSelectedChargePoint] = useState(500);
  const [chargeInput, setChargeInput] = useState('');


  // 토글 네모
  const handlerCharPointChange = (e) => {
    setSelectedChargePoint(parseInt(e, 10)); 
    setChargeInput(''); 
  };
  
  const handlerInputChange = (e) => {
    const inputValue = e.target.value;
    const number = inputValue.replace(/[^0-9-]/g, ''); // "+"와 "-"를 포함한 모든 기호를 제거
    const inputPoint = parseInt(number, 10);
  
    if (inputPoint > 0) { // 양수 여부 확인
      // 포커스가 아웃되었을 때 값 비교
      e.target.onblur = () => {
        if (chargePointList.includes(inputPoint)) {
          setChargeInput('');
          setSelectedChargePoint(inputPoint);
        } else {
          setChargeInput(inputPoint);
        }
      };
      setSelectedChargePoint(inputPoint);
      setChargeInput(inputPoint);
    } else {
      setSelectedChargePoint('');
      setChargeInput('');
    }
  };

  const handlerInputFocus = () => {
    setSelectedChargePoint('');
  }

  // 충전 버튼
  const handlerCharPoint = () => {
    if(selectedChargePoint) {
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
          alert('포인트가 충전되었습니다')
          window.location.replace('/mypage/point')
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
    } else {
      alert('충전할 포인트를 선택해주세요');
    }
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


  // 포인트 데이터 과거순 정렬
  const sortedPointData = pointData.sort((b, a) => new Date(b.pointDate) - new Date(a.pointDate));

  let pointStatus = 0; // 포인트 상태 초기화
  let pointDonation = 0;

  const reversedPointHistoryList = sortedPointData.map((point, index) => {
    const formatPointDate = formatDate(new Date(point.pointDate));
    let pointBalance; 

    if (point.pointTypeIdx === 1) {
      pointStatus -= point.pointScore;
      pointDonation += point.pointScore
    } else {
      pointStatus += point.pointScore;
    }

    // 포인트 잔액을 현재 잔액으로 설정 (과거부터 계산)
    pointBalance = pointStatus;

    return (
          <div className={Style.pointistory} key={index}>
            <PointHistory
              pointDate={formatPointDate}
              pointType={getPointType(point.pointTypeIdx)}
              pointAmount={point.pointScore}
              pointBalance={pointBalance}
            />
          </div>
    )
  });

  // 과거순을 최신순으로 정렬
  const pointHistoryList = reversedPointHistoryList.reverse();

  

  return (
    <ProfileImgTmp profileImgSrc={profileImg} profileText={nickname}>
      
      { isCharged 
      ?
      (
        <div className={Style.PointStatus_box}>
          <div className={Style.PointAccount_container} >
            <div className={Style.PointAccount_box}>
              <div className={Style.PointBalanceHead} >현재 포인트</div>
              <div className={Style.PointIcon}><MdControlPoint /> <span>{pointStatus} P</span></div>
            </div>
            <div className={Style.PointAccount_box}>
              <div className={Style.PointBalanceHead} >적립된 기부 포인트</div>
              <div className={Style.PointIcon}><BiDonateHeart /> <span>{pointDonation} P</span></div>
            </div>
          </div>

          <div className={Style.PointBalance_container}>
            <div className={Style.PointBalanceTitle} >포인트 현황</div>
            <div className={Style.PointHistoryBox}>
              {/* { pointData.map(point => {
                  const formatPointDate = formatDate(new Date(point.pointDate));

                  // 초기 잔액 설정
                  let pointStatus = 0;

                  // 잔액 계산
                  if (point.pointTypeIdx === 1) {
                    pointStatus -= point.pointScore;
                  } else {
                    pointStatus += point.pointScore;
                  };
                  // 포인트 데이터를 최신 순으로 정렬
                
                  
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
              } */}
              <div>{pointHistoryList}</div>
            </div>
          </div>
          <DoBtn doOnClick={()=>setIsCharged(false)} doText={"포인트 충전하기"} />
        </div>
      )
      :
      (
        <div className={Style.PointStatus_box}>
          <div className={Style.PointChar_container}>
            <div className={Style.PointBalanceHead} >현재 포인트</div>
            <div className={Style.PointIcon}><MdControlPoint /> <span>{pointStatus} P</span></div>
          </div>

          <div className={Style.PointCharOption_container}>
            <div className={Style.PointBalanceHead} >포인트 충전금액</div>
            <div className={Style.charInput_box}>
              <SelectToggleRect 
                toggleListRect={chargePointList}
                toggleActiveRect={selectedChargePoint}
                onToggleRect={handlerCharPointChange}
              />
            
            <div>
              <input className={Style.ChargeInput}
                    placeholder='충전 포인트를 입력해주세요'
                    type="number"
                    value={chargeInput}
                    onChange={handlerInputChange}
                    onFocus={handlerInputFocus}
              >
              </input>
            </div>
            </div>
          </div>
          
          <div className={Style.PointChar_container}>
            <div className={Style.PointBalanceHead} >결제 수단</div>
            <div className={Style.ChargingWayBox}>
              <div className={Style.ChargingWay}></div>
              <div className={Style.ChargingWay}></div>
            </div>
          </div>

          <div className={Style.PointChar_container}>
            <div className={Style.expectPoint_box}>
              <div>포인트 충전 예상 금액</div>
              <div className={Style.expectPoint_Title}>{pointStatus + selectedChargePoint}P</div>
            </div>

            <div className={Style.BtnBox}>
            {/* <button className={Style.CancelBtn} onClick={()=>setIsCharged(true)} >
              취소
            </button>
            <button className={Style.ChargeBtn}  onClick={handlerCharPoint} >
              충전
            </button> */}
            <EditBtn deleteTxt={"취소"} onDelete={()=>setIsCharged(true)} updateTxt={"충전"} onUpdate={handlerCharPoint}/>
          </div>
          </div>
          
      </div>
      )
    }

    </ProfileImgTmp>
  )
}
export default MyPointPage;