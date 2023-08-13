import React, { useEffect, useState } from 'react';
import Style from './TimePicker.module.css';
import { Swiper } from 'swiper';

const TimePicker = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [selectedHour, setSelectedHour] = useState('01');
  const [selectedMinute, setSelectedMinute] = useState('00');

  const periods = ['AM', 'PM'];
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

  // Swiper 초기화 및 해제

  useEffect(() => {
    const mySwiper = new Swiper(`.${Style.swiper_container}`, {
      direction: 'vertical',
      loop: true,
      className:'h-40',
      // loopAdditionalSildes: 5,
      slidesPerView: 3,
      slideToClickedSlide: true,
      scrollbar:{
        hide: true
      },
      


      
    });
    
    return () => {
      if (mySwiper) {
        console.log("swiper");
      }
    };
  }, []); // 빈 배열은 처음 마운트 시에만 실행

  const handlePeriodSelect = period => {
    setSelectedPeriod(period);
  };

  const handleHourSelect = hour => {
    setSelectedHour(hour);
  };

  const handleMinuteSelect = minute => {
    setSelectedMinute(minute);
  };

  

  return (
    <div className="time-picker">
      <div className="time-display">
        <span className="selected-time">
          <span className="selected-hour">{selectedHour}:</span>
          <span className="selected-minute">{selectedMinute}</span>
          <span className="selected-period">{selectedPeriod}</span>
        </span>
      </div>
      <div className={Style.options}>

        {/* Swiper 컨테이너 */}
        <div className={`${Style.swiper_container} swiper-container`}>
          {/* Swiper 슬라이드 */}
          <div className={`${Style.swiper_wrapper} swiper-wrapper`}>
            {/* Periods */}
            <div className={`${Style.period} swiper-slide`}>
              {periods.map(period => (
                <button
                  key={period}
                  className={`period-option ${selectedPeriod === period ? 'selected' : ''}`}
                  onClick={() => handlePeriodSelect(period)}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className={`${Style.swiper_container} swiper-container`}>
          <div className={`${Style.swiper_wrapper} swiper-wrapper`}>
            <div className={`swiper-slide ${Style.slide}`}>
              {hours.map(hour => (
                
                  <div className={Style.hour}>
                  <button
                  key={hour}
                  className={`hour-option ${selectedHour === hour ? 'selected' : ''}`}
                  onClick={() => handleHourSelect(hour)}
                >
                  {hour}
                </button>
                </div>
                
              ))}
            </div>
          </div>
        </div>
        {/* Minutes */}
        <div className={`${Style.swiper_container} swiper-container`}>
          <div className={`${Style.swiper_wrapper} swiper-wrapper`}>
            <div className={`swiper-slide ${Style.minute}`}>
              {minutes.map(minute => (
                <div>
                  <button
                  key={minute}
                  className={`minute-option ${selectedMinute === minute ? 'selected' : ''}`}
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
    </div>
  );
};

export default TimePicker;





