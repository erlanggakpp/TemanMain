import { combineReducers } from "redux";
import eventReducers from "./eventReducers";

const rootReducer = combineReducers({
    events: eventReducers
});

export default rootReducer;
