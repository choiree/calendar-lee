import { SAVE_NEW_EVENT } from './types';

const initialState = {
  allIds: [],
  byIds: {},
  byDate: {},
}

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_NEW_EVENT:
      const { id, title, content, startTime, endTime, date } = action.payload;
      //todo 이쁘게 바꾸기
      const dateString = date.toLocaleString();

      console.log('SAVE_NEW_EVENT', dateString);

      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            title,
            content,
            startTime,
            endTime,
            date,
          }
        },
        byDate: {
          ...state.byDate,
          [dateString]: state.byDate[dateString] ? [...state.byDate[dateString], id] : [id],
        }
      };

    default:
      return state;
  }
}
