import Style from './PointHistory.module.css';

const PointHistory = ({pointDate, pointType, pointAmount, pointBalance}) => {

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