import {
    ENROLL_COURSE,
    ENROLL_COURSE_SUCCESS,
    ENROLL_COURSE_FAILURE,
    GET_LESSONS,
    GET_LESSONS_SUCCESS,
    GET_LESSONS_FAILURE,
    RESET,
} from './types';

export const enrollCourse = data => ({
    type: ENROLL_COURSE,
    data
});

export const enrollCourseSuccess = () => ({
    type: ENROLL_COURSE_SUCCESS
});

export const enrollCourseFailure = () => ({
    type: ENROLL_COURSE_FAILURE
});

export const getLessons = (id, callback = false, tab) => ({
    type: GET_LESSONS,
    id,
    callback,
    tab
});

export const getLessonsSuccess = (
    course,
    lessons,
    assignments,
    assignmentTypes,
    ledger
    ) => ({
        type: GET_LESSONS_SUCCESS,
        course,
        lessons,
        assignments,
        assignmentTypes,
        ledger
    }
);

export const getLessonsFailure = () => ({
    type: GET_LESSONS_FAILURE,
});

export const reset = () => ({
    type: RESET,
});
