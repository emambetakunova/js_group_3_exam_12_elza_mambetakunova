import axios from '../../axios-api';
import {push} from 'connected-react-router';
import {NotificationManager} from "react-notifications";

export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_SUCCESS";

export const LOGOUT_USER = "LOGOUT_USER";

const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, user});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

const logoutUser = () => ({type: LOGOUT_USER});

export const logOutUser = () => {
    return dispatch => {
        dispatch(logoutUser());
        dispatch(push('/'));
    };
};

export const registerUser = userData => {
    return dispatch => {
        return axios.post('/users', userData).then(
            (response) => {
                dispatch(registerUserSuccess(response.data.user));
                dispatch(push('/'));
            },
            error => {
                if(error.response  && error.response.data){
                    dispatch(registerUserFailure(error.response.data))
                } else {
                    dispatch(registerUserFailure({global: 'No connection'}))
                }

            }
        )
    }
};

export const loginUser = userData => {
    return dispatch => {
        return axios.post('/users/sessions', userData).then(
            response => {
                dispatch(loginUserSuccess(response.data));
                dispatch(push('/'));
            },
            error => {
                if(error.response && error.response.data){
                    dispatch(loginUserFailure(error.response.data))
                } else {
                    dispatch(loginUserFailure({global: 'No connection'}))
                }

            }
        )
    }
};

export const facebookLogin = userData => {
    return dispatch => {
        return axios.post('/users/facebookLogin', userData).then(
            response => {
                console.log(response);
                dispatch(loginUserSuccess(response.data.user));
                NotificationManager.success('Logged in via Facebook');
                dispatch(push('/'));
            },
            () => {
                dispatch(loginUserFailure('Validation via facebook failed'))
            }
        )
    }
};