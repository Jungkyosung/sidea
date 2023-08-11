import Style from './CampaignList.module.css';

const CampaignList = ({ campImgSource, campTitle, campOrganizer, campProgress }) => {

    return (
        <>
            <div className={Style.campList}>
                <img className={Style.campImg} src={campImgSource} />
                <div className={Style.campInfo}>
                    <div className={Style.campTitle}>{campTitle}</div>
                    <div className={Style.campOrganizer}>{campOrganizer}</div>
                    <div className={Style.campProgress}>{campProgress}%</div>
                    
                    <div className={Style.campProgressBackBar}>
                        <div className={Style.campProgressFrontBar} style={{ width: `${campProgress}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CampaignList;