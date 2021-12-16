import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import store from '../../../../app/configureStore';
import Row from '../Row/Row';

const StyledDayDiv = styled.div`
  width: 40px;
  line-height: 40px;
  text-align: center;
  border: 3px solid blue;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const StyledTimeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
`;

function EventList({ currentDay, day, date }) {
  const history = useHistory();

  const dateString = date.toLocaleString().substring(0,12).replaceAll(' ', '');
  const eventArr = store.getState().event.byDate[dateString];
  let eventList = [];

  if (eventArr) {
    eventList = eventArr.map((item) => store.getState().event.byIds[item]);
  }

  return (
    <StyledTimeDiv>
      <div>
        <div>{day}</div>
        <StyledDayDiv>{currentDay}</StyledDayDiv>
      </div>
      {Array.from(Array(24).keys()).map((hour) => (
        <Row
          key={hour}
          hour={hour}
          day={currentDay}
          eventList={eventList}
          eventArr={eventArr}
          dateString={dateString}
          onClick={() => {history.push(`/events/new?time=${hour}`)}}
        />
      ))}
    </StyledTimeDiv>
  );
}

export default EventList;