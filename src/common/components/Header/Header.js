import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { showToday } from '../../../features/calendar';

const StyledNextDateButton = styled.button`
  background: none;
  font-size: 25px;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid orange;
  margin-bottom: 20px;
`;

const StyledDateWrapperDiv = styled.div`
  margin-left: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

// TODO: Create your own header.
export default function Header({ displayDate, onChangePre, onChangeNext, onDailyOpen }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChangeToday = () => {
    const today = new Date();

    dispatch(showToday(today));
    history.push('/calendar');
  };

  const handleDayClick = () => {
    onDailyOpen(true);
  };

  const handleWeekClick = () => {
    onDailyOpen(false);
  };

  return (
    <StyledHeader>
      <nav>
        <ul>
          <li onClick={handleDayClick}><Link to='/calendar'>Daily</Link></li>
          <li onClick={handleWeekClick}><Link to='/week'>Weekly</Link></li>
        </ul>
      </nav>
      <StyledDateWrapperDiv>
        <StyledNextDateButton onClick={onChangePre}>{'<'}</StyledNextDateButton>
        <div>{displayDate}</div>
        <StyledNextDateButton onClick={onChangeNext}>{'>'}</StyledNextDateButton>
      </StyledDateWrapperDiv>
      <button onClick={handleChangeToday}>Today</button>
    </StyledHeader>
  );
}
