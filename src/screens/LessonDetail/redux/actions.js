import {
    UPDATE_LESSON_PROGRESS,
    UPDATE_LESSON_PROGRESS_SUCCESS,
    RESET
} from './types';

export const updateLessonProgress = (data, moduleIds) => ({
    type: UPDATE_LESSON_PROGRESS,
    data,
    moduleIds,
})

export const updateLessonProgressSuccess = () => ({
    type: UPDATE_LESSON_PROGRESS_SUCCESS
});

export const reset = () => ({
    type: RESET
});