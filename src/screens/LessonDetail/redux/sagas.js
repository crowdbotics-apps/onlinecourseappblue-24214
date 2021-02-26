import { call, put, takeLatest } from 'redux-saga/effects';
import { appConfig } from 'src/config/app';
import AsyncStorage from '@react-native-community/async-storage';

// utils
import XHR from 'src/utils/XHR';

// actions
import { getModules } from 'src/screens/CourseDetail/redux/actions';
import { getLessons } from 'src/screens/Module/redux/actions';
import { updateLessonProgressSuccess, reset as resetAction } from './actions';

// constants
import {
    UPDATE_LESSON_PROGRESS,
} from './types';

// utils
import { successAlert } from 'src/utils/alerts';

async function addLessonProgressAPI(data) {
    const authToken = await AsyncStorage.getItem('authToken');

    const URL = `${appConfig.backendServerURL}/api/v1/lesson-progress/`;
    const options = {
        headers: {
            Authorization: 'Token ' + authToken,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        data
    };

    return XHR(URL, options);
}

function* addLessonProgress({ data, courseId, moduleId, isLast }) {
    try {
        yield call(addLessonProgressAPI, data);
        yield put(updateLessonProgressSuccess());

        isLast && successAlert(
            'Thanks for completion.\n We will email your certificate soon..'
        );

        yield put(getLessons(moduleId.moduleId));
        yield put(getModules(courseId));
    } catch (e) {
        yield put(resetAction());
    }
}

export default takeLatest(UPDATE_LESSON_PROGRESS, addLessonProgress);
