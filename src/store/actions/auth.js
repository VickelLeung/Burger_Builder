import * as actionTypes from './actionTypes';
// import * as actions from '../../store/actions/index';
import Axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

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
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAKnY1_JD2GnMK4fHgtgZIJbhnbs26M4-Q";

        Axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.userId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }
            )
            .catch(error => {
                dispatch(authFail(error.response.data));
            })
    };
};