import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import showsReduser from "./showsReduser";

const middlewaresArr = [thunk];
if (process.env.NODE_ENV === "development") {
  middlewaresArr.push(logger);
}

const middleWares = applyMiddleware(...middlewaresArr);

const mainReduser = combineReducers({
  showsReduser,
});

const store = createStore(mainReduser, middleWares);

export default store;
