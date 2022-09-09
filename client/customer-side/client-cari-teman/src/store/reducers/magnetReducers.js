import { detail_magnet, fetch_magnets } from "../action/actionType";

const initialState = {
  magnets: [],
  magnetDetail: "",
};

function magnetReducers(state = initialState, action) {
  switch (action.type) {
    case fetch_magnets:
      return {
        ...state,
        magnets: action.payload,
      };
    case detail_magnet:
      return {
        ...state,
        magnetDetail: action.payload,
      };

    default:
      return state;
  }
}

export default magnetReducers;
