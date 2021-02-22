import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// reducers
import app from 'src/screens/App/redux/reducer';
import registration from 'src/screens/Registration/redux/reducer';
import login from 'src/screens/Login/redux/reducer';
import forgotPassword from 'src/screens/ForgotPassword/redux/reducer';
import home from 'src/screens/Home/redux/reducer';
import notifications from 'src/screens/Notifications/redux/reducer';
import myCourses from 'src/screens/MyCourses/redux/reducer';
import categoryCourses from 'src/screens/CategoryCourses/redux/reducer';
import search from 'src/screens/Search/redux/reducer';
import courseDetail from 'src/screens/CourseDetail/redux/reducer';
import module from 'src/screens/Module/redux/reducer';
import lessonDetail from 'src/screens/LessonDetail/redux/reducer';
import assignments from 'src/screens/Assignments/redux/reducer';
import profile from 'src/screens/Profile/redux/reducer';
import instructorCourses from 'src/screens/InstructorCourses/redux/reducer';
import settings from 'src/screens/Settings/redux/reducer';

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  timeout: null
};

export const combinedReducers = {
  app: persistReducer(appPersistConfig, app),
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
  lessonDetail,
  assignments,
  profile,
  instructorCourses,
  settings
};
