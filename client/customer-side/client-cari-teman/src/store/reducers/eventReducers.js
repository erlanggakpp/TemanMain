import { fetch_detail, fetch_event, loading_set } from "../action/actionType";

const initialState = {
  events: [],
  eventDetail: "",
  loading: true,
};

function eventReducers(state = initialState, action) {
  switch (action.type) {
    case fetch_event:
      return {
        ...state,
        events: action.payload,
      };
    case fetch_detail:
      return {
        ...state,
        eventDetail: action.payload,
      };
    case loading_set:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
}

export default eventReducers;
