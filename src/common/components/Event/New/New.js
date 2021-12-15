import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import store from '../../../../app/configureStore';
import { saveNewEvent } from '../../../../features/event';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly
  align-items: center;
  height: 300px;
  width: 400px;
`;

function New() {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [selectedStart, setSelectedStart] = useState('');
  const [selectedEnd, setSelectedEnd] = useState('');

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
  }

  return (
    <>
      <h1>이벤트 추가하는 페이지</h1>
      <StyledForm className='my-form' onSubmit={(e) => {
        e.preventDefault();
        const enrollDate = store.getState().calendar.currentDate;
        dispatch(saveNewEvent(titleValue, contentValue, selectedStart, selectedEnd, enrollDate));
        console.log(enrollDate);
        console.log(123,selectedStart, selectedEnd, titleValue,'contentValue:',contentValue);
      }}>
        <input type='text' placeholder='제목...' value={titleValue} onChange={handleChangeTitle} required/>
        <textarea placeholder='설명...' value={contentValue} onChange={handleChangeContent} rows='5' cols='33'></textarea>
        <div>
          <label for='start-time'>시작시간 : </label>

          <select name='start' id='start-time' value={selectedStart} onChange={handleChangeStart}>
            {Array.from(Array(24).keys()).map((hour) => (
              <option value={hour}>{`${hour}:00`}</option>
            ))}
          </select>

          <label for='end-time'> 끝나는 시간 : </label>

          <select name='end' id='end-time' value={selectedEnd} onChange={handleChangeEnd}>
            {Array.from(Array(24).keys()).map((hour) => (
              <option value={hour + 1}>{`${hour + 1}:00`}</option>
            ))}
          </select>
        </div>

        <input type='submit' value='Save' />
      </StyledForm>
    </>
  );
}

export default New;
