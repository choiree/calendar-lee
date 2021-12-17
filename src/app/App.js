import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../common/components/Header/Header';
import Daily from '../common/components/Calendar/Daily/Daily';
import Week from '../common/components/Calendar/Week/Week';
import { useDispatch, useSelector } from 'react-redux';
import { showNextDate, showNextWeek, showPreviousDate, showPreviousWeek } from '../features/calendar';
import New from '../common/components/Event/New/New';
import Detail from '../common/components/Event/Detail/Detail';

function App() {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.calendar);
  const [isDaily, setIsDaily] = useState(false);

  const handleChangePreDay = () => {
    dispatch(showPreviousDate());
  };

  const handleChangeNextDay = () => {
    dispatch(showNextDate());
  };

  const handleChangePreWeek = () => {
    dispatch(showPreviousWeek());
  };

  const handleChangeNextWeek = () => {
    dispatch(showNextWeek());
  };

  return (
    <div>
      {isDaily &&
        <Header
          displayDate={
            <div>{date.displayedYear}년{date.displayedMonth}월{date.displayedDate}일</div>
          }
          onChangePre={handleChangePreDay}
          onChangeNext={handleChangeNextDay}
        />
      }
      {!isDaily &&
        <Header
          displayDate={
            <div>{date.displayedYear}년{date.displayedMonth}월</div>
          }
          onChangePre={handleChangePreWeek}
          onChangeNext={handleChangeNextWeek}
        />
      }
      <Switch>
        <Route path="/" exact>
          <Redirect to="/calendar" />
        </Route>
        <Route path="/calendar" exact>
          <Daily onOpenDaily={setIsDaily}/>
        </Route>
        <Route path="/week">
          <Week onOpenDaily={setIsDaily}/>
        </Route>
        <Route path="/events/new" exact>
          <New />
        </Route>
        <Route path="/events/:eventId" exact>
          <Detail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
