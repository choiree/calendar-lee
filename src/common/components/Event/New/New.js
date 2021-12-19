import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import store from '../../../../app/configureStore';
import { saveNewEvent } from '../../../../features/event';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 300px;
  width: 400px;
`;

function New() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [selectedStart, setSelectedStart] = useState(location.state.hour);
  const [selectedEnd, setSelectedEnd] = useState(location.state.hour + 1);
  const enrollDate = useSelector((state) => state.calendar);
  const resultDay = new Date(
    enrollDate.displayedYear,
    enrollDate.displayedMonth - 1,
    enrollDate.displayedDate + (location.state.day - enrollDate.displayedDate),
  );
  const dateString = resultDay.toLocaleString().substring(0, 12).replaceAll(' ', '');
  const eventArr = store.getState().event.byDate[dateString];
  let eventList = [];

  if (eventArr) {
    eventList = eventArr.map((item) => store.getState().event.byIds[item]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(saveNewEvent(titleValue, contentValue, selectedStart, selectedEnd, resultDay));
    history.goBack();
  };

  const handleChangeTitle = (e) => {
    setTitleValue(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContentValue(e.target.value);
  };

  const handleChangeStart = (e) => {
    setSelectedStart(e.target.value);
  };

  const handleChangeEnd = (e) => {
    setSelectedEnd(e.target.value);
  };

  return (
    <>
      <StyledForm className='my-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='제목...'
          value={titleValue}
          onChange={handleChangeTitle}
          required
        />
        <textarea
          placeholder='설명...'
          value={contentValue}
          onChange={handleChangeContent}
          rows='5'
          cols='33'>
        </textarea>
        <div>
          <label htmlFor='start-time'>시작시간 : </label>
          <select
            name='start'
            id='start-time'
            value={selectedStart}
            onChange={handleChangeStart}
          >
            {Array.from(Array(24).keys()).map((hour) => {
              if (!eventList.length) {
                <option key={hour} value={hour}>
                  {hour}:00
                </option>
              }

              if (eventList.some((event) => { return event.startTime <= hour && event.endTime > hour })) {
                return (<option value={hour} disabled>{hour}:00</option>);
              }

              return (<option value={hour}>{hour}:00</option>);
            })}
          </select>
          <label htmlFor='end-time'> 끝나는 시간 : </label>
          <select
            name='end'
            id='end-time'
            value={selectedEnd}
            onChange={handleChangeEnd}
          >
            {Array.from(Array(24).keys()).map((hour) => {
              if (!eventList.length) {
                if (selectedStart > hour) {
                  return (<option value={hour + 1} disabled>{hour + 1}:00</option>);
                }

                return (<option key={hour} value={hour + 1}>{hour + 1}:00</option>);
              }

              if (eventList.some((event) => { return event.startTime > selectedStart && event.startTime < hour })) {
                return (<option value={hour + 1} disabled>{hour + 1}:00</option>);
              }

              if (eventList.some((event) => { return event.startTime <= hour && event.endTime > hour }) || selectedStart > hour) {
                return (<option value={hour + 1} disabled>{hour + 1}:00</option>);
              }

              return (<option value={hour + 1}>{hour + 1}:00</option>);
            })}
          </select>
        </div>
        <input type='submit' value='Save' />
      </StyledForm>
    </>
  );
}

export default New;
