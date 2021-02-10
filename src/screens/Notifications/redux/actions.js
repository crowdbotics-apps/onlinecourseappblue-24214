import {
    GET_NOTIFICATIONS,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAILURE,
    GET_NOTIFICATIONS_COUNT,
    UPDATE_NOTIFICATION,
    RESET_PAGE
} from './types';

export const getNotifications = page => ({
    type: GET_NOTIFICATIONS,
    page
});

export const getNotificationsSuccess = (notifications, next, page) => ({
    type: GET_NOTIFICATIONS_SUCCESS,
    notifications,
    next,
    page
});

export const getNotificationsFailure = () => ({
    type: GET_NOTIFICATIONS_FAILURE
});

export const getNotificationsCount = () => ({
    type: GET_NOTIFICATIONS_COUNT
});

export const updateNotification = id => ({
    type: UPDATE_NOTIFICATION,
    id
});

export const resetPage = () => ({
    type: RESET_PAGE
});
