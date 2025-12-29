import axios from "axios";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "../../utils";

import { GET_ERRORS, SET_CURRENT_USER, GET_CURRENT_USER, CREATED_USER, UNCREATED_USER } from "./types";

export const registerUser = (userData, history) => (dispatch) => {
    axios
        .post(`/api/v1/user/register`, userData)
        .then(res => {
            if (res.statusText === "OK") {
                dispatch(setCreatedUser());
                history.push("/login")
            }

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });

};

export const loginUser = (userData, history) => (dispatch) => {
    axios
        .post(`/api/v1/user/login`, userData)
        .then(res => {
            // Save to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            // Set token to Authorization header
            setAuthToken(token);

            // Decode token to get user data
            const decoded = jwt_decode(token);

            // Set current user data
            dispatch(setCurrentUser(decoded));

            // Go to profile
            history.push("/dashboard");
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const editUser = (userData, history) => dispatch => {
    axios
        .post(`/api/v1/user/edit`, userData)
        .then(res => {
            dispatch({
                type: SET_CURRENT_USER,
                payload: res.data
            })
            history.push("/dashboard");
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

export const editProfilePicture = (userData, history) => dispatch => {
    axios
        .post(`/api/v1/user/picture`, userData)
        .then(res => {
            dispatch({
                type: SET_CURRENT_USER,
                payload: res.data
            })
            history.push(`/profile/${res.data._id}`);
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const getCurrentUser = () => (dispatch) => {
    axios.get(`/api/v1/user/me`)
        .then(res => {
            dispatch({
                type: GET_CURRENT_USER,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Log user out
export const logoutUser = (history) => (dispatch) => {
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    history.push("/login");
};

export const setCreatedUser = () => {
    return {
        type: CREATED_USER
    }
}

export const setUnCreatedUser = () => {
    return {
        type: UNCREATED_USER
    }
}