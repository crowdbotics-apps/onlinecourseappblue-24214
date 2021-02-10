import {
    GET_ASSIGNMENT,
    GET_ASSIGNMENT_SUCCESS,
    GET_ASSIGNMENT_FAILURE,
    UPDATE_LEDGER,
    RESET_LEDGER,
    RESET_SCREEN
} from './types';

const initialState = {
    requesting: false,
    items: false,
    assignment: false,
    activeResultScreen: false,
    submitRequesting: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ASSIGNMENT:
            return { ...state, requesting: true };

        case GET_ASSIGNMENT_SUCCESS:
            return {
                ...state,
                requesting: false,
                items: action.payload.items,
                assignment: action.payload.assignment
            };

        case GET_ASSIGNMENT_FAILURE:
            return { ...state, ...initialState };

        case UPDATE_LEDGER:
            return { ...state, submitRequesting: true };

        case RESET_LEDGER:
            return {
                ...state,
                submitRequesting: false,
                activeResultScreen: action.status
            }

        case RESET_SCREEN:
            return { ...state, activeResultScreen: false }

        default:
            return state;
    }
}