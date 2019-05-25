import {FETCH_GALLERY_SUCCESS, FETCH_GALLERY_FAILURE, FETCH_PICTURE_ID_SUCCESS} from "../actions/galleryActions";

const initialState = {
    pictures: [],
    pictureId: [],
    error: null
};

const galleryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GALLERY_SUCCESS:
            return {
                ...state,
                pictures: action.data
            };
        case FETCH_GALLERY_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case FETCH_PICTURE_ID_SUCCESS:
            return {
                ...state,
                pictureId: action.data
            };
        default:
            return state;
    }
};
export default galleryReducer;