import Style from './Title.module.css';

const Title = ({titleName}) => {
    return (
        <>
            <div className={Style.titleName}>{titleName}</div>
        </>
    )
}
export default Title;