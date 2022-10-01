import { detail_magnet, fetch_magnets, token_agora } from "../action/actionType";

const initialState = {
  magnets: [],
  magnetDetail: "",
  dataVideoCall: {}
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
    case token_agora: {
      console.log(action.payload);
      return {
        ...state,
        dataVideoCall: action.payload
      }
    }
    default:
      return state;
  }
}

export default magnetReducers;
