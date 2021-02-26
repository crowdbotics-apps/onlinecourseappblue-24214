import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { all, call, put, takeLatest } from 'redux-saga/effects';

// config
import { appConfig } from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';
import { errorAlert } from 'src/utils/alerts';
import { navigate, reset } from 'src/navigator/NavigationService';
import getDeviceInfo from 'src/utils/getDeviceInfo';

// actions
import {
    VERIFY_USER,
    REGISTER,
    VERIFY_PHONE,
    RESEND_OTP,
    REGISTER_MOBILE_DEVICE
} from './types';
import {
    userVerificationSuccess,
    userVerificationFailure,
    registrationSuccess,
    registrationFailure,
    phoneVerificationSuccess,
    phoneVerificationFailure,
    resendOtpReset,
    registerMobileDevice as registerMobileDeviceAction,
    registerMobileDeviceSuccess,
    registerMobileDeviceFailure
} from './actions';

function userVerificationAPI(data) {
    const URL = `${appConfig.backendServerURL}/rest-auth/user-verification/`;
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        data
    };

    return XHR(URL, options);
}

function registrationAPI(data) {
    const URL = `${appConfig.backendServerURL}/rest-auth/register/`;
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        data
    };

    return XHR(URL, options);
}

function phoneVerificationAPI(data) {
    const URL = `${appConfig.backendServerURL}/api/v1/phone-verify/`;
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        data
    };

    return XHR(URL, options);
}

function resendOtpAPI(data) {
    const URL = `${appConfig.backendServerURL}/api/v1/phone-resend/`;
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        data
    };

    return XHR(URL, options);
}

async function registerDeviceInfoAPI(data) {
    const URL = `${appConfig.backendServerURL}/api/v1/device/${Platform.OS === 'ios' ? 'apns' : 'fcm'
        }/`;
    const FCMToken = await AsyncStorage.getItem('FCMToken');
    data.registration_id = FCMToken;

    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + data.authToken
        },
        method: 'POST',
        data
    };

    return XHR(URL, options);
}

function* verifyUser({ data }) {
    try {
        yield call(userVerificationAPI, data);
        yield put(userVerificationSuccess(data));

        navigate('PhoneInput');
    } catch (e) {
        const { response } = e;

        if (response && response.status === 400) {
            yield put(userVerificationFailure(response.data));
        } else {
            yield put(userVerificationFailure(false));
        }
    }
}

function* register({ data }) {
    try {
        yield call(registrationAPI, data);
        yield put(registrationSuccess(data));

        navigate('OTP');
    } catch (e) {
        const { response } = e;

        if (response && response.status === 400) {
            yield put(registrationFailure(response.data));
        } else {
            yield put(registrationFailure(false));
        }
    }
}

function* verifyPhone({ data }) {
    try {
        const res = yield call(phoneVerificationAPI, data);
        const deviceInfo = yield call(
            getDeviceInfo,
            res.data.user.id,
            res.data.token
        );

        if (deviceInfo.user) {
            yield put(registerMobileDeviceAction(deviceInfo));
        }
        yield put(phoneVerificationSuccess());

        reset({
            index: 0,
            routes: [{ name: 'Welcome', params: res.data }]
        });
    } catch (e) {
        const { response } = e;

        if (response && response.data.error) {
            errorAlert(response.data.error);
        }
        yield put(phoneVerificationFailure());
    }
}

function* resendOTP({ phoneNumber }) {
    try {
        yield call(resendOtpAPI, phoneNumber);
        yield put(resendOtpReset());
    } catch (e) {
        yield put(resendOtpReset());
    }
}

function* registerDeviceInfo({ data }) {
    try {
        yield call(registerDeviceInfoAPI, data);
        yield put(registerMobileDeviceSuccess());
    } catch (e) {
        console.log('err', e.response);
        yield put(registerMobileDeviceFailure());
    }
}

export default all([
    takeLatest(VERIFY_USER, verifyUser),
    takeLatest(REGISTER, register),
    takeLatest(VERIFY_PHONE, verifyPhone),
    takeLatest(RESEND_OTP, resendOTP),
    takeLatest(REGISTER_MOBILE_DEVICE, registerDeviceInfo)
]);
