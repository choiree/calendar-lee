import React from 'react';
import styled from 'styled-components';
import store from '../../../../app/configureStore';
import Row from '../Row/Row';

const StyledDayDiv = styled.div`
  width: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid blue;
  border-radius: 5px;
  margin-bottom: 20px;
`;

function Daily({ onOpenDaily }) {
  onOpenDaily(true);
  const currentDay = store.getState().calendar;
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <>
      <div>{week[currentDay.displayedDay]}</div>
      <StyledDayDiv>{currentDay.displayedDate}</StyledDayDiv>
      <table>
        <thead>
          <tr>
            <td>Time</td>
            <td>Event</td>
          </tr>
        </thead>
        <tbody>
          {Array.from(Array(24).keys()).map((hour) => (
            <>
              <tr>
                <td>{`${hour}:00 - ${hour + 1}:00`}</td>
                <td><Row /></td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Daily;
