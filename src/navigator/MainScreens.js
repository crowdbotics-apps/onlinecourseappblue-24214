import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

// screens
import Splash from 'src/screens/Splash';
import Home from 'src/screens/Home';
import MyCourses from 'src/screens/MyCourses';
import CourseDetail from 'src/screens/CourseDetail';
import CategoryCourses from 'src/screens/CategoryCourses';
import Search from 'src/screens/Search';
import InstructorCourses from 'src/screens/InstructorCourses';
import Module from 'src/screens/Module';
import Subscription from 'src/screens/Subscription';
import LessonDetail from 'src/screens/LessonDetail';
import Assignments from 'src/screens/Assignments';
import Success from 'src/screens/Assignments/screens/Success';
import Failure from 'src/screens/Assignments/screens/Failure';
import Profile from 'src/screens/Profile';
import AboutUs from 'src/screens/Profile/screens/AboutUs';
import AskQuestion from 'src/screens/Profile/screens/AskQuestion';
import UpdateFullName from 'src/screens/Profile/screens/UpdateFullName';
import UpdateEmail from 'src/screens/Profile/screens/UpdateEmail';
import UpdatePhoneNumber from 'src/screens/Profile/screens/UpdatePhoneNumber';
import UpdateProfileOTP from 'src/screens/Profile/screens/OTP';
import UpdatePassword from 'src/screens/Profile/screens/UpdatePassword';
import Notifications from 'src/screens/Notifications';
import Settings from 'src/screens/Settings';
import UpdateSettings from 'src/screens/Settings/screens/UpdateSettings';
import UpdateSubscription from 'src/screens/Subscription/screens/UpdateSubscription';
import AddCard from 'src/screens/Subscription/screens/AddCard';

const mainStack = createStackNavigator();

const MainStackScreen = () => (
    <mainStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
    >
        <mainStack.Screen name="Splash" component={Splash} />
        <mainStack.Screen name="Home" component={Home} />
        <mainStack.Screen name="Profile" component={Profile} />
        <mainStack.Screen name="AboutUs" component={AboutUs} />
        <mainStack.Screen name="AskQuestion" component={AskQuestion} />
        <mainStack.Screen name="UpdateFullName" component={UpdateFullName} />
        <mainStack.Screen name="UpdateEmail" component={UpdateEmail} />
        <mainStack.Screen name="UpdatePhoneNumber" component={UpdatePhoneNumber} />
        <mainStack.Screen name="UpdateProfileOTP" component={UpdateProfileOTP} />
        <mainStack.Screen name="UpdatePassword" component={UpdatePassword} />
        <mainStack.Screen name="MyCourses" component={MyCourses} />
        <mainStack.Screen name="CourseDetail" component={CourseDetail} />
        <mainStack.Screen name="CategoryCourses" component={CategoryCourses} />
        <mainStack.Screen name="Search" component={Search} />
        <mainStack.Screen name="InstructorCourses" component={InstructorCourses} />
        <mainStack.Screen name="Module" component={Module} />
        <mainStack.Screen name="Subscription" component={Subscription} />
        <mainStack.Screen name="LessonDetail" component={LessonDetail} />
        <mainStack.Screen name="Assignments" component={Assignments} />
        <mainStack.Screen name="Notifications" component={Notifications} />
        <mainStack.Screen name="Settings" component={Settings} />
        <mainStack.Screen name="UpdateSettings" component={UpdateSettings} />
        <mainStack.Screen name="AddCard" component={AddCard} />
        <mainStack.Screen
            name="UpdateSubscription"
            component={UpdateSubscription}
        />
    </mainStack.Navigator>
);

export default MainStackScreen;
