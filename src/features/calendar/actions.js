import { SHOW_NEXT_DATE, SHOW_PREVIOUS_DATE, SHOW_NEXT_WEEK, SHOW_PREVIOUS_WEEK} from './types';

export function showNextDate() {
  return { type: SHOW_NEXT_DATE };
}

export function showPreviousDate() {
  return { type: SHOW_PREVIOUS_DATE };
}

export function showNextWeek() {
  return { type: SHOW_NEXT_WEEK };
}

export function showPreviousWeek() {
  return { type: SHOW_PREVIOUS_WEEK };
}
