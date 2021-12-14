import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import store from "../../../app/configureStore";

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
  margin-left:100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

// TODO: Create your own header.
export default function Header ({ displayDate, onChangePre, onChangeNext }) {
  return (
    <StyledHeader>
      <nav>
        <ul>
          <li><Link to='/calendar'>Daily</Link></li>
          <li><Link to='/week'>Weekly</Link></li>
        </ul>
      </nav>
      <StyledDateWrapperDiv>
        <StyledNextDateButton onClick={onChangePre}>{'<'}</StyledNextDateButton>
        <div>{displayDate}</div>
        <StyledNextDateButton onClick={onChangeNext}>{'>'}</StyledNextDateButton>
      </StyledDateWrapperDiv>
    </StyledHeader>
  );
}
