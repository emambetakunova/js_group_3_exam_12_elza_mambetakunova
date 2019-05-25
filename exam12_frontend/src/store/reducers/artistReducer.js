import {FETCH_ARTISTS_SUCCESS, FETCH_ARTISTS_FAILURE, FETCH_ARTIST_ID_SUCCESS, PUBLISH_ARTIST_SUCCESS } from "../actions/artistActions";

const initialState = {
    artists: [],
    artistId: [],
    error: null
};

const artistReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTISTS_SUCCESS:
            return {
                ...state,
                artists: action.data
            };
        case FETCH_ARTISTS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case FETCH_ARTIST_ID_SUCCESS:
            return {
                ...state,
                artistId: action.data
            };
        case PUBLISH_ARTIST_SUCCESS:
            const idArtist = action.artist._id;
            const isPublished = action.artist.published;
            return {
                ...state,
                artists: state.artists.map(artist => artist._id === idArtist
                    ? {...artist, published: isPublished}
                    : artist
                )
            };
        default:
            return state;
    }
};
export default artistReducer;