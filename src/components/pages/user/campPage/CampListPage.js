import Title from "../../../UI/atoms/Title";
import Style from "./CampListPage.module.css";
import NaviControll from "../../../naviControll/NaviControll";
import CampaignList from "../../../UI/atoms/CampaignList";
import { useNavigate } from "react-router";

const CampListPage = () => {

  const navigate = useNavigate();

  function handlerNavi(id){
    let location = '/campaign/' + id;
    navigate(location);
  }

  const titleProperties = {
    titleName: "캠페인"
  }

  const campProperties = [
    {
      campId : 1,
    campImgSource: "https://i.pinimg.com/564x/73/61/13/736113f91b9513418f1f8af1bdb2e00c.jpg",
    campTitle: "camp타이틀",
    campOrganizer: "camp주최자",
    campProgress: 20
    },
    {
      campImgSource: "https://i.pinimg.com/564x/73/61/13/736113f91b9513418f1f8af1bdb2e00c.jpg",
      campTitle: "camp타이틀",
      campOrganizer: "camp주최자",
      campProgress: 20
    },
    {
      campImgSource: "https://i.pinimg.com/564x/73/61/13/736113f91b9513418f1f8af1bdb2e00c.jpg",
      campTitle: "camp타이틀",
      campOrganizer: "camp주최자",
      campProgress: 20
    },
    {
      campImgSource: "https://i.pinimg.com/564x/73/61/13/736113f91b9513418f1f8af1bdb2e00c.jpg",
      campTitle: "camp타이틀",
      campOrganizer: "camp주최자",
      campProgress: 20
    },
    {
      campImgSource: "https://i.pinimg.com/564x/73/61/13/736113f91b9513418f1f8af1bdb2e00c.jpg",
      campTitle: "camp타이틀",
      campOrganizer: "camp주최자",
      campProgress: 20
    },
    {
      campImgSource: "https://i.pinimg.com/564x/73/61/13/736113f91b9513418f1f8af1bdb2e00c.jpg",
      campTitle: "camp타이틀",
      campOrganizer: "camp주최자",
      campProgress: 20
    },
    {
      campImgSource: "https://i.pinimg.com/564x/73/61/13/736113f91b9513418f1f8af1bdb2e00c.jpg",
      campTitle: "camp타이틀",
      campOrganizer: "camp주최자",
      campProgress: 20
    },
    {
      campImgSource: "https://i.pinimg.com/564x/73/61/13/736113f91b9513418f1f8af1bdb2e00c.jpg",
      campTitle: "camp타이틀",
      campOrganizer: "camp주최자",
      campProgress: 20
    },
    {
      campImgSource: "https://i.pinimg.com/564x/73/61/13/736113f91b9513418f1f8af1bdb2e00c.jpg",
      campTitle: "camp타이틀",
      campOrganizer: "camp주최자",
      campProgress: 20
    }
  ]

  return (
    <>
      <NaviControll>
        <div className={Style.container}>
          <Title titleName={titleProperties.titleName} />
          
          <div className={Style.listbox}>
            <div className={Style.scrollbox}>
              {campProperties.map(camplist => (
                <CampaignList
                campClick={()=>handlerNavi(camplist.campId)}
                campImgSource={camplist.campImgSource}
                campTitle={camplist.campTitle}
                campOrganizer={camplist.campOrganizer}
                campProgress={camplist.campProgress}
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