import { SAVE_NEW_EVENT, DELETE_EVENT, MODIFY_EVENT } from './types';

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

export function modifyEvent(modifyId, date, title, content, startTime, endTime, modifyDate) {
  return {
    type: MODIFY_EVENT,
    payload: {
      modifyId,
      date,
      title,
      content,
      startTime,
      endTime,
      modifyDate,
    }
  };
}
