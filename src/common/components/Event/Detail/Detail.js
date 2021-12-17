import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import store from '../../../../app/configureStore';
import { deleteEvent, modifyEvent } from '../../../../features/event';

const StyledEventDiv = styled.div`
  width: 300px;
  height: 400px;
  background-color: pink;
  padding: 5px 10px;
  border-radius: 7px;

  .b {
    color : black;
    background: none;
    border: none;
  }
`;

function Detail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const events = useSelector((state) => state.event.byIds);
  const id = useParams().eventId;
  const eventId = id.replace(':', '');
  const eventDetail = events[eventId];
  const title = eventDetail.title;
  const contnet = eventDetail.content;
  const startTime = eventDetail.startTime;
  const endTime = eventDetail.endTime;
  const dateString = location.state.dateString;

  const dateStr = dateString.substring(0,4) + '-' + dateString.substring(5,7) + '-' + dateString.substring(8,10)

  const eventArr = store.getState().event.byDate[dateString];
  let eventList = [];
  if (eventArr) {
    eventList = eventArr.map((item) => store.getState().event.byIds[item]);
  }
  const [eventTitle, setEventTile] = useState(title);
  const [eventContent, setEventContent] = useState(contnet);
  const [selectedStart, setSelectedStart] = useState(startTime);
  const [selectedEnd, setSelectedEnd] = useState(endTime);
  const [selectedDate, setSelectedDate] = useState(dateStr);
  const [isDisabled, setIsDisabled] = useState(true);

  const hadleChangeTitle = (e) => {
    setEventTile(e.target.value);
  };

  const hadleChangeContent = (e) => {
    setEventContent(e.target.value);
  };

  const handleChangeStart = (e) => {
    setSelectedStart(e.target.value);
  };

  const handleChangeEnd = (e) => {
    setSelectedEnd(e.target.value);
  };

  const handleChangeDate = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleDeleteBtn = () => {
    dispatch(deleteEvent(eventId, location.state.dateString));
    history.push('/calendar');
  };

  const handleModifyBtn = () => {
    setIsDisabled((isDisabled) => (!isDisabled));
    dispatch(modifyEvent(eventId, dateString, eventTitle, eventContent, selectedStart, selectedEnd, selectedDate));
  }

  return (
    <>
      {eventDetail &&
        <StyledEventDiv>
          <h1>{location.state.dateString}</h1>
          <input type='text' disabled={isDisabled} value={eventTitle} onChange={hadleChangeTitle} className='b'/>
          <textarea
            value={eventContent}
            onChange={hadleChangeContent}
            className='b'
            rows='5'
            cols='35'
            disabled={isDisabled}
          >
          </textarea>

          <label for="date">날짜 : </label>

          <input type="date" id="date" name="trip-start" disabled={isDisabled}
                value={selectedDate} onChange={handleChangeDate}/>

        <div>
          <label htmlFor='start-time'>시작시간 : </label>
          <select
            name='start'
            id='start-time'
            value={selectedStart}
            onChange={handleChangeStart}
            disabled={isDisabled}
          >
            {eventList.length
              ? Array.from(Array(24).keys()).map((hour) => {
                if (eventList.some((event) => {return event.startTime <= hour && event.endTime > hour})) {
                  return(<option value={hour} disabled>{hour}:00</option>);
                }
                return(<option value={hour}>{hour}:00</option>);
                })
              : Array.from(Array(24).keys()).map((hour) => (
                <option key={hour} value={hour}>
                  {hour}:00
                </option>
              ))
            }
          </select>

          <label htmlFor='end-time'> 끝나는 시간 : </label>
          <select
            name='end'
            id='end-time'
            value={selectedEnd}
            onChange={handleChangeEnd}
            disabled={isDisabled}
          >
            {eventList.length
              ? Array.from(Array(24).keys()).map((hour) => {
                if (eventList.some((event) => {return event.startTime <= hour && event.endTime > hour})) {
                  return(<option value={hour + 1} disabled>{hour + 1}:00</option>);
                }
                return(<option value={hour + 1}>{hour + 1}:00</option>);
                })
              : Array.from(Array(24).keys()).map((hour) => (
                <option key={hour} value={hour + 1}>
                  {hour + 1}:00
                </option>
              ))
            }
          </select>
        </div>
          <button onClick={handleModifyBtn}>수정</button>
          <button onClick={handleDeleteBtn}>삭제</button>
        </StyledEventDiv>
      }
    </>
  );
}

export default Detail;
