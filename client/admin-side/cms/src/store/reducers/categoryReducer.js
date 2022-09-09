import { CATEGORY_DETAILID, CATEGORY_FETCH } from "../actions/actionType";

const intialState = { categories: [], detailcategories: [] }
function categoryReducer(state = intialState, action) {
    switch (action.type) {
        case CATEGORY_FETCH:
            return { ...state, categories: action.payload }
        case CATEGORY_DETAILID:
            return { ...state, detailcategories: action.payload }
        default:
            return state;
    }
}

export default categoryReducer