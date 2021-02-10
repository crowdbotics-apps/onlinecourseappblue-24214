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

export const updateImage = data => ({
    type: UPDATE_IMAGE,
    data,
});

export const updateFullName = data => ({
    type: UPDATE_FULL_NAME,
    data,
});

export const updateEmail = data => ({
    type: UPDATE_EMAIL,
    data,
});

export const updatePhoneNumber = data => ({
    type: UPDATE_PHONE_NUMBER,
    data,
});

export const updatePassword = data => ({
    type: UPDATE_PASSWORD,
    data,
});

export const updateProfileSuccess = () => ({
    type: UPDATE_PROFILE_SUCCESS,
});

export const updateProfileFailure = errors => ({
    type: UPDATE_PROFILE_FAILURE,
    errors,
});

export const askQuestion = data => ({
    type: ASK_QUESTION_REQUEST,
    data,
});

export const resetQuestionRequest = () => ({
    type: RESET_QUESTION_REQUEST
});
