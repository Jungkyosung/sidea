import Style from './AdminPage.module.css';
import Menu from '../../UI/atoms/Menu';
import NaviControll from '../../naviControll/NaviControll';
// import { BsPlusCircle } from 'react-icons/bs';
import {  BiMessageSquareAdd } from 'react-icons/bi';
import { MdHeadsetMic, MdOutlineListAlt } from 'react-icons/md';
import { useNavigate } from 'react-router';
import Title from '../../UI/atoms/Title';

const AdminPage = () => { 

  const navigate = useNavigate();

  const locations = {
    campList: "/admin/campaignlist",
    campAdd: "/admin/campaign/add",
    qna: "/admin/qnalist",
    admin: "/admin"
  }

  function handlerMove(location) {
    navigate(location);
  }

  const handlerClickLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    alert('로그아웃 되었습니다')
    window.location.replace(`/`);
  };


  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        
        <div>
          <div className={Style.AdminTitle}>Admin</div>
          <Menu menuArrowClick={()=>handlerMove(locations.campList)} menuTitle={"캠페인 목록"}><MdOutlineListAlt /></Menu>
          <Menu menuArrowClick={()=>handlerMove(locations.campAdd)} menuTitle={"캠페인 등록"}><BiMessageSquareAdd /></Menu>
          <Menu menuArrowClick={()=>handlerMove(locations.qna)} menuTitle={"문의 관리"}><MdHeadsetMic /></Menu>
        </div>
        <div className={Style.AdminChart_box}>
          <div className={Style.AdminStatic}>총 기부된 포인트 통계</div>
          <div className={Style.AdminStatic}>사용자 수</div>
          <div className={Style.AdminStatic}>오늘 적립으로 나간 포인트</div>
          </div>
        <div className={Style.LogoutBtn} onClick={handlerClickLogout}>로그아웃</div>
      </div>
    </NaviControll>
  )
}
export default AdminPage;