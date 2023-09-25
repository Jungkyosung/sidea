import Style from './AdminCampAddPage.module.css';
import Input from '../../UI/atoms/Input';
import NaviControll from '../../naviControll/NaviControll';
import DoBtn from '../../UI/atoms/btn/DoBtn';
import Title from '../../UI/atoms/Title';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AdminCampDatepickr.css';
import { ko } from "date-fns/esm/locale";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AdminCampEditPage = () => {
  const { state } = useLocation();
  const data = state.data;
  console.log(data);

  
  const donationStart = new Date (data.donationDate);
  const donationEnd = new Date (data.donationDuration);
  // const campThumnail = data.donorImage;
 
  // 초기 설정
  useEffect(() => {
    setCampTitle(data.donationName);
    setTargetPoint(data.donationTargetAmount);
    setDateRange([donationStart, donationEnd]);
    setCampImg(data.donorImage);
    setDonorIdx(data.donorIdx);
    

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/donor`)
      .then((res) => {
        console.log(res.data);
        setDonor(res.data);
      })
      .catch((error) => console.log(error));
  },[])

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [campTitle, setCampTitle] = useState('');
  const [targetPoint, setTargetPoint] = useState('');
  const [campImg, setCampImg] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [donor, setDonor] = useState([]);
  const [donorIdx, setDonorIdx] = useState('');

  console.log(campImg)
  const handlerCamptitle = (e) => { setCampTitle(e.target.value) };
  const handleChangeDonor = (e) => {setDonorIdx(e.target.value)};
  const handlerTargetPoint = (e) => { 
    const pointValue = e.target.value;
    const numberPointValue = pointValue.replace(/[^\d]/g, '');
    const formatPoint = numberPointValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    setTargetPoint(formatPoint);
  };


  const handleChangeFile = e => {
    const name = e.target.name;
    // input type file에서 name에 해당
    const files = e.target.files;
    // input type file에서 선택된 file 정보

    // 이미지 미리보기를 위한 로직
    if (e.target.name == 'campImg') {
        const imageArr = e.target.files;
        let imageURLs = [];
        let image;
        let imagesLength = imageArr.length > 6 ? 6 : imageArr.length;

        for (let i = 0; i < imagesLength; i++) {
            image = imageArr[i];

            const reader = new FileReader();
            reader.onload = () => {
                imageURLs[i] = reader.result;
                setCampImg([...imageURLs]);
            };
            reader.readAsDataURL(image);
        }
    }
    // 변경되지 않은 {이름, 파일 정보}를 담고 있는 변수
    const unchangedImageFiles = imageFiles.filter(file => file.name !== name)
    setImageFiles([...unchangedImageFiles, { name, files }]);
  };

  
  let datas = {
    donorIdx : donorIdx,
    donationTargetAmount : targetPoint,
    donationDate : startDate,
    donationDuration : endDate,
    donationName : campTitle,
    donorImage : campImg
  };

  const formData = new FormData();
  formData.append('data', JSON.stringify(datas)); 

  // 이미지 파일을 추가
  imageFiles.forEach(fileObj => {
    const { name, files } = fileObj;
    for (const file of files) {
      formData.append(name, file);
    }
  });

  const handlerClickEdit = () => {

    axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/donation`, 
      formData, 
      { headers: {
            'Content-Type': 'multipart/form-data;',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }}
    )
        .then(res => {
          console.log(res);
            alert("sucess")
        })

        .catch(err => {
          if (err.response) {
            // 요청은 성공했지만 서버에서 오류 응답을 보낸 경우
            console.error('서버 응답 오류:', err.response.data);
          } else if (err.request) {
            // 요청이 전송되지 않은 경우 (네트워크 문제 등)
            console.error('요청 전송 실패:', err.request);
          } else {
            // 기타 오류
            console.error('오류:', err.message);
          }
            
        })
  };

  return (
    <NaviControll>
      <div className={Style.ContentsWrap}>
      <Title titleName={"캠페인 수정"} />

        <div className={Style.input_container}>
          <div className={Style.InputBox}>
            <Input inputPlaceholder={"캠페인 제목을 입력하세요"}
              inputValue={campTitle}
              inputHandler={handlerCamptitle}
            />
          </div>
          {/* <div className={Style.InputBox}>
              <select className={Style.donorDropbox} id="category" name="category" value={donorIdx} onChange={handleChangeDonor}>
                {
                  donor.map((donorOption) => (
                    <option className="option-category" key={donorOption.donorIdx} value={donorOption.donorIdx}>
                      {donorOption.donorName}
                    </option>
                  ))
                }
              </select>
          </div> */}
          <div className={Style.InputBox}>
              <div className={Style.select_box} >
              <select className={Style.donorDropbox} id="category" name="category" onChange={handleChangeDonor}>
                { 
                  donor.map((donorOption, id) => (
                    <option className={`option-category ${Style.option}`} key={id} value={donorOption.donorIdx}>
                      {donorOption.donorName}
                    </option>
                  ))
                }
              </select>
            </div>  
          </div>

          <div className={Style.InputBox}>
            <DatePicker
              className={Style.datepicker}
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
              placeholderText="기간을 입력해주세요."
              locale={ko}
              dateFormat="yy.MM.dd"
            />
          </div>
          <div className={Style.InputBox}>
            <label className={Style.pointBox}>
              <Input inputPlaceholder={"목표 포인트를 입력하세요"} 
                inputValue={targetPoint}
                inputHandler={handlerTargetPoint}
              />
              <span>P</span>
            </label>
          </div>
          <div className={Style.FileAdd}>
            <div className={Style.FileAddInput}>
              <div>이미지등록 (500x500px, 1MB 이하)</div>
              <label htmlFor='campImg'>파일첨부</label>
            </div>
            <input id='campImg' type='file' name='campImg' accept="image/*" onChange={handleChangeFile}/>
            <div className={Style.campImgBox}>
              {/* {campImg &&
                campImg.map((image, id) => (
                  <img key={id} src={image} className={Style.InputImgView} />  
                ))} */}
                {/* {campImg && campImg.map((image, id) => (
                  <img key={id} src={image} className={Style.InputImgView} />  
))} */}
              <img src={campImg} className={Style.InputImgView} />       
            </div>
          </div>
        </div>

        <div className={Style.Dobtn}>
        <DoBtn doText={"수정하기"} doOnClick={handlerClickEdit}/>
        </div>
      </div>
    </NaviControll>
  )
}
export default AdminCampEditPage;