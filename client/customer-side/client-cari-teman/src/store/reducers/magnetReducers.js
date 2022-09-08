import { fetch_magnets } from "../action/actionType";

const initialState = {
  magnets: [],
};

function magnetReducers(state = initialState, action) {
  switch (action.type) {
    case fetch_magnets:
      return {
        ...state,
        magnets: action.payload,
      };

    default:
      return state;
  }
}

export default magnetReducers;
