import * as actionTypes from './actionTypes';
// import * as actions from '../../store/actions/index';
import Axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAKnY1_JD2GnMK4fHgtgZIJbhnbs26M4-Q";

        if (!isSignup)

            Axios.post(url, authData)
                .then(response => {
                    dispatch(authSuccess(response.data));
                }
                )
                .catch(error => {
                    dispatch(error)
                })
    };
};