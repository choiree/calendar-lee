import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import EventList from '../EventList/EventList';
import Time from '../Time/Time';

const StyledDayDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 800px;
`;

function Week({ onOpenDaily }) {
  onOpenDaily(false);
  const current = useSelector(state => state.calendar);
  const thisWeek = [];
  const dates = [];

  for(let i = 0; i < 7; i++) {
    const resultDay =
      new Date(
        current.displayedYear,
        current.displayedMonth - 1,
        current.displayedDate + (i - current.displayedDay),
      );
    let day = resultDay.getDate();

    dates.push(resultDay);
    day = String(day).length === 1 ? '0' + day : day;
    thisWeek[i] = day;
  }

  return (
    <StyledDayDiv>
      <Time />
      <EventList currentDay={thisWeek[0]} day={'SUN'} date={dates[0]}/>
      <EventList currentDay={thisWeek[1]} day={'MON'} date={dates[1]}/>
      <EventList currentDay={thisWeek[2]} day={'TUE'} date={dates[2]}/>
      <EventList currentDay={thisWeek[3]} day={'WED'} date={dates[3]}/>
      <EventList currentDay={thisWeek[4]} day={'THU'} date={dates[4]}/>
      <EventList currentDay={thisWeek[5]} day={'FRI'} date={dates[5]}/>
      <EventList currentDay={thisWeek[6]} day={'SAT'} date={dates[6]}/>
    </StyledDayDiv>
  );
}

export default Week;
