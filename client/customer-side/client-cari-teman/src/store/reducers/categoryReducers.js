import { fetch_category, category_loading } from "../action/actionType";

const initialState = {
  categories: [],
  loading: true
};

function categoryReducers(state = initialState, action) {
  switch (action.type) {
    case fetch_category:
      return {
        ...state,
        categories: action.payload,
      };
      case category_loading:
      return {
        ...state,
        loading: action.payload
        }
    default:
      return state;
  }
}

export default categoryReducers;
