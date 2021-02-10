import { Toast } from 'native-base';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { appConfig } from 'src/config/app';
import AsyncStorage from '@react-native-community/async-storage';
import * as NavigationService from 'src/navigator/NavigationService';

// utils
import XHR from 'src/utils/XHR';
import { successAlert } from 'src/utils/alerts';

// actions
import {
    getAssignmentSuccess,
    getAssignmentFailure,
    resetLedger as resetLedgerAction
} from './actions';
import { getLessons as getLessonsAction } from 'src/screens/Module/redux/actions';

// constants
import {
    GET_ASSIGNMENT,
    UPDATE_LEDGER
} from './types';


async function getAssignmentDataAPI(id) {
    const authToken = await AsyncStorage.getItem('authToken');

    const URL = `${appConfig.backendServerURL}/api/v1/assignments/?object_id=${id}`;
    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json',
        },
        method: 'GET'
    };

    return XHR(URL, options);
}

async function updateLedgerDataAPI(id, data) {
    const authToken = await AsyncStorage.getItem('authToken');

    const URL = `${appConfig.backendServerURL}/api/v1/ledger/${id}/`;
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

function* getAssignment({ id }) {
    try {
        const response = yield call(getAssignmentDataAPI, id);
        const { data } = response;

        yield put(getAssignmentSuccess(data));
    } catch (e) {
        yield put(getAssignmentFailure());
    }
}

function* updateLedger({ ledger, courseId, data, isLast, callback, tab }) {
    try {
        yield call(updateLedgerDataAPI, ledger.id, data);
        yield put(resetLedgerAction(activeResultScreen = isLast));
        {tab !== 0 &&
            Toast.show({
                text: 'Your answer has been submitted',
                type: 'success',
                duration: 2000
            });
        }

        isLast && !ledger.is_completed && successAlert(
            'Thanks for completion.\n We will email your certificate soon..'
        );
        yield put(getLessonsAction(courseId, callback, tab));
        !isLast && NavigationService.goBack();
    } catch (e) {
        yield put(resetLedgerAction(activeResultScreen = false));
        Toast.show({
            text: 'Fail to submit answer please try again',
            type: 'danger',
            duration: 2000
        });
    }
}

export default all([
    takeLatest(GET_ASSIGNMENT, getAssignment),
    takeLatest(UPDATE_LEDGER, updateLedger)
]);
