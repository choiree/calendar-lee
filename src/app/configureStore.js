import { combineReducers, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import calendar from "../features/calendar";
import event from "../features/event";

const reducer = combineReducers({
  calendar,
  event,
});

const store = createStore(reducer, applyMiddleware(logger));

export default store;
