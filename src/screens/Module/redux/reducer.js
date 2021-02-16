import {
    ENROLL_COURSE,
    ENROLL_COURSE_SUCCESS,
    ENROLL_COURSE_FAILURE,
    GET_LESSONS,
    GET_LESSONS_SUCCESS,
    GET_LESSONS_FAILURE,
    RESET
} from './types';

const initialState = {
    requesting: false,
    course: false,
    lessons: false,
    assignments: false,
    assignmentTypes: [],
    ledger: false,
    requestingEnrollment: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LESSONS:
            return { ...state, requesting: true };

        case GET_LESSONS_SUCCESS:
            return {
                ...state,
                requesting: false,
                course: action.course,
                lessons: action.lessons,
                assignments: action.assignments,
                assignmentTypes: action.assignmentTypes,
                ledger: action.ledger
            };

        case GET_LESSONS_FAILURE:
            return { ...state, requesting: false, lessons: false };

        case ENROLL_COURSE:
            return { ...state, requestingEnrollment: true };

        case ENROLL_COURSE_SUCCESS:
        case ENROLL_COURSE_FAILURE:
            return { ...state, requestingEnrollment: false };

        case RESET:
            return { ...state, ...initialState };

        default:
            return state;
    }
}