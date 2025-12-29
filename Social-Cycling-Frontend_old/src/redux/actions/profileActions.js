import {
    GET_PROFILE,
    GET_PROFILES,
    GET_PROFILE_POSTS,
    GET_ERRORS,
    CLEAR_CURRENT_PROFILE,
    SET_CURRENT_USER,
    PROFILE_LOADING,
    DELETE_PROFILE,
    GET_PROFILE_BY_USERID
} from './types';
import axios from 'axios';
import { setAuthToken } from '../../utils';

export const getCurrentUser = () => (dispatch) => {
    dispatch(setProfileLoading());

    axios.get(`/api/v1/profile`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
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

export const getCurrentProfile = () => (dispatch) => {
    dispatch(setProfileLoading());

    axios
        .get(`/api/v1/profile`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const getProfileByUsername = (username) => (dispatch) => {
    dispatch(setProfileLoading());

    axios
        .get(`/api/v1/profile/username/${username}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const getProfileById = (userId) => (dispatch) => {
    dispatch(setProfileLoading());

    axios
        .get(`/api/v1/profile/user/${userId}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const getPostsFromProfileById = (userId) => (dispatch) => {
    axios
        .get(`/api/v1/profile/user/posts/${userId}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE_POSTS,
                payload: res.data
            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const getProfileByUserId = (userId) => (dispatch) => {
    axios
        .get(`/api/v1/profile/user/${userId}`)
        .then(res => {
            console.log(res);
            dispatch({
                type: GET_PROFILE_BY_USERID,
                payload: res.data
            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());

    axios
        .get(`/api/v1/profiles`)
        .then(res =>
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const createOrUpdateProfile = (profileData, history) => (dispatch) => {
    axios.post(`/api/v1/profile`, profileData)
        .then(res => {
            const { profileCreated, profileUpdated } = res.data;

            if (profileCreated) {
                history.push('/dashboard')
            } else if (profileUpdated) {
                history.push(`/profile/${res.data.profileUpdated.user}`)
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Remove only the profile
export const deleteProfile = (history) => (dispatch) => {
    axios.delete(`/api/v1/profile/account`)
        .then(res => {
            history.push('/dashboard');
            dispatch({
                type: DELETE_PROFILE,
                payload: res.data
            })
        })
}

// Remove both the profile and user (account)
export const deleteAccount = (history) => (dispatch) => {
    axios.delete(`/api/v1/profile/account`)
        .then(res => {
            history.push('/register');
            localStorage.removeItem('jwtToken');
            setAuthToken(false);
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};