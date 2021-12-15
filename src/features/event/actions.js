import { SAVE_NEW_EVENT } from './types';

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
