import {
    ADD_POST,
    GET_POST,
    GET_POSTS,
    GET_PROFILE_POST,
    DELETE_POST,
    POST_LOADING,
    GET_LATEST_POSTS,
} from '../actions/types';

const initialState = {
    posts: [],
    latestPosts: [],
    post: {},
    profilePost: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case GET_LATEST_POSTS:
            return {
                ...state,
                latestPosts: action.payload,
                loading: false
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            };

        case GET_PROFILE_POST:
            return {
                ...state,
                profilePost: action.payload,
                loading: false
            }

        case ADD_POST:
            console.log(action.payload);

            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case DELETE_POST:
            console.log(action.payload);

            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload) // Remove the post with the id that matches the payload.
            };
        default:
            return state;
    }
}