import {
    GET_NOTIFICATIONS,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAILURE,
    RESET_PAGE
} from './types';

const initialState = {
    requesting: false,
    notifications: false,
    next: false,
    page: 1
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTIFICATIONS:
            return { ...state, requesting: true };

        case GET_NOTIFICATIONS_SUCCESS:
            return { 
                ...state, 
                requesting: false,
                notifications:
                action.page <= 1
                    ? action.notifications
                    : state.notifications.concat(action.notifications),
                next: action.next,
                page: action.page
            };

        case GET_NOTIFICATIONS_FAILURE:
            return { ...state, requesting: false };

        case RESET_PAGE:
            return { ...state, page: 1, notifications: false };

        default:
            return state;
    }
}