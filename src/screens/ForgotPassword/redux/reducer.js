import {
    REQUEST_PASSWORD_RESET,
    REQUEST_PASSWORD_RESET_SUCCESS,
    REQUEST_PASSWORD_RESET_FAILURE,
    VERIFY_PASSWORD_RESET,
    RESET,
} from './types';

const initialState = {
    requesting: false,
    backendErrors: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_PASSWORD_RESET:
        case VERIFY_PASSWORD_RESET:
            return { ...state, requesting: true };

        case RESET:
        case REQUEST_PASSWORD_RESET_SUCCESS:
            return { ...state, ...initialState };

        case REQUEST_PASSWORD_RESET_FAILURE:
            return { ...state, requesting: false, backendErrors: action.errors };

        default:
            return state;
    }
};
