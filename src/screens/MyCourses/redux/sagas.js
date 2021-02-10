import { call, put, takeLatest } from 'redux-saga/effects';
import { appConfig } from 'src/config/app';
import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from 'src/utils/XHR';

// actions
import { getEnrolledCoursesSuccess, getEnrolledCoursesFailure } from './actions';

// constants
import { GET_ENROLLED_COURSES } from './types';

async function getEnrolledCoursesAPI(page, query) {
    const URL = `${appConfig.backendServerURL
        }/api/v1/course/?get_enrolled_courses=true${query && `&search=${query}`}&page=${page}`;
    const authToken = await AsyncStorage.getItem('authToken');

    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json',
        },
        method: 'GET'
    };

    return XHR(URL, options);
}

function* getEnrolledCourses({ page, query }) {
    try {
        const response = yield call(getEnrolledCoursesAPI, page, query);
        const {
            data: { results, next },
        } = response;
        
        if (results.length > 0) {
            yield put(getEnrolledCoursesSuccess(results, next, page));
        } else {
            yield put(getEnrolledCoursesSuccess(false, false, page));
        }
    } catch (e) {
        yield put(getEnrolledCoursesFailure());
    }
}

export default takeLatest(GET_ENROLLED_COURSES, getEnrolledCourses);