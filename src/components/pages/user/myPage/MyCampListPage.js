import Style from './MyCampListPage.module.css';
import CampaignList from '../../../UI/atoms/CampaignList';
import ProfileImgTmp from '../../../templates/ProfileImgTmp';
import { useState } from 'react';

const MyCampListPage = () => {

  const [profileInfo, setProfileInfo] = useState({
    profileImgSrc: "https://i.pinimg.com/564x/84/62/80/846280899168e1abab5a6cd0d6e03dcf.jpg",
    profileText: "닉네임"
  });

  //임시 데이터
  const campProperties = {
    campImgSource: "https://i.pinimg.com/564x/73/61/13/736113f91b9513418f1f8af1bdb2e00c.jpg",
    campTitle: "camp타이틀",
    campOrganizer: "camp주최자",
    campProgress: 20
  }

  return (
    <ProfileImgTmp profileImgSrc={profileInfo.profileImgSrc} profileText={profileInfo.profileText}>
      <div className={Style.CampHead} >참여한 기부</div>
      <div className={Style.CampListBox}>
        <CampaignList 
          campImgSource={campProperties.campImgSource} 
          campTitle={campProperties.campTitle} 
          campOrganizer={campProperties.campOrganizer} 
          campProgress={campProperties.campProgress} />
        <CampaignList 
          campImgSource={campProperties.campImgSource} 
          campTitle={campProperties.campTitle} 
          campOrganizer={campProperties.campOrganizer} 
          campProgress={campProperties.campProgress} />
        <CampaignList 
          campImgSource={campProperties.campImgSource} 
          campTitle={campProperties.campTitle} 
          campOrganizer={campProperties.campOrganizer} 
          campProgress={campProperties.campProgress} />
        <CampaignList 
          campImgSource={campProperties.campImgSource} 
          campTitle={campProperties.campTitle} 
          campOrganizer={campProperties.campOrganizer} 
          campProgress={campProperties.campProgress} />
        <CampaignList 
          campImgSource={campProperties.campImgSource} 
          campTitle={campProperties.campTitle} 
          campOrganizer={campProperties.campOrganizer} 
          campProgress={campProperties.campProgress} />
        <CampaignList 
          campImgSource={campProperties.campImgSource} 
          campTitle={campProperties.campTitle} 
          campOrganizer={campProperties.campOrganizer} 
          campProgress={campProperties.campProgress} />
      </div>
    </ProfileImgTmp>
  )
}
export default MyCampListPage;