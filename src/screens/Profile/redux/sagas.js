import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as NavigationService from 'src/navigator/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from 'native-base';

// config
import { appConfig } from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';
import { errorAlert } from 'src/utils/alerts';

// types
import {
    UPDATE_IMAGE,
    UPDATE_FULL_NAME,
    UPDATE_EMAIL,
    UPDATE_PHONE_NUMBER,
    UPDATE_PASSWORD,
    ASK_QUESTION_REQUEST
} from './types';

// actions
import { setUserInfo } from 'src/screens/App/redux/actions';
import {
    updateProfileSuccess,
    updateProfileFailure,
    resetQuestionRequest
} from './actions';

async function updateProfileAPI(data) {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    const authToken = await AsyncStorage.getItem('authToken');

    const URL = `${appConfig.backendServerURL}/api/v1/update-user-profile/${user.id
        }/`;

    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        data
    };

    return XHR(URL, options);
}

async function updatePasswordAPI(data) {
    const URL = `${appConfig.backendServerURL}/rest-auth/password/change/`;
    const authToken = await AsyncStorage.getItem('authToken');

    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        data
    };

    return XHR(URL, options);
}

async function askQuestionAPI(data) {
    const URL = `${appConfig.backendServerURL}/api/v1/ask-question/`;
    const authToken = await AsyncStorage.getItem('authToken');

    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        data
    };

    return XHR(URL, options);
}

function* updateProfile({ data }) {
    try {
        const res = yield call(updateProfileAPI, data);

        yield put(updateProfileSuccess());
        yield put(setUserInfo(res.data));

        AsyncStorage.setItem('user', JSON.stringify(res.data));

        !data.image && NavigationService.goBack();
    } catch (e) {
        const { response } = e;
        if (response && response.status === 400) {
            if (response.data.image) {
                errorAlert(response.data.image);
            }
            yield put(updateProfileFailure(response.data));
        } else {
            yield put(updateProfileFailure(false));
            errorAlert('Unbale to update profile, please try again later.');
        }
    }
}

function* updatePassword({ data }) {
    try {
        yield call(updatePasswordAPI, data);

        yield put(updateProfileSuccess());

        NavigationService.goBack();
    } catch (e) {
        const { response } = e;

        if (response && response.status === 400) {
            yield put(updateProfileFailure(response.data));
        } else {
            yield put(updateProfileFailure(false));
        }
    }
}

function* askQuestion({ data }) {
    try {
        yield call(askQuestionAPI, data);
        yield put(resetQuestionRequest());

        NavigationService.goBack();
        Toast.show({
            text: 'Your question has been submitted, We will reach you soon.',
            type: 'success',
            duration: 5000,
        });
    } catch (error) {
        yield put(resetQuestionRequest());
        Toast.show({
            text: 'Failed to send your message please try again later.',
            type: 'danger',
            duration: 5000,
        });
    }
}

export default all([
    takeLatest(
        [UPDATE_IMAGE, UPDATE_FULL_NAME, UPDATE_EMAIL, UPDATE_PHONE_NUMBER],
        updateProfile
    ),
    takeLatest(UPDATE_PASSWORD, updatePassword),
    takeLatest(ASK_QUESTION_REQUEST, askQuestion),
]);
