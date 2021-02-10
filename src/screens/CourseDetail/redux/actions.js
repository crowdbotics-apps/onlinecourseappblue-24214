import {
    GET_MODULES,
    GET_MODULES_SUCCESS,
    GET_MODULES_FAILURE,
    ENROLL_COURSE,
    ENROLL_COURSE_SUCCESS,
    ENROLL_COURSE_FAILURE,
    RESET_ENROLLED
} from './types';

export const getModules = id => ({
    type: GET_MODULES,
    id
})

export const getModulesSuccess = modules => ({
    type: GET_MODULES_SUCCESS,
    modules
})

export const getModulesFailure = () => ({
    type: GET_MODULES_FAILURE
})

export const enrollCourse = data => ({
    type: ENROLL_COURSE,
    data
})

export const enrollCourseSuccess = () => ({
    type: ENROLL_COURSE_SUCCESS
})

export const enrollCourseFailure = () => ({
    type: ENROLL_COURSE_FAILURE
})

export const resetEnrolled = () => ({
    type: RESET_ENROLLED
})
