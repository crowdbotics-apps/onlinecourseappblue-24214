import { call, put, takeLatest } from 'redux-saga/effects';
import { appConfig } from 'src/config/app';
import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from 'src/utils/XHR';

// actions
import {
    getInstructorCoursesSuccess,
    getInstructorCoursesFailure
} from './actions';

// constants
import { GET_INSTRUCTOR_COURSES } from './types';

async function getInstructorCoursesAPI(id, page) {
    const URL = `${
        appConfig.backendServerURL
    }/api/v1/course/?author_id=${id}&page=${page}`;
    const authToken = await AsyncStorage.getItem('authToken');

    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json'
        },
        method: 'GET'
    };

    return XHR(URL, options);
}

function* getInstructorCourses({ id, page }) {
    try {
        const response = yield call(getInstructorCoursesAPI, id, page);
        const {
            data: { results, next }
        } = response;

        if (results.length > 0) {
            yield put(getInstructorCoursesSuccess(results, next, page));
        } else {
            yield put(getInstructorCoursesSuccess(false, false, page));
        }
    } catch (e) {
        yield put(getInstructorCoursesFailure());
    }
}

export default takeLatest(GET_INSTRUCTOR_COURSES, getInstructorCourses);
