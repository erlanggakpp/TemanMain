import { fetch_category } from "../action/actionType";

const initialState = {
  categories: [],
};

function categoryReducers(state = initialState, action) {
  switch (action.type) {
    case fetch_category:
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
}

export default categoryReducers;
