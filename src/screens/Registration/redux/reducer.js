import {
    REGISTER,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILURE,
    VERIFY_USER,
    USER_VERIFICATION_SUCCESS,
    USER_VERIFICATION_FAILURE,
    VERIFY_PHONE,
    PHONE_VERIFICATION_SUCCESS,
    PHONE_VERIFICATION_FAILURE,
    RESEND_OTP,
    RESEND_OTP_RESET
} from './types';

const initialState = {
    requesting: false,
    requestingOTP: false,
    serverErrors: false,
    userData: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
        case VERIFY_USER:
        case VERIFY_PHONE:
            return { ...state, requesting: true, serverErrors: false };

        case RESEND_OTP:
            return { ...state, requestingOTP: true };

        case REGISTRATION_SUCCESS:
        case USER_VERIFICATION_SUCCESS:
            return {
                ...state,
                requesting: false,
                serverErrors: false,
                userData: action.data
            };

        case PHONE_VERIFICATION_SUCCESS:
            return { ...state, ...initialState };

        case PHONE_VERIFICATION_FAILURE:
        case RESEND_OTP_RESET:
            return { ...state, requesting: false, requestingOTP: false, serverErrors: false };

        case REGISTRATION_FAILURE:
        case USER_VERIFICATION_FAILURE:
            return { ...state, requesting: false, serverErrors: action.errors };

        default:
            return state;
    }
}