import { call, all, put, takeLatest } from 'redux-saga/effects';
import { appConfig } from 'src/config/app';
import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from 'native-base';

// utils
import XHR from 'src/utils/XHR';

// actions
import {
    getSettings as getSettingsAction,
    resetRequesting,
    getSettingsSuccess,
    getSettingsFailure
} from './actions';

// constants
import { GET_SETTINGS, UPDATE_SETTINGS } from './types';

async function updateSettingsAPI(id, data) {
    const URL = `${appConfig.backendServerURL}/api/v1/user-settings/${id}/`;
    const authToken = await AsyncStorage.getItem('authToken');

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

async function getSettingsAPI() {
    const URL = `${appConfig.backendServerURL}/api/v1/user-settings/`;
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

function* updateSettings({ id, data }) {
    try {
        yield call(updateSettingsAPI, id, data);
        yield put(getSettingsAction());
        yield put(resetRequesting());
        Toast.show({
            text: 'Settings has been updated successfully.',
            type: 'success',
            duration: 5000
        });
    } catch (e) {
        yield put(resetRequesting());
        Toast.show({
            text: 'Failed to update your data please try again later.',
            type: 'danger',
            duration: 5000
        });
    }
}

function* getSettings() {
    try {
        const response = yield call(getSettingsAPI);
        const { data } = response;

        yield put(getSettingsSuccess(data));
    } catch (e) {
        yield put(getSettingsFailure());
    }
}

export default all([
    takeLatest(GET_SETTINGS, getSettings),
    takeLatest(UPDATE_SETTINGS, updateSettings)
]);
