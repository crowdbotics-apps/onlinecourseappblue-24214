import {
    RESET,
    UPDATE_LESSON_PROGRESS_SUCCESS
} from './types';

const initialState = {
    isCompleted: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET:
            return { ...state, ...initialState };

        case UPDATE_LESSON_PROGRESS_SUCCESS:
            return { ...state, isCompleted: true };

        default:
            return state;
    }
}