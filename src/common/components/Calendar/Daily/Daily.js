import React from 'react';
import styled from 'styled-components';
import Time from '../Time/Time';
import EventList from '../EventList/EventList';
import { useSelector } from 'react-redux';

const StyledDayDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 200px;
`;

function Daily({ onOpenDaily }) {
  onOpenDaily(true);

  const currentDay = useSelector(state => state.calendar);
  const day = currentDay.displayedDay;
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <StyledDayDiv>
      <Time />
      <EventList currentDay={currentDay.displayedDate} day={week[day]} date={currentDay.currentDate}/>
    </StyledDayDiv>
  );
}

export default Daily;
