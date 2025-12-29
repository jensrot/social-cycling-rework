import {
    CREATED_PASSWORD_RESET,
    UNCREATED_PASSWORD_RESET,
    COMPLETED_PASSWORD_RESET,
    UNCOMPLETED_PASSWORD_RESET
} from "../actions/types";

const initialState = {
    passwordResetCreated: false,
    passwordResetCompleted: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATED_PASSWORD_RESET:
            return {
                ...state,
                passwordResetCreated: true
            }
        case UNCREATED_PASSWORD_RESET:
            return {
                ...state,
                passwordResetCreated: false
            }
        case COMPLETED_PASSWORD_RESET:
            return {
                ...state,
                passwordResetCompleted: true
            }
        case UNCOMPLETED_PASSWORD_RESET:
            return {
                ...state,
                passwordResetCompleted: false
            }
        default:
            return state;
    }
}