import { SHOW_NEXT_DATE, SHOW_PREVIOUS_DATE, SHOW_NEXT_WEEK, SHOW_PREVIOUS_WEEK, SHOW_TODAY } from './types';

const today = new Date();

const initialState = {
  currentDate: today,
  displayedYear: today.getFullYear(),
  displayedMonth: today.getMonth() + 1,
  displayedDate: today.getDate(),
  displayedDay: today.getDay(),
};

const saveNewDay = (nextState, target) => {
  nextState.currentDate = target;
  nextState.displayedYear = target.getFullYear();
  nextState.displayedMonth = target.getMonth() + 1;
  nextState.displayedDate = target.getDate();
  nextState.displayedDay = target.getDay();
};

export default function calendarReducer(state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case SHOW_NEXT_DATE: {
      const nextDay = new Date(state.currentDate.setDate(state.currentDate.getDate() + 1));
      saveNewDay(newState, nextDay);

      return newState;
    }

    case SHOW_PREVIOUS_DATE: {
      const previousDay = new Date(state.currentDate.setDate(state.currentDate.getDate() - 1));
      saveNewDay(newState, previousDay);

      return newState;
    }

    case SHOW_NEXT_WEEK: {
      const nextWeek = new Date(state.currentDate.setDate(state.currentDate.getDate() + 7));
      saveNewDay(newState, nextWeek);

      return newState;
    }

    case SHOW_PREVIOUS_WEEK: {
      const previousWeek = new Date(state.currentDate.setDate(state.currentDate.getDate() - 7));
      saveNewDay(newState, previousWeek);

      return newState;
    }

    case SHOW_TODAY: {
      const realToday = action.payload;
      saveNewDay(newState, realToday);

      return newState;
    }

    default:
      return newState;
  }
}
