import Title from "../../../UI/atoms/Title";
import Style from "./CampListPage.module.css";
import NaviControll from "../../../naviControll/NaviControll";
import CampaignList from "../../../UI/atoms/CampaignList";
import { useNavigate } from "react-router";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

const CampListPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  function handlerNavi(id){
    console.log(id);
    // let location = '/campaign/' + id;
    navigate(`/campaign/${id}`);
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    let userId = decode_token.sub;

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/donation`,
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

  const titleProperties = {
    titleName: "캠페인"
  }


  // const campProperties = data.map(camp => ({
  //   campId: camp.donationIdx,
  //   campImgSource: "https://i.pinimg.com/564x/73/61/13/736113f91b9513418f1f8af1bdb2e00c.jpg",
  //   campTitle: camp.donorName,
  //   campOrganizer: camp.donorIdx,
  //   campProgress: parseInt((camp.donationTargetAmount / camp.donationAmount) * 100)
  // }));

  return (
    <>
      <NaviControll>
        <div className={Style.container}>
          <Title titleName={titleProperties.titleName} />
          
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
export default CampListPage;