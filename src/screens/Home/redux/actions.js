import {
    GET_COURSES,
    GET_COURSES_SUCCESS,
    GET_COURSES_FAILURE,
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,
    RESET_PAGE
} from './types';

export const getCourses = (page, query) => ({
    type: GET_COURSES,
    page,
    query
});

export const getCoursesSuccess = (courses, next, page) => ({
    type: GET_COURSES_SUCCESS,
    courses,
    next,
    page
});

export const getCoursesFailure = page => ({
    type: GET_COURSES_FAILURE,
    page
});

export const getCategories = () => ({
    type: GET_CATEGORIES
});

export const getCategoriesSuccess = categories => ({
    type: GET_CATEGORIES_SUCCESS,
    categories
});

export const getCategoriesFailure = () => ({
    type: GET_CATEGORIES_FAILURE
});

export const resetPage = () => ({
    type: RESET_PAGE,
});
