import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { appConfig } from 'src/config/app';
import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from 'src/utils/XHR';

// actions
import { getNotificationsSuccess, getNotificationsFailure } from './actions';
import { getNotificationsCountSuccess } from 'src/screens/App/redux/actions';

// constants
import {
    GET_NOTIFICATIONS,
    GET_NOTIFICATIONS_COUNT,
    UPDATE_NOTIFICATION
} from './types';

export const getAppNotifications = (state) => state.app.notifications;

async function getNotificationsAPI(page) {
    const authToken = await AsyncStorage.getItem('authToken');

    const URL = `${appConfig.backendServerURL}/api/v1/notifications/?page=${page}`;
    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json',
        },
        method: 'GET'
    };

    return XHR(URL, options);
}

async function getNotificationsCountAPI() {
    const authToken = await AsyncStorage.getItem('authToken');

    const URL = `${appConfig.backendServerURL}/api/v1/notifications/count`;
    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json',
        },
        method: 'GET'
    };

    return XHR(URL, options);
}

async function updateNotificationAPI(id, data) {
    const authToken = await AsyncStorage.getItem('authToken');

    const URL = `${appConfig.backendServerURL}/api/v1/notifications/${id}/`;
    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        data
    };

    return XHR(URL, options);
}

function* getNotifications({ page }) {
    try {
        const response = yield call(getNotificationsAPI, page);
        const { data: { results, next } } = response;

        if (results.length > 0) {
            yield put(getNotificationsSuccess(results, next, page));
        } else {
            yield put(getNotificationsSuccess(false, false, page));
        }
    } catch (e) {
        yield put(getNotificationsFailure());
    }
}

function* getNotificationsCount() {
    try {
        const notifications = yield select(getAppNotifications);
        const response = yield call(getNotificationsCountAPI);
        const { data: { count } } = response;

        yield put(getNotificationsCountSuccess({
            total: count,
            current: count > notifications.total ?
                (count - notifications.total) + notifications.current
                : notifications.current
        }));
    } catch (e) {
        const notifications = yield select(getAppNotifications);
        yield put(getNotificationsCountSuccess(notifications));
    }
}

function* updateNotification({ id }) {
    try {
        yield call(updateNotificationAPI, id, { is_opened: true });
    } catch (e) {

    }
}

export default all([
    takeLatest(GET_NOTIFICATIONS, getNotifications),
    takeLatest(GET_NOTIFICATIONS_COUNT, getNotificationsCount),
    takeLatest(UPDATE_NOTIFICATION, updateNotification),
]);
