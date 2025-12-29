import {
    GET_PROFILE,
    DELETE_PROFILE,
    GET_PROFILES,
    GET_PROFILE_POSTS,
    CLEAR_CURRENT_PROFILE,
    PROFILE_LOADING,
    GET_PROFILE_BY_USERID
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: null,
    profileByUserId: null,
    profilePosts: [],
    loading: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE_BY_USERID:
            return {
                ...state,
            };
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false,
            }
        case DELETE_PROFILE:
            return {
                ...state,
                profile: action.payload,
            }
        case GET_PROFILES: {
            return {
                ...state,
                profiles: action.payload,
                loading: false
            }
        }
        case GET_PROFILE_POSTS: {
            return {
                ...state,
                profilePosts: action.payload
            }
        }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            };
        default:
            return state;
    }
}