import {
    REQUEST_PASSWORD_RESET,
    REQUEST_PASSWORD_RESET_SUCCESS,
    REQUEST_PASSWORD_RESET_FAILURE,
    VERIFY_PASSWORD_RESET,
    RESET,
} from './types';

export const requestPasswordReset = (phoneNumber, password) => ({
    type: REQUEST_PASSWORD_RESET,
    phoneNumber,
    password,
});

export const requestPasswordResetSuccess = () => ({
    type: REQUEST_PASSWORD_RESET_SUCCESS,
});

export const requestPasswordResetFailure = errors => ({
    type: REQUEST_PASSWORD_RESET_FAILURE,
    errors,
});

export const verifyPasswordReset = code => ({
    type: VERIFY_PASSWORD_RESET,
    code,
});

export const reset = () => ({
    type: RESET,
});
