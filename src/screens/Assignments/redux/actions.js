import {
    GET_ASSIGNMENT,
    GET_ASSIGNMENT_SUCCESS,
    GET_ASSIGNMENT_FAILURE,
    UPDATE_LEDGER,
    RESET_LEDGER,
    RESET_SCREEN
} from './types';


export const getAssignment = id => ({
    type: GET_ASSIGNMENT,
    id
});

export const getAssignmentSuccess = payload => ({
    type: GET_ASSIGNMENT_SUCCESS,
    payload
});

export const getAssignmentFailure = () => ({
    type: GET_ASSIGNMENT_FAILURE
});

export const updateLedger = (ledger, courseId, data, isLast, callback, tab) => ({
    type: UPDATE_LEDGER,
    ledger,
    courseId,
    data,
    isLast,
    callback, 
    tab
});

export const resetLedger = status => ({
    type: RESET_LEDGER,
    status
});

export const resetScreen = () => ({
    type: RESET_SCREEN
});
