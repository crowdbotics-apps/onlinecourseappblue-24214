import { call, put, takeLatest } from 'redux-saga/effects';
import { appConfig } from 'src/config/app';
import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from 'src/utils/XHR';

// actions
import {
    searchCoursesSuccess,
    searchCoursesFailure
} from './actions';

// constants
import { SEARCH_COURSES } from './types';

async function searchCoursesAPI(page, query, id) {
    const URL = `${appConfig.backendServerURL}/api/v1/course/?search=${query}${id && `&categories=${id}`}&page=${page}`;
    const authToken = await AsyncStorage.getItem('authToken');

    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json'
        },
        method: 'GET',
    };

    return XHR(URL, options);
}

function* searchCourses({ page, query, id }) {
    try {
        const res = yield call(searchCoursesAPI, page, query, id);
        const { data: { results, next } } = res;

        if (results.length > 0)
            yield put(searchCoursesSuccess(results, next, page));
        else
            yield put(searchCoursesSuccess(false, false, page));
    } catch (e) {
        yield put(searchCoursesFailure());
    }
}

export default takeLatest(SEARCH_COURSES, searchCourses);
