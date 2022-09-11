import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import userReducer from "./userReducer";
import eventReducer from "./eventReducer";

const rootReducer = combineReducers({
    user: userReducer, event: eventReducer, category: categoryReducer
})

export default rootReducer