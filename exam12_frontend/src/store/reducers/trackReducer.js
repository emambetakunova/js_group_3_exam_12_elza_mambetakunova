import {FETCH_TRACKS_SUCCESS, FETCH_TRACKS_FAILURE, PUBLISH_TRACK_SUCCESS} from "../actions/trackActions";

const initialState = {
    tracks: null,
    error: null
};

const trackReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_SUCCESS:
            return {
                ...state,
                tracks: action.data
            };
        case FETCH_TRACKS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case PUBLISH_TRACK_SUCCESS:
            const idTrack = action.track._id;
            const isPublished = action.track.published;
            return {
                ...state,
                tracks: state.tracks.map(track => track._id === idTrack
                    ? {...track, published: isPublished}
                    : track
                )
            };
        default:
            return state;
    }
};
export default trackReducer;