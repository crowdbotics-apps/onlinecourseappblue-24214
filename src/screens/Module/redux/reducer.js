import {
    GET_LESSONS,
    GET_LESSONS_SUCCESS,
    GET_LESSONS_FAILURE,
    RESET
} from './types';

const initialState = {
    lessons: false,
    requesting: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LESSONS:
            return { ...state, requesting: true };

        case GET_LESSONS_SUCCESS:
            return {
                ...state,
                requesting: false,
                lessons: action.lessons
            };

        case GET_LESSONS_FAILURE:
            return { ...state, requesting: false, lessons: false };

        case RESET:
            return { ...state, ...initialState };

        default:
            return state;
    }
}