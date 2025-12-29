import axios from 'axios';
import {
    GET_ERRORS,
    CREATED_PASSWORD_RESET,
    UNCREATED_PASSWORD_RESET,
    COMPLETED_PASSWORD_RESET,
    UNCOMPLETED_PASSWORD_RESET
} from './types';

export const sendRequest = (email, history) => dispatch => {
    axios.post(`/api/v1/reset_request`, email)
        .then(res => {
            if (res.statusText === "OK") {
                dispatch(setCreatedPasswordReset())
                // If logged in we get redirected to dashboard
                history.push('/login')
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

export const resetPassword = (token, data, history) => dispatch => {
    axios.post(`/api/v1/reset_password/${token}`, data)
        .then(res => {
            if (res.statusText === "OK") {
                dispatch(setCompletedPasswordReset())
                // If we are logged in we get redirected to dashboard
                history.push('/login')
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const denyReset = (token, history) => dispatch => {
    axios.delete(`/api/v1/deny_request/${token}`)
        .then(res => history.push('/'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const setCreatedPasswordReset = () => {
    return {
        type: CREATED_PASSWORD_RESET
    }
}

export const setUnCreatedPasswordReset = () => {
    return {
        type: UNCREATED_PASSWORD_RESET
    }
}

export const setCompletedPasswordReset = () => {
    return {
        type: COMPLETED_PASSWORD_RESET
    }
}

export const setUnCompletedPasswordReset = () => {
    return {
        type: UNCOMPLETED_PASSWORD_RESET
    }
}