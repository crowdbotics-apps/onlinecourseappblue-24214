import {
    GET_INSTRUCTOR_COURSES,
    GET_INSTRUCTOR_COURSES_FAILURE,
    GET_INSTRUCTOR_COURSES_SUCCESS,
    RESET_DATA
} from './types';
  
export const getInstructorCourses = (id, page) => ({
    type: GET_INSTRUCTOR_COURSES,
    id,
    page
});

export const getInstructorCoursesSuccess = (courses, next, page) => ({
    type: GET_INSTRUCTOR_COURSES_SUCCESS,
    courses,
    next,
    page
});
  
export const getInstructorCoursesFailure = () => ({
    type: GET_INSTRUCTOR_COURSES_FAILURE
});
  
export const resetData = () => ({
    type: RESET_DATA
});
