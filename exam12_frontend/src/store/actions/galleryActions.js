import axios from "../../axios-api";
import {push} from 'connected-react-router';

export const FETCH_GALLERY_SUCCESS = 'FETCH_GALLERY_SUCCESS';
export const FETCH_GALLERY_FAILURE = "FETCH_GALLERY_FAILURE";

export const FETCH_PICTURE_ID_SUCCESS = "FETCH_PICTURE_ID_SUCCESS";

export const CREATE_PICTURE_SUCCESS = "CREATE_PICTURE_SUCCESS";

export const DELETE_PICTURE_SUCCESS = "DELETE_PICTURE_SUCCESS";
export const DELETE_PICTURE_FAILURE = "DELETE_PICTURE_FAILURE";

const fetchGallerySuccess = data => ({type: FETCH_GALLERY_SUCCESS, data});

const fetchGalleryFailure = error => ({type: FETCH_GALLERY_FAILURE, error});

const fetchPictureIdSuccess = data => ({type: FETCH_PICTURE_ID_SUCCESS, data});

const createPictureSuccess = () => ({type: CREATE_PICTURE_SUCCESS});

const deletePictureSuccess = () => ({type: DELETE_PICTURE_SUCCESS});

const deletePictureFailure = () => ({type: DELETE_PICTURE_FAILURE});


export const fetchGallery = () => {
    return dispatch => {
        return axios.get('/gallery').then(
            response => dispatch(fetchGallerySuccess(response.data)),
            error => dispatch(fetchGalleryFailure(error))
        );
    };
};

export const fetchPictureId = id => {
    return dispatch => {
        return axios.get('/gallery/' + id).then(
            response => dispatch(fetchPictureIdSuccess(response.data)),
            error => dispatch(fetchGalleryFailure(error))
        );
    };
};

export const createPicture = artistData => {
    return dispatch => {
        return axios.post('/gallery', artistData).then(
            () => dispatch(createPictureSuccess())
        );
    };
};

export const deletePicture = id => {
    return (dispatch, getState) => {
        let token = getState().user.user.token;
        const header = {headers: {'Authorization': token}};
        return axios.delete('/gallery/' + id, header).then(
            () => {
                dispatch(deletePictureSuccess());
                dispatch(push('/'));
            },
            error => {
                if(error.response  && error.response.data){
                    dispatch(deletePictureFailure(error.response.data));
                } else {
                    dispatch(deletePictureFailure({global: 'No connection'}))
                }
            }
        );
    };
};