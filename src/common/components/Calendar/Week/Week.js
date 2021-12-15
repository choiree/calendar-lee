import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import store from '../../../../app/configureStore';
import Row from '../Row/Row';

function Week({ onOpenDaily }) {
  onOpenDaily(false);

  const current = store.getState().calendar;
  const thisWeek = [];

  for(let i = 0; i < 7; i++) {
    const resultDay =
      new Date(
        current.displayedYear,
        current.displayedMonth - 1,
        current.displayedDate + (i - current.displayedDay),
      );
    let day = resultDay.getDate();
    day = String(day).length === 1 ? '0' + day : day;

    thisWeek[i] = day;
  }

  return (
    <>
    <h1>주간페이지</h1>
    <table>
        <thead>
          <tr>
            <td>시간</td>
            <td>
              <div>SUN</div>
              <div>{thisWeek[0]}</div>
            </td>
            <td>
              <div>MON</div>
              <div>{thisWeek[1]}</div>
            </td>
            <td>
              <div>TUE</div>
              <div>{thisWeek[2]}</div>
            </td>
            <td>
              <div>WED</div>
              <div>{thisWeek[3]}</div>
            </td>
            <td>
              <div>THU</div>
              <div>{thisWeek[4]}</div>
            </td>
            <td>
              <div>FRI</div>
              <div>{thisWeek[5]}</div>
            </td>
            <td>
              <div>SAT</div>
              <div>{thisWeek[6]}</div>
            </td>
          </tr>
        </thead>
        <tbody>
          {Array.from(Array(24).keys()).map((hour) => (
            <tr>
              <td>{`${hour}:00 - ${hour + 1}:00`}</td>
              {Array.from(Array(7).keys()).map(() => (
                <td><Row /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Week;

/*
const history = useHistory();

const time = Array.from(Array(24).keys());

time.map((hour) => (
  <Row
    id={hour}
    onClick={() => {
      history.push(`/events/new?time=${hour}`)
    }}>

  </Row>))
*/