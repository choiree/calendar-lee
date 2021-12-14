import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from '../common/components/Header/Header';
import Daily from '../common/components/Calendar/Daily/Daily';
import Week from '../common/components/Calendar/Week/Week';
import store from './configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { showNextDate, showNextWeek, showPreviousDate, showPreviousWeek } from '../features/calendar';

function App() {
  const dispatch = useDispatch();
  const [isDaily, setIsDaily] = useState(false);
  const current = store.getState().calendar;
  const date = useSelector((state) => state.calendar.currentDate);

  const handleChangePreDay = () => {
    dispatch(showPreviousDate());
  };

  const handleChangeNextDay = () => {
    dispatch(showNextDate());
  }

  const handleChangePreWeek = () => {
    dispatch(showPreviousWeek());
  };

  const handleChangeNextWeek = () => {
    dispatch(showNextWeek());
  }

  return (
    <div>
      {isDaily &&
        <Header
          displayDate={
            <div>{current.displayedYear}년{current.displayedMonth}월{current.displayedDate}일</div>
          }
          onChangePre={handleChangePreDay}
          onChangeNext={handleChangeNextDay}
      />}
      {!isDaily &&
        <Header
          displayDate={
            <div>{current.displayedYear}년{current.displayedMonth}월</div>
          }
          onChangePre={handleChangePreWeek}
          onChangeNext={handleChangeNextWeek}
      />}
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
      </Switch>
    </div>
  );
}

export default App;
