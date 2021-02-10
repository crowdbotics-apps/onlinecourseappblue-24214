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
    RESEND_OTP_RESET,
    REGISTER_MOBILE_DEVICE,
    REGISTER_MOBILE_DEVICE_SUCCESS,
    REGISTER_MOBILE_DEVICE_FAILURE,
} from './types';

export const verifyUser = data => ({
    type: VERIFY_USER,
    data,
});

export const userVerificationSuccess = data => ({
    type: USER_VERIFICATION_SUCCESS,
    data,
});

export const userVerificationFailure = errors => ({
    type: USER_VERIFICATION_FAILURE,
    errors,
});

export const register = data => ({
    type: REGISTER,
    data,
});

export const registrationSuccess = data => ({
    type: REGISTRATION_SUCCESS,
    data,
});

export const registrationFailure = errors => ({
    type: REGISTRATION_FAILURE,
    errors,
});

export const verifyPhone = data => ({
    type: VERIFY_PHONE,
    data,
});

export const phoneVerificationSuccess = () => ({
    type: PHONE_VERIFICATION_SUCCESS,
});

export const phoneVerificationFailure = () => ({
    type: PHONE_VERIFICATION_FAILURE,
});

export const resendOTP = phoneNumber => ({
    type: RESEND_OTP,
    phoneNumber
});

export const resendOtpReset = () => ({
    type: RESEND_OTP_RESET
});

export const registerMobileDevice = data => ({
    type: REGISTER_MOBILE_DEVICE,
    data
});

export const registerMobileDeviceSuccess = () => ({
    type: REGISTER_MOBILE_DEVICE_SUCCESS,
});

export const registerMobileDeviceFailure = () => ({
    type: REGISTER_MOBILE_DEVICE_FAILURE,
});