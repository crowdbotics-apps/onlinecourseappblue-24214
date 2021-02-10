import {
    GET_CATEGORY_COURSES,
    GET_CATEGORY_COURSES_SUCCESS,
    GET_CATEGORY_COURSES_FAILURE,
    SEARCH_CATEGORY_COURSES,
    RESET_PAGE
} from './types';

const initialState = {
    requesting: false,
    courses: false,
    next: false,
    page: 1
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_COURSES:
        case SEARCH_CATEGORY_COURSES:
            return { ...state, requesting: true };

        case GET_CATEGORY_COURSES_SUCCESS:
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

        case GET_CATEGORY_COURSES_FAILURE:
            return { ...state, ...initialState };

        case RESET_PAGE:
            return { ...state, page: 1, courses: false };

        default:
            return state;
    }
}