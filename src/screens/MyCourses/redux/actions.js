import {
    GET_ENROLLED_COURSES,
    GET_ENROLLED_COURSES_FAILURE,
    GET_ENROLLED_COURSES_SUCCESS,
    RESET_DATA
} from './types';

export const getEnrolledCourses = (page, query) => ({
    type: GET_ENROLLED_COURSES,
    page,
    query
});

export const getEnrolledCoursesSuccess = (courses, next, page) => ({
    type: GET_ENROLLED_COURSES_SUCCESS,
    courses,
    next,
    page
});

export const getEnrolledCoursesFailure = () => ({
    type: GET_ENROLLED_COURSES_FAILURE
});

export const resetData = () => ({
    type: RESET_DATA
});