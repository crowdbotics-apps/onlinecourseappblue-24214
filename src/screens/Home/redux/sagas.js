import { all, call, put, takeLatest } from 'redux-saga/effects';
import { appConfig } from 'src/config/app';
import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from 'src/utils/XHR';

// actions
import {
    getCoursesSuccess,
    getCoursesFailure,
    getCategoriesSuccess,
    getCategoriesFailure
} from './actions';

// constants
import {
    GET_COURSES,
    GET_CATEGORIES
} from './types';

async function getCoursesAPI(page, query) {
    const authToken = await AsyncStorage.getItem('authToken');
    const URL = `${appConfig.backendServerURL}/api/v1/course/?page=${page}${query && `&search=${query}`}`;

    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json',
        },
        method: 'GET'
    };

    return XHR(URL, options);
}

async function getCategoriesAPI() {
    const authToken = await AsyncStorage.getItem('authToken');

    const URL = `${appConfig.backendServerURL}/api/v1/category/?page_size=10`;
    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json',
        },
        method: 'GET'
    };

    return XHR(URL, options);
}

function* getCourses({ page, query }) {
    try {
        const response = yield call(getCoursesAPI, page, query);
        const { data: { results, next } } = response;

        if (results.length > 0) {
            yield put(getCoursesSuccess(results, next, page));
        } else {
            yield put(getCoursesSuccess(false, false, page));
        }
    } catch (e) {
        yield put(getCoursesFailure());
    }
}

function* getCategories() {
    try {
        const response = yield call(getCategoriesAPI);
        const { data: { results } } = response;

        if (results.length > 0) {
            yield put(getCategoriesSuccess(results));
        } else {
            yield put(getCategoriesSuccess(false));
        }
    } catch (e) {
        yield put(getCategoriesFailure());
    }
}

export default all([
    takeLatest(GET_COURSES, getCourses),
    takeLatest(GET_CATEGORIES, getCategories),
]);
