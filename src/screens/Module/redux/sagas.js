import { call, put, takeLatest } from 'redux-saga/effects';
import { appConfig } from 'src/config/app';
import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from 'src/utils/XHR';

// actions
import {
    getLessonsSuccess,
    getLessonsFailure,
} from './actions';

// constants
import { GET_LESSONS } from './types';

async function getLessonsAPI(id) {
    const authToken = await AsyncStorage.getItem('authToken');

    const URL = `${appConfig.backendServerURL}/api/v1/module/${id}/`;
    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json',
        },
        method: 'GET'
    };

    return XHR(URL, options);
}

function* getLessons({ id }) {
    try {
        const response = yield call(getLessonsAPI, id);
        const { data: { lessons } } = response;
            
        yield put(getLessonsSuccess(lessons));
    } catch (e) {
        yield put(getLessonsFailure());
    }
}

export default takeLatest(GET_LESSONS, getLessons);
