import Style from './AskList.module.css';
import {BiComment} from 'react-icons/bi';
import {BiSolidComment} from 'react-icons/bi';

const AskList = ({askNumber, askTitleClick, askTitle, askIsCommented}) => {

    return (
        <>
            <div className={Style.askListWrap}>
                <div className={Style.askNumber}>{askNumber}</div>
                <div onClick={askTitleClick} className={Style.askTitle}>{askTitle}</div>
                {askIsCommented ?
                    <div className={Style.askCommentIcon}><BiSolidComment/></div> :
                    <div className={Style.askCommentIcon}><BiComment/></div>
                }
            </div>
        </>
    )
}
export default AskList;