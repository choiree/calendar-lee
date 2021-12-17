import React from 'react';
import { Link } from 'react-router-dom';

function Row({ hour, day, eventList, eventArr, dateString }) {
  let title ='';
  let eventId = '';

  eventList.forEach((item ,index) => {
    if (item.startTime <= hour && hour < item.endTime) {
      eventId = eventArr[index];
      return title = item.title;
    }
  });

  return (
    <>
      {title
        ? <Link to = {{
            pathname:`/events/:${eventId}`,
            state:{dateString}
          }}>
            <div>{title}</div>
          </Link>
        : <Link to = {{
            pathname:'/events/new',
            state:{hour, day},
          }}>
            +
          </Link>
      }
    </>
  );
}

export default Row;
