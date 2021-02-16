import { all, call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';

// config
import { appConfig } from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';
import { errorAlert } from 'src/utils/alerts';

// types
import { LOGIN, FACEBOOK_LOGIN, APPLE_LOGIN } from './types';

// actions
import {
    setUserInfo,
    setAuthToken,
    setFacebookLogin
} from 'src/screens/App/redux/actions';
import { resetLogin } from './actions';

function loginAPI(data) {
    const URL = `${appConfig.backendServerURL}/rest-auth/login/`;
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        data
    };

    return XHR(URL, options);
}

function facebookLoginAPI(accessToken) {
    const URL = `${appConfig.backendServerURL
        }/register-by-token/facebook/?access_token=${accessToken}`;
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    };

    return XHR(URL, options);
}

function appleLoginAPI(data) {
    const URL = `${appConfig.backendServerURL}/register-by-token/apple/`;
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        data
    };

    return XHR(URL, options);
}

function* login({ data }) {
    try {
        const res = yield call(loginAPI, data);

        yield put(setAuthToken(res.data.token));
        yield put(setUserInfo(res.data.user));
        AsyncStorage.setItem('authToken', res.data.token);
        AsyncStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (e) {
        const { response } = e;
        if (response && response.data.non_field_errors) {
            errorAlert(response.data.non_field_errors[0]);
        }
    } finally {
        yield put(resetLogin());
    }
}

function* facebookLogin({ accessToken }) {
    try {
        const res = yield call(facebookLoginAPI, accessToken);

        AsyncStorage.setItem('authToken', res.data.token);
        AsyncStorage.setItem('user', JSON.stringify(res.data.user));

        yield put(setUserInfo(res.data.user));
        yield put(setAuthToken(res.data.token));
        yield put(setFacebookLogin(true));
    } catch (e) {
        const { response } = e;
        if (response && response.data.error) {
            errorAlert(response.data.error);
        } else {
            errorAlert('Unable to login with facebook, please try again later.');
        }
    } finally {
        yield put(resetLogin());
    }
}

function* appleLogin({ data }) {
    try {
        const res = yield call(appleLoginAPI, data);

        AsyncStorage.setItem('authToken', res.data.token);
        AsyncStorage.setItem('user', JSON.stringify(res.data.user));

        yield put(setUserInfo(res.data.user));
        yield put(setAuthToken(res.data.token));
        yield put(setFacebookLogin(true));
    } catch (e) {
        errorAlert('Unable to login with Apple.');
    } finally {
        yield put(resetLogin());
    }
}

export default all([
    takeLatest(LOGIN, login),
    takeLatest(FACEBOOK_LOGIN, facebookLogin),
    takeLatest(APPLE_LOGIN, appleLogin)
]);
