import {
    UPDATE_IMAGE,
    UPDATE_FULL_NAME,
    UPDATE_EMAIL,
    UPDATE_PHONE_NUMBER,
    UPDATE_PASSWORD,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    ASK_QUESTION_REQUEST,
    RESET_QUESTION_REQUEST
} from './types';

const initialState = {
    requestingImage: false,
    requestingFullName: false,
    requestingEmail: false,
    requestingPhoneNumber: false,
    requestingOTP: false,
    requestingPassword: false,
    requestingQuestion: false,
    backendErrors: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_IMAGE:
            return { ...state, requestingImage: true };

        case UPDATE_FULL_NAME:
            return { ...state, requestingFullName: true, backendErrors: false };

        case UPDATE_EMAIL:
            return { ...state, requestingEmail: true, backendErrors: false };

        case UPDATE_PHONE_NUMBER:
            return { ...state, requestingPhoneNumber: true, backendErrors: false };

        case UPDATE_PASSWORD:
            return { ...state, requestingPassword: true, backendErrors: false };

        case UPDATE_PROFILE_SUCCESS:
            return { ...state, ...initialState };

        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                requestingImage: false,
                requestingFullName: false,
                requestingEmail: false,
                requestingPhoneNumber: false,
                requestingOTP: false,
                requestingPassword: false,
                backendErrors: action.errors,
            };

        case ASK_QUESTION_REQUEST:
            return { ...state, requestingQuestion: true };

        case RESET_QUESTION_REQUEST:
            return { ...state, requestingQuestion: false };

        default:
            return state;
    }
};
