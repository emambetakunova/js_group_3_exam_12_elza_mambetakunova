import {FETCH_ALBUMS_SUCCESS, FETCH_ALBUMS_FAILURE, FETCH_ALBUM_ID_SUCCESS, PUBLISH_ALBUM_SUCCESS} from "../actions/albumActions";

const initialState = {
    albums: [],
    albumId: [],
    artistAlbum: [],
    error: null
};

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALBUMS_SUCCESS:
            return {
                ...state,
                albums: action.data
            };
        case FETCH_ALBUMS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case FETCH_ALBUM_ID_SUCCESS:
            return {
                ...state,
                albumId: action.data,
                artistAlbum: action.data.artist.name
            };
        case PUBLISH_ALBUM_SUCCESS:
            const idAlbum = action.album._id;
            const isPublished = action.album.published;
            return {
                ...state,
                albums: state.albums.map(album => album._id === idAlbum
                    ? {...album, published: isPublished}
                    : album
                )
            };
        default:
            return state;
    }
};
export default albumReducer;