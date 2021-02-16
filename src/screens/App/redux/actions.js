import {
    SET_USER_INFO,
    SET_AUTH_TOKEN,
    SET_FACEBOOK_LOGIN,
    GET_NOTIFICATIONS_COUNT_SUCCESS,
    RESET_CURRENT_NOTIFICATIONS,
    LOGOUT
} from './types';

export const setAuthToken = token => ({
    type: SET_AUTH_TOKEN,
    token
});

export const setUserInfo = data => ({
    type: SET_USER_INFO,
    data
});

export const setFacebookLogin = isFbLogin => ({
    type: SET_FACEBOOK_LOGIN,
    isFbLogin
});

export const getNotificationsCountSuccess = notifications => ({
    type: GET_NOTIFICATIONS_COUNT_SUCCESS,
    notifications
});

export const resetCurrentNotifications = () => ({
    type: RESET_CURRENT_NOTIFICATIONS
});

export const logout = () => ({
    type: LOGOUT
});
