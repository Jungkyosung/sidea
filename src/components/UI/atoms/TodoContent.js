import Style from './TodoContent.module.css';
import { FaRegCheckCircle, FaCheckCircle, FaBell, FaBellSlash } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const TodoContent = ({ todoFinishCheck, todoTitle, todoHasAlarm, todoDelete, todoidx, todoClick }) => {

    //완료체크에 따라서 다르게
    //알림여부에 따라서 알림 모양이랑 x알림 모양
    //

    return (
        <>

            {todoFinishCheck ?
                <div className={Style.todoContentWrapTrue} key={todoidx} onClick={todoClick}>
                    <div className={Style.todoFinishCheckTrue}>
                        <FaCheckCircle />
                    </div>
                    <div className={Style.todoContentTitle}>{todoTitle}</div>
                    <div className={Style.todoContentRight}>
                    </div>

                </div>
                :
                <div className={Style.todoContentWrapFalse} key={todoidx} onClick={todoClick}>
                    <div className={Style.todoFinishCheckFalse}>
                        <FaRegCheckCircle />
                    </div>
                    <div className={Style.todoContentTitle}>{todoTitle}</div>
                    <div className={Style.todoContentRight}>
                        <div className={Style.todoContentBell}>
                            {todoHasAlarm ?
                                <FaBell /> :
                                <FaBellSlash />
                            }
                        </div>
                        <div className={Style.todoContentDelete}>
                            <MdDeleteForever onClick={todoDelete}/>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}
export default TodoContent;