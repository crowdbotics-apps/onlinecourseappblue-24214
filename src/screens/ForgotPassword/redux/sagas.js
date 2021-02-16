import { all, call, put, takeLatest } from 'redux-saga/effects';
import { appConfig } from 'src/config/app';
import { navigate } from 'src/navigator/NavigationService';
import { Toast } from 'native-base';

// utils
import XHR from 'src/utils/XHR';
import { errorAlert } from 'src/utils/alerts';

// types
import { REQUEST_PASSWORD_RESET, VERIFY_PASSWORD_RESET } from './types';

// actions
import {
    reset,
    requestPasswordResetSuccess,
    requestPasswordResetFailure,
} from './actions';

function requestPasswordResetAPI(data) {
    const URL = `${appConfig.backendServerURL}/api/v1/password-reset/`;

    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        data
    };

    return XHR(URL, options);
}

function verifyPasswordResetAPI(data) {
    const URL = `${appConfig.backendServerURL}/api/v1/password-reset-confirm/`;

    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        data
    };


    return XHR(URL, options);
}

function* requestPasswordReset({ phoneNumber, password }) {
    try {
        yield call(requestPasswordResetAPI, phoneNumber);
        yield put(requestPasswordResetSuccess());

        navigate('ForgotPasswordOTP', password);
    } catch (e) {
        const { response } = e;
        if (response && response.status === 404) {
            yield put(requestPasswordResetFailure(response.data));
        } else {
            yield put(requestPasswordResetFailure(false));
        }
    }
}

function* verifyPasswordReset({ code }) {
    try {
        yield call(verifyPasswordResetAPI, code);

        navigate('Login');
        Toast.show({
            text: 'You can now login with your new password.',
            type: 'success',
            duration: 5000,
        });
    } catch (e) {
        const { response } = e;
        if (response) {
            errorAlert(response.data.error[0]);
        }
    } finally {
        yield put(reset());
    }
}

export default all([
    takeLatest(REQUEST_PASSWORD_RESET, requestPasswordReset),
    takeLatest(VERIFY_PASSWORD_RESET, verifyPasswordReset),
]);
