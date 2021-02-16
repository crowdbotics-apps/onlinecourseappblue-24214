import { all, call, put, takeLatest } from 'redux-saga/effects';
import { appConfig } from 'src/config/app';
import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from 'src/utils/XHR';

// actions
import { getCourses } from 'src/screens/Home/redux/actions';
import {
    getModules as getModulesAction,
    getModulesSuccess,
    getModulesFailure,
    enrollCourseSuccess,
    enrollCourseFailure
} from './actions';

// constants
import {
    GET_MODULES,
    ENROLL_COURSE
} from './types';

async function getModulesAPI(id) {
    const authToken = await AsyncStorage.getItem('authToken');

    const URL = `${appConfig.backendServerURL}/api/v1/module/?course=${id}`;
    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json',
        },
        method: 'GET'
    };

    return XHR(URL, options);
}

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

function* getModules({ id }) {
    try {
        const response = yield call(getModulesAPI, id);
        const { data } = response;
        yield put(getModulesSuccess(data));
    } catch (e) {
        yield put(getModulesFailure());
    }
}

function* enrollCourse({ data }) {
    try {
        yield call(enrollCourseAPI, data);
        yield put(enrollCourseSuccess());
        yield put(getModulesAction(data.course))
        yield put(getCourses());
    } catch (e) {
        yield put(enrollCourseFailure());
    }
}

export default all([
    takeLatest(GET_MODULES, getModules),
    takeLatest(ENROLL_COURSE, enrollCourse),
]);
