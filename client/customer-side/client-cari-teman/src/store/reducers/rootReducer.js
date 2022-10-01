import { combineReducers } from "redux";
import categoryReducers from "./categoryReducers";
import eventReducers from "./eventReducers";
import magnetReducers from "./magnetReducers";
import userReducers from "./userReducers";

const rootReducer = combineReducers({
  events: eventReducers,
  categories: categoryReducers,
  magnets: magnetReducers,
  users: userReducers,
});

export default rootReducer;
