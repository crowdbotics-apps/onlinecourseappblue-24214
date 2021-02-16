import { all, call, put, takeLatest } from 'redux-saga/effects';
import { appConfig } from 'src/config/app';
import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from 'src/utils/XHR';

// actions
import {
    getCategoryCoursesSuccess,
    getCategoryCoursesFailure
} from './actions';

// constants
import { GET_CATEGORY_COURSES, SEARCH_CATEGORY_COURSES } from './types';


async function getCategoryCoursesAPI(page, id) {
    const URL = `${appConfig.backendServerURL}/api/v1/course/?page=${page}&categories=${id}`;
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

function* getCategoriesCourses({ page, id }) {
    try {
        const res = yield call(getCategoryCoursesAPI, page, id);
        const { data: { results, next } } = res;

        if (results.length > 0) {
            yield put(getCategoryCoursesSuccess(results, next, page));
        } else {
            yield put(getCategoryCoursesSuccess(false, false, page));
        }
    } catch (e) {
        yield put(getCategoryCoursesFailure());
    }
}

async function searchCategoryCoursesAPI(page, query) {
    const URL = `${appConfig.backendServerURL}/api/v1/course/?page=${page}&categories__name__icontains=${query}`;
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

function* searchCategoryCourses({ page, query }) {
    try {
        const res = yield call(searchCategoryCoursesAPI, page, query);
        const { data: { results, next } } = res;

        if (results.length > 0)
            yield put(getCategoryCoursesSuccess(results, next, page));
        else
            yield put(getCategoryCoursesSuccess(false, false, page));
    } catch (e) {
        yield put(getCategoryCoursesFailure());
    }
}

export default all([
    takeLatest(GET_CATEGORY_COURSES, getCategoriesCourses),
    takeLatest(SEARCH_CATEGORY_COURSES, searchCategoryCourses)
]);
