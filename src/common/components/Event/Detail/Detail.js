import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import { deleteEvent } from '../../../../features/event';

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
  const location = useLocation();
  const history = useHistory();
  console.log(location.state.dateString);
  const events = useSelector((state) => state.event.byIds);
  const id = useParams().eventId;
  const eventId = id.replace(':', '');
  const eventDetail = events[eventId];
  const title = eventDetail.title;
  const contnet = eventDetail.content;
  const dispatch = useDispatch();

  const [eventTitle, setEventTile] = useState(title);
  const [eventContent, setEventContent] = useState(contnet);

  const hadleChangeTitle = (e) => {
    setEventTile(e.target.value);
  };

  const hadleChangeContent = (e) => {
    setEventContent(e.target.value);
  };

  const handleDeleteBtn = () => {
    dispatch(deleteEvent(eventId, location.state.dateString));
    history.push('/calendar');
  }

  return (
    <>
      {eventDetail &&
        <StyledEventDiv>
          <h2>{eventDetail.title}</h2>
          <input type='text' disabled value={eventTitle} onChange={hadleChangeTitle} className='b'/>
          <input type='text' disabled value={eventContent} onChange={hadleChangeContent} className='b'/>
          <p>상세내용 : {eventDetail.content}</p>
          <p>시간 : {eventDetail.startTime}:00 ~ {eventDetail.endTime}:00 </p>
          <button>수정</button>
          <button onClick={handleDeleteBtn}>삭제</button>
        </StyledEventDiv>
      }
    </>
  );
}

export default Detail;
