import {
    GET_COURSES,
    GET_COURSES_SUCCESS,
    GET_COURSES_FAILURE,
    GET_CATEGORIES,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,
    RESET_PAGE
} from './types';

const initialState = {
    requesting: false,
    courses: false,
    requestingCategories: false,
    categories: false,
    next: false,
    page: 1
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_COURSES:
            return { ...state, requesting: true };

        case GET_COURSES_SUCCESS:
            return {
                ...state,
                requesting: false,
                courses:
                    action.page <= 1
                        ? action.courses
                        : state.courses.concat(action.courses),
                next: action.next,
                page: action.page
            };

        case GET_COURSES_FAILURE:
            return { ...state, requesting: false };

        case GET_CATEGORIES:
            return { ...state, requestingCategories: true };

        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                requestingCategories: false,
                categories: action.categories
            };

        case GET_CATEGORIES_FAILURE:
            return { ...state, requestingCategories: false, categories: false };

        case RESET_PAGE:
            return { ...state, page: 1 };

        default:
            return state;
    }
}