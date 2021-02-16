import {
    GET_MODULES,
    GET_MODULES_SUCCESS,
    GET_MODULES_FAILURE,
    ENROLL_COURSE,
    ENROLL_COURSE_SUCCESS,
    ENROLL_COURSE_FAILURE,
    RESET_ENROLLED
} from './types';

const initialState = {
    requesting: false,
    modules: false,
    isEnrolled: false,
    requestingEnroll: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MODULES:
            return { ...state, requesting: true };

        case GET_MODULES_SUCCESS:
            return { ...state, requesting: false, modules: action.modules };

        case GET_MODULES_FAILURE:
            return { ...state, requesting: false, modules: false };

        case ENROLL_COURSE:
            return { ...state, requestingEnroll: true };

        case ENROLL_COURSE_SUCCESS:
            return { ...state, requestingEnroll: false, isEnrolled: true };

        case ENROLL_COURSE_FAILURE:
            return { ...state, requestingEnroll: false, isEnrolled: false };

        case RESET_ENROLLED:
            return { ...state, isEnrolled: false };

        default:
            return state;
    }
};
