import {
    FETCH_TRACK_HISTORY_SUCCESS,
    FETCH_TRACK_HISTORY_FAILURE
} from "../actions/trackHistoryActions";

const initialState = {
    trackHistory: null,
    error: null
};

const trackHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACK_HISTORY_SUCCESS:
            return {
                ...state,
                trackHistory: action.data
            };
        case FETCH_TRACK_HISTORY_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};
export default trackHistoryReducer;