import {
    SEARCH_COURSES,
    SEARCH_COURSES_SUCCESS,
    SEARCH_COURSES_FAILURE,
    RESET
} from './types';

const initialState = {
    requesting: false,
    courses: false,
    next: false,
    page: 1
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_COURSES:
            return { ...state, requesting: true };

        case SEARCH_COURSES_SUCCESS:
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

        case SEARCH_COURSES_FAILURE:
            return { ...state, ...initialState };

        case RESET:
            return { ...state, ...initialState };

        default:
            return state;
    }
}