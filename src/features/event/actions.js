import { SAVE_NEW_EVENT, DELETE_EVENT } from './types';

export function saveNewEvent(title, content, startTime, endTime, date) {
  return {
    type: SAVE_NEW_EVENT,
    payload: {
      id: Date.now(),
      title,
      content,
      startTime,
      endTime,
      date,
    }
  };
}

export function deleteEvent(deleteId, currentDate) {
  return {
    type: DELETE_EVENT,
    payload: {
      deleteId,
      currentDate,
    }
  };
}
