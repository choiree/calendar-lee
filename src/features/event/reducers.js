import { SAVE_NEW_EVENT, DELETE_EVENT } from './types';
import { merge, cloneDeep } from "lodash";

const initialState = {
  allIds: [],
  byIds: {},
  byDate: {},
}

export default function eventReducer(state = initialState, action) {
  // const obj2 = {g : 5};
  // const obj = {
  //   a: 1,
  //   b: {
  //     c: 2,
  //     d: {...obj2}
  //   },
  // };
  // const copiedObj = cloneDeep(obj);
  // copiedObj.b.d = 1;
  // obj2.g = 100;
  // console.log(1233,obj, copiedObj, obj2);

  switch (action.type) {
    case SAVE_NEW_EVENT:{
      const { id, title, content, startTime, endTime, date } = action.payload;
      const dateString = date.toLocaleString().substring(0,12).replaceAll(' ', '');

      return cloneDeep({
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            title,
            content,
            startTime,
            endTime,
            dateString,
          }
        },
        byDate: {
          ...state.byDate,
          [dateString]: state.byDate[dateString] ? [...state.byDate[dateString], id] : [id],
        }
      });
    }

    case DELETE_EVENT:{
      const {deleteId, currentDate } = action.payload;
      console.log(123123,deleteId, currentDate);
      const newState = cloneDeep(state);

      const index = newState.allIds.indexOf(deleteId);
      newState.allIds.splice(index, 1);
      const arr3 = newState.byDate[currentDate].filter((item) => item !== Number(deleteId));
      console.log('arr33333', arr3);
      // const arr = newState.byDate[currentDate];
      // const index2 = arr.indexOf(deleteId);
      // arr.splice(index2, 1);
      newState.byDate[currentDate] = arr3;
      console.log(newState.byDate[currentDate]);
      delete newState.byIds[deleteId];

      console.log('newwwwwww',newState);

      return newState;
    }

    default:
      return state;

  }
}
