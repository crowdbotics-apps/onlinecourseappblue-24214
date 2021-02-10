import { all, call, put, takeLatest, delay } from 'redux-saga/effects';
import { appConfig } from 'src/config/app';
import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from 'src/utils/XHR';

// actions
import {
    enrollCourseSuccess,
    enrollCourseFailure,
    getLessons as getLessonsAction,
    getLessonsSuccess,
    getLessonsFailure,
} from './actions';
import { getNotificationsCount } from 'src/screens/Notifications/redux/actions';

// constants
import {
    ENROLL_COURSE,
    GET_LESSONS,
} from './types';

async function enrollCourseAPI(data) {
    const URL = `${appConfig.backendServerURL}/api/v1/enrollment/`;
    const authToken = await AsyncStorage.getItem('authToken');

    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        data
    };

    return XHR(URL, options);
}

async function getLessonsAPI(id) {
    const authToken = await AsyncStorage.getItem('authToken');

    const URL = `${appConfig.backendServerURL}/api/v1/course/${id}/`;
    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json',
        },
        method: 'GET'
    };

    return XHR(URL, options);
}

function* enrollCourse({ data }) {
    try {
        yield call(enrollCourseAPI, data);
        yield put(enrollCourseSuccess());
        yield put(getLessonsAction(data.course));
        // yield put(getNotificationsCount());
    } catch (e) {
        yield put(enrollCourseFailure());
    }
}

function* getLessons({ id, callback, tab }) {
    try {
        const response = yield call(getLessonsAPI, id);
        const {
            data: {
                course,
                lessons,
                assignments,
                types,
                ledger
            } } = response;
            
        yield put(
            getLessonsSuccess(
                course,
                lessons,
                assignments,
                types,
                ledger
            )
        );
        yield delay(1000);
        callback && callback(tab === 0 ? tab : 2);
    } catch (e) {
        yield put(getLessonsFailure());
    }
}

export default all([
    takeLatest(ENROLL_COURSE, enrollCourse),
    takeLatest(GET_LESSONS, getLessons),
]);
