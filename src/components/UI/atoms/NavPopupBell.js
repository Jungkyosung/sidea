import Style from './NavPopupBell.module.css';
import { PiTriangleFill } from 'react-icons/pi';
import { TbSpeakerphone } from 'react-icons/tb';
import { BsPCircle } from 'react-icons/bs';


const NavPopupBell = () => {

  const bells = [
    {
      id: 1,
      bellType: 1,
      bellCont: "투두 제목11을/를 시작할 시간입니다!"
    },
    {
      id: 2,
      bellType: 2,
      bellPointType: 1,
      bellPoint: +2000,
      bellCont: ""
    },
    {
      id: 3,
      bellType: 2,
      bellPointType: 2,
      bellPoint: +1000,
      bellCont: ""
    },
    {
      id: 4,
      bellType: 2,
      bellPointType: 3,
      bellPoint: -100,
      bellCont: ""
    }
  ]

  function getPointTypeLine(type, pointValue) {
    switch (type) {
      case 1:
        return <span><span className={Style.NavPopupBellPointUp}>+{pointValue}P</span>가 충전되었습니다!</span>
      case 2:
        return <span><span className={Style.NavPopupBellPointUp}>+{pointValue}P</span>가 적립되었습니다!</span>
      case 3:
        return <span><span className={Style.NavPopupBellPointDown}>{pointValue}P</span>가 기부되었습니다!</span>
    }
  }

  return (
    <>
      <div className={Style.NavPopupBellTriangle}>
        <PiTriangleFill />
      </div>
      <div className={Style.NavPopupBellBox}>

        {bells.map(bell => (
          <div className={Style.NavPopupBellLine}>
            {bell.bellType == 1 ?
              <>
                <div className={Style.NavPopupBellIcon}>
                  <TbSpeakerphone />
                </div>
                <div className={Style.NavPopupBellCont}>
                  {bell.bellCont}
                </div>
              </>
              :
              <>
                <div className={Style.NavPopupBellIcon}>
                  <BsPCircle />
                </div>
                <div className={Style.NavPopupBellCont}>
                  {getPointTypeLine(bell.bellPointType, bell.bellPoint)}
                </div>
              </>
            }
          </div>
        ))
        }
      </div>
    </>
  )
}
export default NavPopupBell;