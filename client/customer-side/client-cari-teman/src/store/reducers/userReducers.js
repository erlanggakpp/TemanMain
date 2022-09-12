import { fetch_user, detail_user, loading_set } from "../action/actionType";

const initialState = {
  users: [],
  detailuser: "",
  loading: false,
};

function userReducers(state = initialState, action) {
  switch (action.type) {
    case fetch_user:
      return {
        ...state,
        users: action.payload,
      };
    case detail_user:
      return {
        ...state,
        detailuser: action.payload,
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
