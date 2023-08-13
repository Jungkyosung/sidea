import Style from './PointHistory.module.css';

const PointHistory = ({pointDate, pointType, pointAmount, pointBalance}) => {

  //고민 되는 부분 기부면 포인트 - 처리 할 건지 그냥 금액이 -1000이면 -로 처리할 건지??
  //그럼 포인트잔액이 -가 되면 어떻게 처리할 건지???

  function getPointAmount(amount){
    let result;
    let transAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if(amount >= 0){
      return result = "+ " + transAmount; 
    } else {
      return result = "- " + transAmount; 
    }
  }

  function getPointBalance(amount){
    let result;
    let transAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return result = "잔액 " + transAmount; 
  }

  return (
    <div className={Style.PointUsingHistory}>
      <div className={Style.PointUsingDate}>{pointDate}</div>
      <div className={Style.PointUsingType}>{pointType}</div>
      <div className={Style.PointUsingPoint}>
        <div className={Style.PointUsingAmount}>{getPointAmount(pointAmount)}P</div>
        <div className={Style.PointUsingBalance}>{getPointBalance(pointBalance)}P</div>
      </div>
    </div>
  )
}
export default PointHistory;