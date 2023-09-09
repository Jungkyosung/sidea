import Style from './AdminCampListPage.module.css';
import { useNavigate } from 'react-router';
import CampaignList from '../../UI/atoms/CampaignList';
import Title from '../../UI/atoms/Title';
import NaviControll from '../../naviControll/NaviControll';
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { BiMessageSquareAdd} from 'react-icons/bi';

const AdminCampListPage = () => {
  const [data, setData] = useState([]);
  
  const navigate = useNavigate();
  function handlerNavi(id){
    navigate(`/admin/campaign/${id}`);
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    let userId = decode_token.sub;

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/donation/list`,
      { params: { userId: encodeURI(userId) },
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      })
        .then(res => {
          console.log(res.data);
          setData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
  }, []);


  return (
    <>
      <NaviControll>
        <div className={Style.container}>
          <Title titleName={"캠페인 목록"} />
          <BiMessageSquareAdd className={Style.addCamp} onClick={()=>navigate(`/admin/campaign/add`)}/>
          <div className={Style.listbox}>
            <div className={Style.scrollbox}>
              {data.map(camplist => (
                <CampaignList
                  key={camplist.donationIdx}
                  campClick={()=>handlerNavi(camplist.donationIdx)}
                  campImgSource={camplist.donorImage}
                  campTitle={camplist.donationName}
                  campOrganizer={camplist.donorName}
                  campProgress={parseInt((camplist.donationAmount / camplist.donationTargetAmount) * 100)}
                  campEnddate={camplist.donationDuration}
                />
              ))}
            </div>
          </div>
        </div>

      </NaviControll>
    </>
  )
}
export default AdminCampListPage;