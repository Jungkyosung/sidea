import Style from './AdminCampAddPage.module.css';
import Input from '../../UI/atoms/Input';
import NaviControll from '../../naviControll/NaviControll';
import DoBtn from '../../UI/atoms/btn/DoBtn';

const AdminCampEditPage = () => {


  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
        <div className={Style.AdminTitle}>캠페인 수정</div>
        <div className={Style.InputBox}>
          <Input inputPlaceholder={"캠페인 제목을 입력하세요"} />
        </div>
        <div className={Style.InputBox}>
          <Input inputPlaceholder={"캠페인 주관처를 입력하세요"} />
        </div>
        <div className={Style.InputBox}>
          <Input inputPlaceholder={"기간을 설정하세요"} />
        </div>
        <div className={Style.InputBox}>
          <Input inputPlaceholder={"목표 포인트를 입력하세요"} />
        </div>
        <div className={Style.FileAdd}>
          <div className={Style.FileAddInput}>
            <div>이미지등록(500x500px, 1MB 이하)</div>
            <label htmlFor='campImg'>파일첨부</label>
          </div>
          <input id='campImg' className={Style.InputImg} type='file' name='campImg' />
          <img className={Style.InputImgView} src="http://placehold.it/235x235" />
        </div>
        <div>
          <img></img>
        </div>
        <DoBtn doText={"수정하기"} />
      </div>
    </NaviControll>
  )
}
export default AdminCampEditPage;