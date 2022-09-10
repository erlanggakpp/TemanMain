import { EVENT_DETAILID, EVENT_FETCH } from "../actions/actionType";

const intialState = { events: [], detailevents: [] }
function eventReducer(state = intialState, action) {
    switch (action.type) {
        case EVENT_FETCH:
            return { ...state, events: action.payload }
        case EVENT_DETAILID:
            return { ...state, detailevents: action.payload }
        default:
            return state;
    }
}

export default eventReducer