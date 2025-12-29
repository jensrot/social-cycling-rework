import { SET_CURRENT_USER, GET_CURRENT_USER, CREATED_USER, UNCREATED_USER, } from "../actions/types";
import isEmpty from '../../validation/';

const initialState = {
    userCreated: false,
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATED_USER:
            return {
                ...state,
                userCreated: true
            }
        case UNCREATED_USER:
            return {
                ...state,
                userCreated: false
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                userCreated: false
            };
        case GET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                userCreated: false
            }
        default:
            return state;
    }
}
