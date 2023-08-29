import Style from './CampaignList.module.css';

const CampaignList = ({campClick, campImgSource, campTitle, campOrganizer, campProgress, campEnddate }) => {

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);  
        return `${year}.${month}.${day}`;
      };

    const today = new Date();
    const endDate = new Date(campEnddate);
    endDate.setDate(endDate.getDate() + 1);

    const status = formatDate(endDate) >= formatDate(today) ? "진행중" : "완료";
    
    return (
        <>
            <div className={Style.campList} onClick={campClick}>
                <img className={Style.campImg} src={campImgSource} />
                <div className={Style.campInfo}>
                    <div className={Style.campTitle}>{campTitle}</div>
                    <div className={Style.campOrganizer}>{campOrganizer}</div>
                    <div className={Style.campProgress}>
                        <div>{campProgress}%</div>
                        <div>{status}</div>
                    </div>
                    <div className={Style.campProgressBackBar}>
                        <div className={Style.campProgressFrontBar} style={{ width: `${campProgress}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CampaignList;