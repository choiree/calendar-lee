import React, { useState } from 'react';
import { noop } from 'lodash';
import { Link } from 'react-router-dom';

function Row({ onClick = noop, event = {} }) {
  const eventKey = Object.keys(event);

  return (
    <>
      {eventKey.length ?
        <Link to ='/events/:eventId'><tr>{event.title}</tr></Link> :
        <Link to ='/events/new'>생성페이지</Link>
      }
    </>
  );
}

export default Row;
