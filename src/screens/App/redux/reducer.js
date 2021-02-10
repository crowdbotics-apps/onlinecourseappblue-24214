import {
    SET_USER_INFO,
    SET_AUTH_TOKEN,
    SET_FACEBOOK_LOGIN,
    GET_NOTIFICATIONS_COUNT_SUCCESS,
    RESET_CURRENT_NOTIFICATIONS,
    LOGOUT
} from './types';

const initialState = {
    user: false,
    authToken: false,
    facebookLogin: false,
    notifications: { total: 0, current: 0 }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return { ...state, user: action.data };

        case SET_AUTH_TOKEN:
            return { ...state, authToken: action.token };

        case SET_FACEBOOK_LOGIN:
            return { ...state, facebookLogin: action.isFbLogin };

        case GET_NOTIFICATIONS_COUNT_SUCCESS:
            return { ...state, notifications: action.notifications };

        case RESET_CURRENT_NOTIFICATIONS:
            return {
                ...state,
                notifications: { total: state.notifications.total, current: 0 }
            };

        case LOGOUT:
            return { ...state, ...initialState };

        default:
            return state;
    }
};
