import {
    GET_CATEGORY_COURSES,
    GET_CATEGORY_COURSES_SUCCESS,
    GET_CATEGORY_COURSES_FAILURE,
    SEARCH_CATEGORY_COURSES,
    RESET_PAGE
} from './types';

export const getCategoryCourses = (page, id) => ({
    type: GET_CATEGORY_COURSES,
    page,
    id
});

export const getCategoryCoursesSuccess = (courses, next, page) => ({
    type: GET_CATEGORY_COURSES_SUCCESS,
    courses,
    next,
    page
});

export const getCategoryCoursesFailure = () => ({
    type: GET_CATEGORY_COURSES_FAILURE
});

export const searchCategoryCourses = (page, query) => ({
    type: SEARCH_CATEGORY_COURSES,
    page,
    query
});

export const resetPage = () => ({
    type: RESET_PAGE
});