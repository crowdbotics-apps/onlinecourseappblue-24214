import {
    GET_INSTRUCTOR_COURSES,
    GET_INSTRUCTOR_COURSES_FAILURE,
    GET_INSTRUCTOR_COURSES_SUCCESS,
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
        case GET_INSTRUCTOR_COURSES:
            return { ...state, requesting: true };
    
        case GET_INSTRUCTOR_COURSES_SUCCESS:
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
    
        case GET_INSTRUCTOR_COURSES_FAILURE:
            return { ...state, ...initialState };
    
        case RESET_DATA:
            return { ...state, page: 1, courses: false };
    
        default:
            return state;
    }
};
