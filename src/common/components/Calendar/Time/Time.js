import React from 'react';
import styled from 'styled-components';

const StyledTimeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
`;

function Time() {
  return (
    <StyledTimeDiv>
      <div>Time</div>
      {Array.from(Array(24).keys()).map((hour) => (
        <div key={hour}>{`${hour}:00 - ${hour + 1}:00`}</div>
      ))}
    </StyledTimeDiv>
  );
}

export default Time;
