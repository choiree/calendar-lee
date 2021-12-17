import { SAVE_NEW_EVENT, DELETE_EVENT, MODIFY_EVENT } from './types';
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
      //todo Delete 처럼 복사하고 푸시하는걸로 바꾸기
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
      const { deleteId, currentDate } = action.payload;
      const newState = cloneDeep(state);

      const index = newState.allIds.indexOf(deleteId);
      const filteredByDate = newState.byDate[currentDate].filter((item) => item !== Number(deleteId));

      newState.allIds.splice(index, 1);
      newState.byDate[currentDate] = filteredByDate;
      delete newState.byIds[deleteId];

      return newState;
    }

    case MODIFY_EVENT:{
      const { modifyId, date, title, content, startTime, endTime, modifyDate } = action.payload;
      const modifyDateStr = modifyDate.replaceAll('-', '.');
      const newState = cloneDeep(state);

      newState.byIds[modifyId].title = title;
      newState.byIds[modifyId].content = content;
      newState.byIds[modifyId].startTime = startTime;
      newState.byIds[modifyId].endTime = endTime;
      newState.byIds[modifyId].dateString = modifyDate;

      const filteredByDate = newState.byDate[date].filter((item) => item !== Number(modifyId));
      newState.byDate[date] = filteredByDate;

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
