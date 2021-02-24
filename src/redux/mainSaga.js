import { all } from "redux-saga/effects";

// sagas
import registration from 'src/screens/Registration/redux/sagas';
import login from 'src/screens/Login/redux/sagas';
import forgotPassword from 'src/screens/ForgotPassword/redux/sagas';
import home from 'src/screens/Home/redux/sagas';
import notifications from 'src/screens/Notifications/redux/sagas';
import myCourses from 'src/screens/MyCourses/redux/sagas';
import categoryCourses from 'src/screens/CategoryCourses/redux/sagas';
import search from 'src/screens/Search/redux/sagas';
import courseDetail from 'src/screens/CourseDetail/redux/sagas';
import module from 'src/screens/Module/redux/sagas';
import LessonDetail from 'src/screens/LessonDetail/redux/sagas';
import assignments from 'src/screens/Assignments/redux/sagas';
import profile from 'src/screens/Profile/redux/sagas';
import instructorCourses from 'src/screens/InstructorCourses/redux/sagas';
import settings from 'src/screens/Settings/redux/sagas';
import subscription from 'src/screens/Subscription/redux/sagas';

export function* mainSaga() {
  yield all([
    registration,
    login,
    forgotPassword,
    home,
    notifications,
    myCourses,
    categoryCourses,
    search,
    // courseDetail,
    module,
    LessonDetail,
    assignments,
    profile,
    instructorCourses,
    settings,
    subscription
  ]);
}
