import {
    GET_LESSONS,
    GET_LESSONS_SUCCESS,
    GET_LESSONS_FAILURE,
    RESET,
} from './types';

export const getLessons = (id) => ({
    type: GET_LESSONS,
    id
});

export const getLessonsSuccess = (lessons) => ({
    type: GET_LESSONS_SUCCESS,
    lessons
});

export const getLessonsFailure = () => ({
    type: GET_LESSONS_FAILURE,
});

export const reset = () => ({
    type: RESET,
});
