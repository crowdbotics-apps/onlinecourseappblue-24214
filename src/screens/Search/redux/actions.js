import {
    SEARCH_COURSES,
    SEARCH_COURSES_SUCCESS,
    SEARCH_COURSES_FAILURE,
    RESET
} from './types';

export const searchCourses = (page, query, id) => ({
    type: SEARCH_COURSES,
    page,
    query,
    id
})

export const searchCoursesSuccess = (courses, next, page) => ({
    type: SEARCH_COURSES_SUCCESS,
    courses,
    next,
    page
})

export const searchCoursesFailure = () => ({
    type: SEARCH_COURSES_FAILURE
})

export const reset = () => ({
    type: RESET
})
