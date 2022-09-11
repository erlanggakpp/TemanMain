import { USER_DETAILID, USER_FETCH } from "../actions/actionType"

const intialState = { users: [], detailusers: [] }
function userReducer(state = intialState, action) {
    switch (action.type) {
        case USER_FETCH:
            return { ...state, users: action.payload }
        case USER_DETAILID:
            return { ...state, detailusers: action.payload }
        default:
            return state;
    }
}

export default userReducer