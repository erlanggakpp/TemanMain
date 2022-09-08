import { fetch_event } from "../action/actionType";


 const initialState = {
  events: [],
};

function eventReducers(state = initialState, action) {
  switch (action.type) {
    case fetch_event:
      return {
        ...state,
        events: action.payload,
      };

    default:
      return state;
  }
}

export default eventReducers;