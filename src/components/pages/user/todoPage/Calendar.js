import React, { useState, useMemo, useEffect } from 'react';
import Style from './Calendar.module.css'
import Year from "react-live-clock";
import Month from "react-live-clock";

const Calendar = () => {
  const now = new Date();
  const [today] = useState(now.getDate());
  const [selectedDate, setSelectedDate] = useState(today);

  const getThisWeekDates = (selectedDate) => {
    const currentDay = new Date(now.getFullYear(), now.getMonth(), selectedDate).getDay();
    const weekStart = selectedDate - currentDay;
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      weekDates.push(weekStart + i);
    }

    return weekDates;
  };

  const thisWeekDates = useMemo(() => getThisWeekDates(selectedDate), [selectedDate]);

  const getDayOfWeek = (year, month, day) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(year, month - 1, day);
    return daysOfWeek[date.getDay()];
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handlePreviousWeek = () => {
    setSelectedDate(selectedDate - 7);
  };

  const handleNextWeek = () => {
    setSelectedDate(selectedDate + 7);
  };

  useEffect(() => {
    const updatedThisWeekDates = getThisWeekDates(selectedDate);
  }, [selectedDate]);

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
          {new Date(now.getFullYear(), now.getMonth(), thisWeekDates[0]).getMonth() + 1}
        </span>
      </div>
      
      <div className={Style.datebox}>
        <button onClick={handlePreviousWeek}>전</button>
        {thisWeekDates.map((weekday) => {
          const currentDate = new Date(now.getFullYear(), now.getMonth(), weekday); 
          const dayStyle = `${Style.dayText} ${weekday % 7 === 6 ? Style.Sun : ''} ${weekday % 7 === 5 ? Style.Sat : ''}`;
          
          return (
            <div className={ weekday === selectedDate ? Style.SelectedDay : Style.day }
              key={weekday}
              onClick={() => handleDateClick(weekday)} 
            >
              <div className={dayStyle}>
                {getDayOfWeek(now.getFullYear(), now.getMonth() + 1, weekday)}
              </div>
              <div>{currentDate.getDate()}</div> 
            </div>
          );
        })}
        <button onClick={handleNextWeek}>후</button>
      </div>
    </>
  );
};

export default Calendar;