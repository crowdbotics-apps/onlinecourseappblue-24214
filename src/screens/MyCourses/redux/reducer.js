import {
    GET_ENROLLED_COURSES,
    GET_ENROLLED_COURSES_FAILURE,
    GET_ENROLLED_COURSES_SUCCESS,
    RESET_DATA
} from './types';

const initialState = {
    requesting: false,
    courses: false,
    next: false,
    page: 1
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ENROLLED_COURSES:
            return { ...state, requesting: true }

        case GET_ENROLLED_COURSES_SUCCESS:
            return { 
                ...state, 
                requesting: false, 
                courses:
                action.page <= 1
                    ? action.courses
                    : state.courses.concat(action.courses),
                next: action.next,
                page: action.page
            }

        case GET_ENROLLED_COURSES_FAILURE:
            return { ...state, ...initialState }

        case RESET_DATA:
            return { ...state, page: 1,  courses: false}

        default:
            return state
    }
}