import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { navigationRef, isMountedRef } from './NavigationService';

import DrawerSideMenu from 'src/components/SideBar';

import AuthStackScreen from './AuthScreens';
import MainStackScreen from './MainScreens';

const authStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RootNavigationStack = props => {
    useEffect(() => {
        isMountedRef.current = true;
        return () => (isMountedRef.current = false);
    }, [props.isAuth]);

    return (
        <NavigationContainer ref={navigationRef}>
            {props.isAuth ? (
                <Drawer.Navigator
                    drawerContent={propsInit => <DrawerSideMenu {...propsInit} />}
                    screenOptions={{ headerShown: false }}
                >
                    <Drawer.Screen name="HomeDrawer" component={MainStackScreen} />
                </Drawer.Navigator>
            ) : (
                    <authStack.Navigator screenOptions={{ headerShown: false }}>
                        <authStack.Screen name="AuthHome" component={AuthStackScreen} />
                    </authStack.Navigator>
                )}
        </NavigationContainer>
    );
};

const mapStateToProps = state => ({
    isAuth: state.app.authToken !== false,
    user: state.app.user,
});

export default connect(
    mapStateToProps,
    null
)(RootNavigationStack);
