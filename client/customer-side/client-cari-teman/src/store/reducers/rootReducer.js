import { combineReducers } from "redux";
import categoryReducers from "./categoryReducers";
import eventReducers from "./eventReducers";
import magnetReducers from "./magnetReducers";

const rootReducer = combineReducers({
  events: eventReducers,
  categories: categoryReducers,
  magnets: magnetReducers,
});

export default rootReducer;
