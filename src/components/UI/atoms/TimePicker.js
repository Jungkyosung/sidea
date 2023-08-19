import React, { useEffect, useRef, useState } from 'react';
import Style from './TimePicker.module.css';
import { Swiper } from 'swiper';
import 'swiper/css';

const TimePicker = ({ onPeriod, onHour, onMinute}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [selectedHour, setSelectedHour] = useState('01');
  const [selectedMinute, setSelectedMinute] = useState('00');

  const view1 = useRef(null);
  const view2 = useRef(null);
  const view3 = useRef(null);
  

  const periods = ['AM', 'PM'];
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
  
  // Swiper 초기화 및 해제
  useEffect(() => {
    const mySwiper = new Swiper(`.${Style.swiper_container}`, {
      direction: 'vertical',
      slidesPerView: 3,
      centeredSlides: true,
      slideToClickedSlide: true,
      initialSlide: 1
    });
    
    return () => {
      if (mySwiper) {
        console.log("swiper");
      }
    };
  }, []); // 빈 배열은 처음 마운트 시에만 실행

  const handlePeriodSelect = period => {
    setSelectedPeriod(period);
    onPeriod(period);
  };

  const handleHourSelect = hour => {
    let 총높이 = view2.current.scrollHeight;
    let 이동할y값 = 총높이*hour/12; 
    //스크롤 위치를 빼줘야 하나?
    //빈 시간을 추가해주면 좀더 될 거 같기도?
    console.log(이동할y값);
    view2.current.scrollTo(0,이동할y값-72.6);

    setSelectedHour(hour);
    onHour(hour);
  };

  const handleMinuteSelect = minute => {
    let 총높이 = view3.current.scrollHeight;
    let 이동할y값 = 총높이*minute/12; 
    
    console.log(이동할y값);
    view3.current.scrollTo(0,이동할y값-330);

    setSelectedMinute(minute);
    onMinute(minute);
  };

  return (
    <div className={Style.time_picker}>
      {/* <div className="time-display">
        <span className="selected-time">
          <span className="selected-hour">{selectedHour}:</span>
          <span className="selected-minute">{selectedMinute}</span>
          <span className="selected-period">{selectedPeriod}</span>
        </span>
      </div> */}

      <div className={Style.options}>

        {/* Swiper 컨테이너 */}
        <div className={`${Style.swiper_container} swiper-container`}>
          <div ref={view1} className={`${Style.swiper_wrapper} swiper-wrapper`}>
              {periods.map(period => (
                <div key={period} className={`${Style.swiper_slide} swiper-slide`}>
                  <button
                    key={period}
                    className={`period-option ${selectedPeriod === period ? Style.selected : ''}`}
                    onClick={() => handlePeriodSelect(period)}
                  >
                    {period}
                  </button>
                </div>
              ))}
          </div>
        </div>
        {/* Hours */}
        <div className={`${Style.swiper_container} swiper-container`}>
          <div ref={view2} className={`${Style.swiper_wrapper} swiper-wrapper`}>
              {hours.map(hour => (
                <div key={hour} className={`swiper-slide ${Style.swiper_slide}`}>
                  <button
                    // key={hour}
                    className={`hour-option ${selectedHour === hour ? Style.selected : ''}`}
                    onClick={() => handleHourSelect(hour)}
                  >
                  {hour}
                  </button>
                </div>
              ))}
          </div>
        </div>
        {/* Minutes */}
        <div className={`${Style.swiper_container} swiper-container`}>
          <div ref={view3} className={`${Style.swiper_wrapper} swiper-wrapper`}>
            {minutes.map(minute => (
              <div key={minute} className={`swiper-slide ${Style.swiper_slide}`}>
                <button key={minute}
                  className={`minute-option ${selectedMinute === minute ? Style.selected : ''}`}
                  onClick={() => handleMinuteSelect(minute)}
                >
                  {minute}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TimePicker;





