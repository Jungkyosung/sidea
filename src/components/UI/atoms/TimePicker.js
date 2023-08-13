import React, { useState, useRef, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import './TimePicker.css'

const TimePicker = () => {
  const [ampmIndex, setAmpmIndex] = useState(0);
  const [hourIndex, setHourIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const datetime = new Date();
    let hour = datetime.getHours();
    let ampm = 0; //'am'
    
    if (hour === 0) {
      ampm = 1; //'pm'
    } else if (hour >= 13) {
      hour -= 12;
      ampm = 1; //'pm'
    }

    setHourIndex(hour - 1);
    setAmpmIndex(ampm);
    
    const hoursSwiper = new Swiper('.swiper-container.hours', {
      initialSlide: hour - 1,
      ...defaults
    });
    
    const ampmSwiper = new Swiper('.swiper-container.ampm', {
      initialSlide: ampm,
      ...defaultsAMPM
    });
    
    return () => {
      hoursSwiper.destroy();
      ampmSwiper.destroy();
    };
  }, []);

  const handleUpdateInput = () => {
    if (!inputRef.current) {
      return;
    }
    
    const am = ampmIndex === 0 ? 0 : 12;
    const inputValue = parseInt(am) + parseInt(pad(hourIndex + 1));
    inputRef.current.value = inputValue;
    inputRef.current.setSelectionRange(0, inputValue.length);
  };

  const pad = v => (v > 9 ? v : '0' + String(v));


  return (
    <div className="container">
      <div className="header">
        <div className="title">시간 선택</div>
        
      </div>
      <div className="picker">
        <div className="swiper-container ampm">
          <div className="swiper-wrapper ampm_box">
            <div className="ampm swiper-slide" onClick={() => setAmpmIndex(0)}>
              오전
            </div>
            <div className="ampm swiper-slide" onClick={() => setAmpmIndex(1)}>
              오후
            </div>
          </div>
        </div>
        <div className="swiper-container hours">
          <div className="swiper-wrapper">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                className={`time swiper-slide ${hourIndex === idx ? 'active' : 'active'}`}
                onClick={() => setHourIndex(idx)}
                key={idx}
              >
                {pad(idx + 1)}시
              </div>
            ))}
          </div>
        </div>
        <div className="vizor"></div>
      </div>
      <input
        id="time"
        ref={inputRef}
        type="text"
        readOnly
        onFocus={handleUpdateInput}
      />
    </div>
  );
};

export default TimePicker;

const defaults = {
  autoHeight: true,
  pagination: '.swiper-pagination',
  slidesPerView: 4,
  freeMode: true,
  freeModeSticky: true,
  freeModeMomentumRatio: 0.25,
  freeModeVelocityRatio: 0.25,
  freeModeMinimumVelocity: 0.1,
  mousewheelControl: true, // 휠 움직임을 스와이퍼 조작에 사용
  mousewheelSensitivity: 0.5,
  loop: true,
  loopAdditionalSlides: 5,
  direction: 'vertical',
  slideToClickedSlide: true, 
  centeredSlides: true,
};

const defaultsAMPM = {
  autoHeight: true,
  pagination: '.swiper-pagination',
  slidesPerView: 4,
  freeMode: true,
  freeModeSticky: true,
  freeModeMomentumRatio: 0.25,
  freeModeVelocityRatio: 0.25,
  freeModeMinimumVelocity: 0.1,
  mousewheelControl: true, // 휠 움직임을 스와이퍼 조작에 사용
  mousewheelSensitivity: 0.5,
  loop: false,
  loopAdditionalSlides: 5,
  direction: 'vertical',
  slideToClickedSlide: true, 
  centeredSlides: true,
};