import React from 'react';
import styled from 'styled-components';
import store from '../../../../app/configureStore';
import Time from '../Time/Time';
import EventList from '../EventList/EventList';

const StyledDayDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 200px;
`;

function Daily({ onOpenDaily }) {
  onOpenDaily(true);

  const currentDay = store.getState().calendar;
  const day = store.getState().calendar.displayedDay;
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <StyledDayDiv>
      <Time />
      <EventList currentDay={currentDay.displayedDate} day={week[day]} date={currentDay.currentDate}/>
    </StyledDayDiv>
  );
}

export default Daily;
