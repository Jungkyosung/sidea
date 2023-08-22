import React, { useState, useMemo, useEffect } from 'react';
import Style from './Calendar.module.css'
import Year from "react-live-clock";
import Month from "react-live-clock";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Calendar = (props) => {

  const handleDateClick = props.handleDateClick;
  const selectedDate = props.selectedDate;
  const setSelectedDate = props.setSelectedDate;
  // const daysOfWeek = props.daysOfWeek;
  
  const now = new Date();
  // const [today] = useState(now.getDate());
  // const [selectedDate, setSelectedDate] = useState(today);

  const getThisWeekDates = (selectedDate) => {
    const currentDay = new Date(now.getFullYear(), now.getMonth(), selectedDate).getDay();
    const weekStart = selectedDate - currentDay;
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      weekDates.push({
        date: weekStart + i,
        month: now.getMonth()
      });
    }

    return weekDates;
  };

  const thisWeekDates = useMemo(() => getThisWeekDates(selectedDate), [selectedDate]);

  const daysOfWeekStr = {
    1: 'Sun',   // 수정.
    2: 'Mon',
    3: 'Tue',
    4: 'Wed',
    5: 'Thu',
    6: 'Fri',
    7: 'Sat'
  };

  const daysOfWeek = props.daysOfWeek.map(dayNumber => daysOfWeekStr[dayNumber]);

  // const getDayOfWeek = (year, month, day) => {
  //   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  //   const date = new Date(year, month - 1, day);
  //   return daysOfWeek[date.getDay()];
  // };

  // const handleDateClick = (date) => {
  //   setSelectedDate(date);
  // };

  const handlePreviousWeek = () => {
    setSelectedDate(selectedDate - 7);
  };

  const handleNextWeek = () => {
    setSelectedDate(selectedDate + 7);
  };

  // useEffect(() => {
  //   const updatedThisWeekDates = getThisWeekDates(selectedDate);
  // }, [selectedDate]);

  return (
    <>
      <div className={Style.Year_Month}>
        <span>
          <Year 
            id="Year"
            format={"YYYY"}
            ticking={false}
            timezone={"Asia/Seoul"}
          />.
        </span>
        <span>
        {new Date(now.getFullYear(), now.getMonth(), thisWeekDates[0].date).getMonth() + 1}
        </span>
      </div>
      
      <div className={Style.datebox}>
        <MdKeyboardArrowLeft className={Style.arrow} onClick={handlePreviousWeek} />
        {thisWeekDates.map(({ date }, index) => {
          const currentDate = new Date(now.getFullYear(), now.getMonth(), date);
          
          const currentDayOfWeek = daysOfWeek[index]; 
          const dayStyle = `${Style.dayText} ${currentDayOfWeek === 'Sun' ? Style.Sun : ''} ${currentDayOfWeek === 'Sat' ? Style.Sat : ''}`;
          
          return (
            <div
              className={date === selectedDate ? Style.SelectedDay : Style.day}
              key={date}
              onClick={() => handleDateClick(date, currentDayOfWeek)}
            >
              <div className={dayStyle}>
                {currentDayOfWeek}
              </div>
              <div>{currentDate.getDate()}</div>
            </div>
          );
        })}
        <MdKeyboardArrowRight className={Style.arrow} onClick={handleNextWeek} />
      </div>
    </>
  );
};

export default Calendar;