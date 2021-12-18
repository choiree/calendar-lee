import { SAVE_NEW_EVENT, DELETE_EVENT, MODIFY_EVENT } from './types';
import { cloneDeep } from 'lodash';

const initialState = {
  allIds: [],
  byIds: {},
  byDate: {},
};

export default function eventReducer(state = initialState, action) {
  const newState = cloneDeep(state);

  switch (action.type) {
    case SAVE_NEW_EVENT: {
      const { id, title, content, startTime, endTime, date } = action.payload;
      const dateString = date.toLocaleString().substring(0, 12).replaceAll(' ', '');

      newState.allIds.push(id);

      newState.byIds[id] = {
        title,
        content,
        startTime,
        endTime,
        dateString,
      };

      if (newState.byDate[dateString]) {
        newState.byDate[dateString].push(Number(id));
      } else {
        newState.byDate[dateString] = [Number(id)];
      }

      return newState;
    }

    case DELETE_EVENT: {
      const { deleteId, currentDate } = action.payload;
      const index = newState.allIds.indexOf(deleteId);
      const filteredByDate = newState.byDate[currentDate].filter((item) => item !== Number(deleteId));

      newState.allIds.splice(index, 1);
      newState.byDate[currentDate] = filteredByDate;
      delete newState.byIds[deleteId];

      return newState;
    }

    case MODIFY_EVENT: {
      const { modifyId, date, title, content, startTime, endTime, modifyDate } = action.payload;
      const modifyDateStr = modifyDate.replaceAll('-', '.');
      const filteredByDate = newState.byDate[date].filter((item) => item !== Number(modifyId));

      newState.byDate[date] = filteredByDate;
      newState.byIds[modifyId].title = title;
      newState.byIds[modifyId].content = content;
      newState.byIds[modifyId].startTime = startTime;
      newState.byIds[modifyId].endTime = endTime;
      newState.byIds[modifyId].dateString = modifyDate;

      if (newState.byDate[modifyDateStr]) {
        newState.byDate[modifyDateStr].push(Number(modifyId));
      } else {
        newState.byDate[modifyDateStr] = [Number(modifyId)];
      }

      return newState;
    }

    default:
      return state;
  }
}
