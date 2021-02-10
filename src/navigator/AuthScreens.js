import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Splash from 'src/screens/Splash';
import Registration from 'src/screens/Registration';
import Welcome from 'src/screens/Welcome';
import Login from 'src/screens/Login';
import OTP from 'src/screens/Registration/OTP';
import PhoneInput from 'src/screens/Registration/PhoneInput';
import ForgotPassword from 'src/screens/ForgotPassword';
import ForgotPasswordOTP from 'src/screens/ForgotPassword/OTP';

const authStack = createStackNavigator();

const AuthStackScreen = () => (
    <authStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
    >
        <authStack.Screen name="Splash" component={Splash} />
        <authStack.Screen name="Registration" component={Registration} />
        <authStack.Screen name="Welcome" component={Welcome} />
        <authStack.Screen name="Login" component={Login} />
        <authStack.Screen name="PhoneInput" component={PhoneInput} />
        <authStack.Screen name="OTP" component={OTP} />
        <authStack.Screen name="ForgotPassword" component={ForgotPassword} />
        <authStack.Screen name="ForgotPasswordOTP" component={ForgotPasswordOTP} />
    </authStack.Navigator>
);

export default AuthStackScreen;
